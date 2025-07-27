# ✍️ Signature Verification Using MERN and Machine Learning

A full-stack web application that allows users to upload and verify handwritten signatures using a trained machine learning model. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Python for ML processing.

![Banner](https://raw.githubusercontent.com/Vinay-Shankar-Adepu/Signature-Verification-Using-MERN-And-ML/main/banner.png) <!-- Replace or remove if no banner -->

---

## 📌 Key Features

- 📁 Upload and analyze signature images
- 🤖 Machine Learning model to verify signature authenticity
- 🔐 Secure authentication (login/logout)
- 👤 Admin and user account roles
- 🎨 Clean and responsive UI with modern gradient design
- 🔄 Real-time interaction between frontend and backend

---

## 🛠️ Tech Stack

| Layer      | Technologies                       |
|------------|------------------------------------|
| Frontend   | React.js, HTML/CSS, Axios          |
| Backend    | Node.js, Express.js                |
| Database   | MongoDB (Mongoose ORM)             |
| ML Model   | Python, OpenCV, TensorFlow/Keras   |
| Deployment | (To be added: e.g., Vercel, Heroku) |

---

## 📂 Folder Structure
Signature-Verification-Using-MERN-And-ML/
│
├── frontend/ # React app
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
│
├── backend/ # Node.js + Express backend
│ ├── routes/
│ ├── controllers/
│ └── server.js
│
├── ml/ # (Optional) Python scripts for ML
│ └── verify_signature.py
│
├── .env
├── .gitignore
└── README.md

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vinay-Shankar-Adepu/Signature-Verification-Using-MERN-And-ML.git
cd Signature-Verification-Using-MERN-And-ML

cd backend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string

npm run server

cd ../frontend
npm install
npm start
```
---
## 🧠 ML Model Overview
Signature images are preprocessed using OpenCV.

A Convolutional Neural Network (CNN) model is trained to detect forged vs original signatures.

Prediction API (Flask or FastAPI) compares the uploaded image with reference.

Returns a similarity/confidence score and match verdict.

---

## 🔐 Authentication & Roles
Users can register/login and upload signatures

Admin dashboard (optional) to monitor verification attempts

Secure route access with role-based control

---

## 📬 Contact

Made with ❤️ by **Vinay Shankar Adepu**

- 📧 Email: [vinayshankaradepu@gmail.com](mailto:vinayshankaradepu@gmail.com)
- 🔗 GitHub: [Vinay-Shankar-Adepu](https://github.com/Vinay-Shankar-Adepu)
- 💼 LinkedIn: [linkedin.com/in/vinay-adepu](https://www.linkedin.com/in/vinay-adepu)


