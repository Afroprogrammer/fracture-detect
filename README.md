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

### Backend
- **Framework**: Flask (Python)
- **AI/ML**: AWS SageMaker
- **Database**: AWS DynamoDB
- **API**: RESTful endpoints
- **CORS**: Flask-CORS

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)
- Python 3.x
- AWS Account with SageMaker and DynamoDB access
- AWS CLI configured with appropriate credentials

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
pip install flask flask-cors boto3
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
    └── requirements.txt  # Python dependencies
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

Make sure you have:
1. Configured AWS credentials
2. Created a SageMaker endpoint with the fracture detection model
3. Set up a DynamoDB table named "FracturePredictions"

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