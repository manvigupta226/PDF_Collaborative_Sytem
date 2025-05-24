# 📄 PDF Management and Collaboration System

A full-stack web application that allows users to **upload, view, share, and comment on PDFs**. Built using **Node.js**, **Express**, **MySQL**, **React**, and **Tailwind CSS**.

---

## 🚀 Features

- 🧾 User authentication (JWT-based)
- 📤 Upload PDFs
- 📑 View PDF in browser (with preview)
- 🔗 Generate and share secure PDF links
- 💬 Commenting system per PDF
- 🧑‍🤝‍🧑 View shared PDFs in read-only mode
- 📥 Download PDF from shared link

---

## 🛠️ Tech Stack

| Frontend              | Backend                | Database |
|-----------------------|------------------------|----------|
| React, Tailwind CSS   | Node.js, Express.js    | MySQL    |

---


---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pdf-management-system.git
cd pdf-management-system

```
For backend

```bash
npm install
node server.js
```

For frontend

```bash
cd frontend
npm install
npm run start
```
Create .env file

```bash
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=pdf_app
```

### 2. 🗄️ Database Schema
Run the following SQL to create required tables:

```bash
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE pdfs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  original_name VARCHAR(255),
  file_path TEXT,
  share_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pdf_id INT,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pdf_id) REFERENCES pdfs(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🧪 API Endpoints

Auth Routes-

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Login and get JWT token |

PDF Routes-

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/api/files/upload`     | Upload a new PDF (auth)    |
| GET    | `/api/pdf/mypdfs`       | Get PDFs uploaded by user  |
| GET    | `/api/pdf/:id`          | Get PDF details + comments |
| POST   | `/api/pdf/:id/comments` | Add comment to PDF (auth)  |

Shared Routes-

| Method | Endpoint           | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/shared/:shareId` | Download PDF using shareable link |







