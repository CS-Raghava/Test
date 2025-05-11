# TalentTwin

TalentTwin is a platform that connects people with talents to those who want to learn new skills. Users can sign up, showcase their expertise, and connect with others for skill training sessions.

## Features

- User authentication (signup/login)
- Talent profile creation and management
- Search for experts in specific talents
- Video meeting integration
- Secure payment processing
- Admin dashboard for payment management

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- Payment: Stripe
- Video Meetings: WebRTC

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```
3. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Add necessary environment variables (see .env.example files)

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm start
   ```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
``` 