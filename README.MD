<h1 align="center"> Full-Stack Chat App with Auth & Emails </h1>

<p align="center">
  <img src="walter-frontend/Screenshot%202026-02-06%20084538.png" alt="Screenshot" width="800" />
</p>

<h2 align="center"> Live Demo</h2>

<p align="center">
   <strong>Project Link:</strong><br>
   <a href="https://chatify-1-6nr8.onrender.com">https://chatify-1-6nr8.onrender.com</a>
</p>

<p align="center">
   <strong>Note:</strong> This application is hosted on <b>Render (Free Tier)</b>.<br>
  Due to cold start behavior, the server may take <b>15–20 seconds</b> to wake up.<br>
  A loading screen will appear during this time. Please wait patiently.
</p>

Highlights:

-  Real-time Messaging via Socket.io
-  Online/Offline Presence Indicators
-  Notification & Typing Sounds (with toggle)
-  Welcome Emails on Signup (Resend)
-  Image Uploads (Cloudinary)
-  Node.js & Express
-  MongoDB for Data Base Management
-  Beautiful UI with React, Tailwind CSS 
-  Easy Deployment (free-tier friendly with Render)

---

##  .env Setup

### Backend (`/backend`)

```bash
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

##  Run the Backend

```bash
cd backend
npm install
npm run dev
```

##  Run the Frontend

```bash
cd frontend
npm install
npm run dev
```
