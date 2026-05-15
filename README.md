# 🚢 FerryGo - Ferry Booking System

[![Next.js](https://img.shields.io/badge/Next.js-14-blue)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A modern, full-featured ferry booking platform that allows users to search, book, and manage ferry tickets across Indonesia.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Key Pages](#-key-pages)
- [Testing Credentials](#-testing-credentials)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## ✨ Features

### User Features
- 🔐 **Authentication** - Register, login, and manage your account
- 🔍 **Search Ferries** - Search by date, route, and ship type
- 📅 **Passenger Management** - Add multiple passengers per booking
- 💳 **Multiple Payment Methods** - Credit Card, Bank Transfer, QRIS, E-Wallet
- 📋 **Booking History** - View, manage, and cancel bookings
- 👤 **User Profile** - Update personal information and change password
- 🆘 **Help Center** - FAQ and contact support

### Admin Features
- 📊 **Admin Dashboard** - Overview statistics and metrics
- 🚢 **Ship Management** - Add, edit, and manage ferry ships
- 📅 **Schedule Management** - Manage departure schedules
- 👥 **User Management** - Manage registered users
- 📝 **Booking Management** - View all bookings in the system
- ⚙️ **System Settings** - Configure application settings

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State Management | Zustand |
| HTTP Client | Fetch API |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## 📁 Project Structure
frontend/

├── app/

│ ├── admin/ # Admin dashboard (protected)

│ ├── booking/ # Booking flow (search, passenger, payment)

│ ├── bookings/ # My Bookings list and details

│ ├── help/ # Help center with FAQ

│ ├── login/ # Login page

│ ├── register/ # Registration page

│ ├── profile/ # User profile management

│ ├── layout.tsx # Root layout with header/footer

│ └── page.tsx # Homepage

├── components/

│ ├── auth/ # Login, Register forms

│ ├── booking/ # ShipCard, PassengerForm, ProgressIndicator

│ ├── layout/ # Header, Footer

│ ├── ui/ # shadcn/ui components (button, card, etc.)

│ └── admin/ # Dashboard stats cards

├── contexts/ # AuthContext for authentication state

├── lib/

│ ├── api.ts # API client for backend communication

│ ├── constants.ts # Navigation and footer data

│ └── utils.ts # Helper functions

├── public/ # Static assets (images, favicon)

└── styles/ # Global CSS with Tailwind


---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ferry-booking-frontend.git

# 2. Navigate to project
cd ferry-booking-frontend

# 3. Install dependencies
npm install

# 4. Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# 5. Run development server
npm run build
npm run start

# Backend API URL (required)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Optional: Custom port
PORT=3000

NEXT_PUBLIC_API_URL=https://your-backend-url.com/api

