# Servd AI

Servd AI is a full-stack service marketplace that connects customers with service providers. Users can discover services, get AI-powered recommendations, book services, make payments, and submit reviews.

## Features

* User registration and login
* JWT-based authentication
* Role-based access control
* Customer dashboard
* Provider profile management
* Service creation and management
* Service search and category filtering
* Service booking
* Booking status management
* Razorpay payment integration
* AI-powered service recommendation
* Customer reviews and ratings
* Admin dashboard
* MongoDB database

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### Integrations

* Google Gemini API
* Razorpay

## Project Flow

```text
Customer
   ↓
Browse Services
   ↓
Search / Filter
   ↓
View Service
   ↓
AI Recommendation
   ↓
Book Service
   ↓
Payment
   ↓
Dashboard
   ↓
Review
```

## User Roles

### Customer

* Browse services
* Search and filter services
* Use AI assistant
* Book services
* View bookings
* Submit reviews

### Provider

* Create provider profile
* Update availability
* Add services
* Manage listed services

### Admin

* View users
* View services
* View bookings

## Folder Structure

```text
Servd-ai/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd Servd-ai
```

### 2. Backend setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Frontend setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on the Vite development URL shown in the terminal.

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

GEMINI_API_KEY=your_gemini_api_key
```

Do not commit `.env` or API keys to GitHub.

## API Modules

| Module         | Main Endpoints   |
| -------------- | ---------------- |
| Authentication | `/api/auth`      |
| Providers      | `/api/providers` |
| Services       | `/api/services`  |
| Bookings       | `/api/bookings`  |
| Payments       | `/api/payments`  |
| Reviews        | `/api/reviews`   |
| AI             | `/api/ai`        |
| Admin          | `/api/admin`     |

## Security

* Passwords are hashed using bcryptjs.
* Authentication uses JWT tokens.
* Protected API routes require authentication.
* Admin APIs use role-based authorization.
* Provider service operations use ownership checks.
* Payment verification uses Razorpay signature validation.

## Future Improvements

* Provider booking management interface
* Improved payment status synchronization
* Notifications
* Image uploads for services
* Advanced recommendation capabilities
* Production deployment and monitoring

## Author

Manshi Katiyar
