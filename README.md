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
- Create, read, update, and delete invoices
- Real-time data synchronization
- Responsive design for all devices
- Toast notifications for user feedback


## 📋 Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/timhilehin1/YouVerify.git]
cd youVerify-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**To get your Supabase credentials:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** > **API**
4. Copy the **Project URL** and **anon/public** key

### 4. Database Setup

The application requires the following Supabase tables:

- [List your table names and brief descriptions]
- Example: `invoices` - Stores invoice data
- Example: `customers` - Stores customer information

You can find the SQL schema in the `supabase/schema.sql` file (if provided), or import it directly in your Supabase SQL editor.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:5173` (default Vite port).

### Production Build

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🧪 Running Tests

```bash
npm run test
# or
yarn test
```

### Run Tests with Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📁 Project Structure

```
invoice-app/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API and Supabase services
│   ├── utils/            # Utility functions
│   ├── tests__/        # Test files
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── .env.example          # Example environment variables
└── package.json          # Project dependencies
```

## 🔑 Key Components Tested

The following critical components have comprehensive test coverage:

- [List your tested components]
- Example: Invoice form validation
- Example: Authentication flow
- Example: Invoice list rendering
- Example: User permissions

## 🔐 Authentication

The application uses Supabase Authentication with the following features:

- Email/Password authentication
- [Add if applicable: OAuth providers]
- Protected routes
- Session management

**Test Credentials (if applicable for judges):**

```
Email:admin@gmail.com
Password: @Youverify123
```

## 🎨 UI/UX Features

- Clean, modern interface with Tailwind CSS
- Real-time toast notifications via Sonner
- Responsive design for mobile, tablet, and desktop
- [Add any other UI features]

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 🐛 Troubleshooting

### Common Issues

**Issue:** Application won't start
- **Solution:** Ensure all environment variables are correctly set in `.env` file

**Issue:** Authentication errors
- **Solution:** Verify your Supabase credentials and check that RLS policies are properly configured

**Issue:** Database connection errors
- **Solution:** Confirm your Supabase project is active and the URL is correct



**Note for Judges:** If you encounter any issues during setup, please contact me at [your-email@example.com]. I'm available to provide support and answer any questions about the implementation.
