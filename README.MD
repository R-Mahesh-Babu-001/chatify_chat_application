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
-  Complete PWA integration with "Add to Homescreen"
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

### Backend (`/walter-backend`)

```bash
PORT=3000
MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster-name>.mongodb.net/chatify?retryWrites=true&w=majority&appName=<cluster-name>

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
cd walter-backend
npm install
npm run dev
```

##  Run the Frontend

```bash
cd walter-frontend
npm install
npm run dev
```

---

## MongoDB Atlas Free Tier (M0)

1. Create a free `M0` cluster in MongoDB Atlas.
2. Create a database user with `readWrite` access.
3. In `Network Access`, allow your Render backend to connect.
For quick setup, add `0.0.0.0/0` and tighten later.
4. Copy the Atlas connection string and set database name to `chatify`.

Example:

```text
mongodb+srv://<db_user>:<db_password>@<cluster-name>.mongodb.net/chatify?retryWrites=true&w=majority&appName=<cluster-name>
```

5. In Render backend service (`chatify-backend`) set:
- `MONGO_URI` = Atlas URI above
- `NODE_ENV` = `production`
- `PORT` = `5001`
- `CLIENT_URL` = `https://<your-frontend-service>.onrender.com` (no trailing slash)

6. In Render frontend service (`chatify-frontend`) set:
- `VITE_API_URL` = `https://<your-backend-service>.onrender.com/api`

If you use more than one frontend origin, set backend `CLIENT_URL` as a comma-separated list.
Example:

```text
https://chatify-frontend.onrender.com,http://localhost:5173
```
