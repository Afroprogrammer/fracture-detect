# FractureDetect AI

A modern web application for fracture detection using artificial intelligence, built with Next.js and TypeScript, powered by AWS SageMaker and DynamoDB.

## Features

- 🔐 Secure authentication system
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📊 Interactive dashboard
- 🔍 AI-powered fracture detection using AWS SageMaker
- 📱 Responsive design
- 🌙 Dark mode support
- 📝 Prediction history tracking
- 🔄 Real-time image analysis

## Tech Stack

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Charts**: Recharts
- **State Management**: React Context
- **Deployment**: Vercel

### Backend
- **Framework**: Flask (Python)
- **AI/ML**: AWS SageMaker
- **Database**: AWS DynamoDB
- **API**: RESTful endpoints
- **CORS**: Flask-CORS
- **Image Processing**: Pillow
- **AWS Integration**: boto3
- **Serverless**: mangum
- **Deployment**: AWS EC2

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)
- Python 3.x
- AWS Account with SageMaker, DynamoDB, and EC2 access
- AWS CLI configured with appropriate credentials
- Vercel account for frontend deployment

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd fracture-detect
```

2. Install frontend dependencies:
```bash
pnpm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirement.txt
```

4. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Frontend environment variables
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend environment variables
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
```

5. Start the backend server:
```bash
cd backend
python app.py
```

6. Start the frontend development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: Your EC2 backend URL
4. Deploy the application:
```bash
vercel deploy
```

### Backend Deployment (AWS EC2)

1. Launch an EC2 instance:
   - Choose Ubuntu Server 22.04 LTS
   - Select t2.micro (free tier) or larger based on needs
   - Configure security group to allow HTTP (80) and HTTPS (443) traffic

2. SSH into your EC2 instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. Install required software:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and pip
sudo apt install python3-pip -y

# Install nginx
sudo apt install nginx -y

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

4. Clone and set up the backend:
```bash
# Clone repository
git clone [your-repository-url]
cd fracture-detect/backend

# Install dependencies
pip3 install -r requirement.txt

# Set up environment variables
nano .env
# Add your AWS credentials and other environment variables
```

5. Configure Nginx:
```bash
sudo nano /etc/nginx/sites-available/fracture-detect
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/fracture-detect /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. Set up SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com
```

8. Run the application:
```bash
# Install screen for persistent sessions
sudo apt install screen -y

# Create a new screen session
screen -S fracture-detect

# Run the application
python3 app.py

# Detach from screen session: Press Ctrl+A, then D
```

## Testing

### Integration Testing

The application has been thoroughly tested with the following integration test scenarios:

1. Frontend to Backend Integration:
   - Image upload functionality
   - API endpoint communication
   - Error handling and response validation
   - Authentication flow

2. Backend to AWS Services Integration:
   - SageMaker endpoint communication
   - DynamoDB operations
   - AWS credentials validation
   - Error handling for AWS services

3. End-to-End User Flow Testing:
   - User registration and login
   - Image upload and processing
   - Results display and history
   - Dashboard functionality
   - Responsive design across devices

### Test Results

All integration tests have passed successfully, confirming:
- Seamless communication between frontend and backend
- Proper data flow through AWS services
- Accurate fracture detection results
- Reliable data persistence in DynamoDB
- Optimal performance under load

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
├── styles/              # Global styles
└── backend/             # Python backend
    ├── app.py           # Flask application
    └── requirement.txt  # Python dependencies
```

## API Endpoints

### Backend Routes
- `GET /` - Health check endpoint
- `POST /predict` - Upload and analyze X-ray images
- `GET /history` - Retrieve prediction history

## Available Scripts

### Frontend
- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

### Backend
- `python app.py` - Start the Flask server

## AWS Integration

This application uses the following AWS services:
- **AWS SageMaker**: Hosts the fracture detection model
- **AWS DynamoDB**: Stores prediction history and results
- **AWS EC2**: Hosts the backend application

Make sure you have:
1. Configured AWS credentials
2. Created a SageMaker endpoint with the fracture detection model
3. Set up a DynamoDB table named "FracturePredictions"
4. Configured EC2 instance with appropriate security groups

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [AWS SageMaker](https://aws.amazon.com/sagemaker/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [AWS EC2](https://aws.amazon.com/ec2/)
- [Vercel](https://vercel.com/)
- [Flask](https://flask.palletsprojects.com/)
- [Pillow](https://pillow.readthedocs.io/)
- [Mangum](https://mangum.io/) 