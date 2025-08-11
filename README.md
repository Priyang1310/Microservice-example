# 📦 Microservices Lab Practical — Student & Course Management

This is a **minimal microservices architecture** example using **MongoDB**, **Node.js**, and an **API Gateway**.  
It demonstrates:
- Independent microservices
- Separate databases
- Inter-service communication
- API Gateway routing

---

## 🚀 Features
- **API Gateway** → Routes requests to respective microservices
- **Student Service** → Manages students, stores in its own DB
- **Course Service** → Manages courses, stores in its own DB
- **Service Communication** → Student Service validates course via Course Service before saving

---

## 🏗 Architecture
```
[ Client ]
    ↓
API Gateway (Port 5000)
 ├── /students → Student Service (Port 5001, DB: studentdb)
 │       ↳ Calls Course Service to check course exists
 └── /courses → Course Service (Port 5002, DB: coursedb)
```

---

## 📂 Folder Structure
```
microservices-lab/
│
├── api-gateway/
│   └── index.js
│
├── student-service/
│   ├── index.js
│   └── models/
│       └── Student.js (optional if separating schema)
│
├── course-service/
│   ├── index.js
│   └── models/
│       └── Course.js (optional if separating schema)
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally

---

### 2️⃣ Install Dependencies

#### API Gateway
```bash
cd api-gateway
npm init -y
npm install express http-proxy-middleware
```

#### Student Service
```bash
cd ../student-service
npm init -y
npm install express mongoose axios
```

#### Course Service
```bash
cd ../course-service
npm init -y
npm install express mongoose
```

---

## ▶️ Running the Services

1. **Start MongoDB** (e.g., `mongod` in a terminal)
2. Run each service in separate terminals:

```bash
# Terminal 1: Course Service
cd course-service
node index.js

# Terminal 2: Student Service
cd student-service
node index.js

# Terminal 3: API Gateway
cd api-gateway
node index.js
```

---

## 🧪 Testing

### Add a course
```bash
POST http://localhost:5000/courses
Content-Type: application/json

{
  "title": "Math",
  "description": "Basic Algebra"
}
```

### Add a student (valid course)
```bash
POST http://localhost:5000/students
Content-Type: application/json

{
  "name": "Priyang",
  "age": 20,
  "course": "Math"
}
```

✅ Student will be saved if the course exists.

### Add a student (invalid course)
```bash
POST http://localhost:5000/students
Content-Type: application/json

{
  "name": "Anup",
  "age": 21,
  "course": "Science"
}
```

❌ Will return:
```json
{ "error": "Course does not exist" }
```

---

## 📌 Notes
- Each microservice uses **its own MongoDB database**
- Communication between services is done using **Axios HTTP calls**
- API Gateway is implemented using **http-proxy-middleware**
