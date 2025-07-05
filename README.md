# 🛠️ Project Management Tool – Full Stack App

A complete project and task management system built with **NestJS**, **React**, **TypeScript**, and **MySQL**.

---

## 🚀 Tech Stack

### 🔧 Backend (`/backend`)
- **Framework:** NestJS  
- **Language:** TypeScript  
- **Database:** MySQL  
- **ORM:** TypeORM  
- **Authentication:** JWT Passport.js (with `AuthGuard`)  
- **Authorization:** Role-based For APId 
- **Validation:** `class-validator`, `class-transformer`  
- **Security:** Bcrypt (for password hashing)  
- **Configuration:** `.env` using `ConfigModule`  

### 🎨 Frontend (`/frontend`)
- **Framework:** React + Vite  
- **Language:** TypeScript  
- **State Management:** Redux Toolkit  
- **Forms & Validation:** React Hook Form + Yup  
- **Routing:** React Router DOM v6  
- **Auth:** JWT stored in Redux  
- **UI:** Tailwind CSS  
- **Security:** Protected Routes with Route Guard  

---

## 📁 Folder Structure

```bash
├── backend/
│   ├── src/
│   │   ├── auth/                # Signin/Signup logic
│   │   ├── user/                # User module
│   │   ├── project/             # Project CRUD
│   │   ├── task/                # Task CRUD
│   │   ├── common/              # DTOs, Guards, Utils
│   │   ├── database/    
│   │   └── main.ts
├── frontend/
│   ├── src/
│   │   ├── pages/               # Login, Dashboard, etc.
│   │   ├── components/          # UI components
│   │   ├── store/               # Redux setup
│   │   └── App.tsx
└── README.md

---

#####3️⃣ Setup .env

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=projectmanagtool

JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=7d

###🛠️ Scripts🔧 Backend
npm run seed            # Run seeder manually

####5️⃣ Start Backend Server
npm run start:dev       # Start NestJS server
Server runs at: http://localhost:3000

####⚛️ Frontend Setup
1️⃣ Installation
cd frontend
npm install
2️⃣ Start Frontend Server
npm run start:dev       # Start React server
App runs at: http://localhost:5173

###########✨ Features
🔐 Auth
JWT-based login/logout

Auth state managed by Redux

Protected routes with redirect

######📂 Project Management
Create / Edit / Delete Projects

View Project details

Task Management under projects

Task CRUD operations

########📌 Usage
####Use one of the following credentials to login:

{
  "username": "dr@gmail.com",
  "password": "dr@34$"
}
{
  "username": "test@example.com",
  "password": "Test@123"
}