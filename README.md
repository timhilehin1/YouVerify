# Invoice Application

A modern, full-featured invoice management application built with React 19 and powered by Supabase.

##  Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Notifications:** Sonner
- **Backend & Database:** Supabase
- **Authentication:** Supabase Auth
- **Testing:** [Vitest]

## ✨ Features

- User authentication and authorization
- Reead, update invoices
- Real-time data synchronization
- Responsive design for all devices
- Toast notifications for user feedback


## 📋 Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** package manager
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/timhilehin1/YouVerify.git]
cd YouVerify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the below Supabase credentials:

```env
VITE_SUPABASE_URL="https://dafydjpsyykdejvgfkaf.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZnlkanBzeXlrZGVqdmdma2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzODgyNDIsImV4cCI6MjA3NDk2NDI0Mn0.ZdJN6N6nwtlKlPf2gWPYY_A12kM4geP_Rq8--MvR20A"
```


## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5174` (default Vite port).

### Production Build

```bash
npm run build
```


## 🧪 Running Tests
```bash
npm run test
```


## 📁 Project Structure
```
youVerify-test/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API and Supabase services
│   ├── utils/            # Utility functions
│   ├── test/        # Test files
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── .env.local          # Example environment variables
└── package.json          # Project dependencies
```

## 🔑 Key Components Tested

The following critical components have comprehensive test coverage:
- Modal Component
- Invoice list rendering

## 🔐 Authentication
The application uses Supabase Authentication with the following features:
- Email/Password authentication
- Protected routes

**Test Credentials**
```
Email:admin@gmail.com
Password: @Youverify123
```

## 🎨 UI/UX Features

- Clean, modern interface with Tailwind CSS
- Real-time toast notifications via Sonner
- Responsive design for mobile, tablet, and desktop


## 🐛 Troubleshooting

### Common Issues

**Issue:** Application won't start
- **Solution:** Ensure all environment variables are correctly set in `.env.local` file




**Note for Judges:** If you encounter any issues during setup, please contact me at [timilehinoladapo0@gmail.com]. I'm available to provide support and answer any questions about the implementation.
