from flask import Flask, request, jsonify
import boto3
import json
import time
from decimal import Decimal
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

sagemaker = boto3.client("sagemaker-runtime", region_name="us-east-1")
dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
table = dynamodb.Table("FracturePredictions")

ENDPOINT_NAME = "huggingface-pytorch-inference-2025-03-28-17-38-52-514"

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "OK"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    img_bytes = image_file.read()
    image_name = image_file.filename

    # Generate all parameters dynamically
    timestamp = int(time.time())
    image_id = f"image_{timestamp}"
    patient_id = f"PT-{timestamp}"
    date_str = time.strftime('%Y-%m-%dT%H:%M:%S', time.gmtime(timestamp))

    try:
        response = sagemaker.invoke_endpoint(
            EndpointName=ENDPOINT_NAME,
            ContentType="image/jpeg",
            Body=img_bytes
        )
        result = json.loads(response["Body"].read().decode("utf-8"))
        print(f"Raw SageMaker response: {result}")
    except Exception as e:
        return jsonify({"error": f"SageMaker invocation failed: {str(e)}"}), 500

    try:
        if isinstance(result, list) and len(result) > 0:
            prediction = result[0].get("label", "unknown")
            confidence = result[0].get("score", 0.0)
        else:
            return jsonify({"error": "Unexpected SageMaker response format"}), 500
    except Exception as e:
        return jsonify({"error": f"Failed to parse SageMaker response: {str(e)}"}), 500

    try:
        table.put_item(
            Item={
                "image_id": image_id,
                "patientId": patient_id,
                "date": date_str,
                "imageName": image_name,
                "prediction": prediction,
                "confidence": Decimal(str(confidence)),
                "timestamp": str(timestamp)
            }
        )
        print(f"Successfully saved to DynamoDB: {image_id}, {prediction}, {confidence}")
    except Exception as e:
        print(f"Error saving to DynamoDB: {str(e)}")
        pass

    return jsonify({
        "id": image_id,
        "patientId": patient_id,
        "date": date_str,
        "imageName": image_name,
        "prediction": prediction,
        "confidence": float(confidence)
    })

@app.route('/history', methods=['GET'])
def get_history():
    try:
        response = table.scan(
            Limit=10
        )
        items = response.get('Items', [])
        
        items = sorted(items, key=lambda x: x['timestamp'], reverse=True)
        for item in items:
            item['confidence'] = float(item['confidence'])
            item['id'] = item.pop('image_id')  # Rename image_id to id for frontend
            del item['timestamp']
        
        return jsonify(items)
    except Exception as e:
        return jsonify({"error": f"Failed to query DynamoDB: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)