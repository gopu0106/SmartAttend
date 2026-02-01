# 🎓 SmartAttend – Smart Attendance & Reward System

SmartAttend is a next-generation, automated attendance and coin-based reward system designed for modern universities and campuses. It combines real-time student tracking with a gamified coin economy, encouraging consistent attendance through meaningful incentives.

Built with a premium 3D landing experience and a scalable backend, SmartAttend delivers a seamless, secure, and engaging campus management platform.

---

## 🚀 Features

### ✨ Core Features
- 🎯 **Automated Attendance System** (QR-Based)
- 🪙 **Gamified Coin Economy** for Student Rewards
- 📊 **Student Dashboard** with Attendance & Wallet
- 👨‍🏫 **Faculty Portal** for Class Management
- 🍽️ **Mess Terminal Interface** for Coin Spending
- 🛡️ **Admin Panel** for System Monitoring
- 🔐 **Secure Authentication** using JWT & bcrypt

### 🌌 UI/UX Highlights
- ⚡ Reactive 3D Landing Page
- 🌠 Antigravity Particle Background
- 🖱️ Mouse-Responsive Animations
- 🎬 Smooth Transitions via Framer Motion
- 📱 Fully Responsive Design

---

## 🏗️ Tech Stack

### Frontend
- React v18 + Vite
- TailwindCSS
- Framer Motion
- Lucide React
- Three.js
- @react-three/fiber

### Backend
- Node.js
- Express.js
- SQLite3
- JWT Authentication
- bcrypt Password Hashing

---

## 🏛️ System Architecture

```mermaid
graph TD

User -->|Login| Frontend
Frontend -->|API Requests| Backend
Backend -->|Auth| JWT
Backend --> Database[(SQLite)]
Backend --> QR[QR Scanner]

Faculty --> Frontend
Admin --> Frontend
Student --> Frontend

Database --> Backend
