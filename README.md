# ExTracker - Premium Personal Finance Application

ExTracker is a full-stack, responsive, and secure personal finance application built on the MERN stack (MongoDB, Express.js, React, Node.js). It empowers users to take control of their finances with advanced expense tracking, smart category budgeting, long-term savings goals, and deep visual analytics.

## 🚀 Features

- **Authentication System:** Secure JWT-based login and registration system with encrypted passwords (bcrypt).
- **Smart Dashboard:** A central command center featuring:
  - Month-over-Month (MoM) spending comparisons.
  - Recent transactions quick-view.
  - Interactive Bar and Pie charts (powered by Recharts) for monthly and categorical analysis.
- **Advanced Expense Tracking:** Log, edit, and delete expenses with details like category, amount, date, and descriptions. Includes search and category filtering.
- **Category Budgets:** Set strict spending limits for categories (e.g., Food, Travel) and track progress visually with dynamic progress bars.
- **Savings Goals:** Set target financial goals (e.g., Emergency Fund) and log funds towards them natively on the dashboard.
- **Data Export:** Instantly export your entire expense history to a `.csv` file.
- **Mobile-First Responsive Design:** A sleek, dark-themed UI that seamlessly transitions from a robust desktop layout to a mobile-friendly bottom navigation bar.

---

## 🏗️ System Architecture (Tech Stack)

### Frontend (Client)
- **Framework:** React 18 + Vite (for lightning-fast HMR and building)
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API (for global authentication state)
- **Styling:** Pure Vanilla CSS (`index.css`) with custom CSS Variables, Flexbox/Grid, and responsive media queries.
- **Data Visualization:** Recharts
- **Icons:** Lucide-React
- **HTTP Client:** Axios (configured with interceptors for automatic JWT injection)

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js (REST API architecture)
- **Database:** MongoDB (using Mongoose ODM for schema modeling)
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** `bcryptjs` (password hashing), CORS configured.

---

## 📁 Directory Structure

```text
ExTracker/
├── client/                     # React Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api.js              # Axios instance & interceptors
│   │   ├── App.jsx             # Main routing and layout wrapper
│   │   ├── main.jsx            # React entry point
│   │   ├── index.css           # Global styles and design system
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ExpenseForm.jsx # Form for adding/editing expenses
│   │   │   ├── ExpenseList.jsx # Table view of expenses
│   │   │   ├── Navbar.jsx      # Responsive Sidebar / Bottom Nav
│   │   │   └── ProtectedRoute.jsx # Route guard for authenticated pages
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state and methods
│   │   └── pages/              # Application Routes
│   │       ├── Budgets.jsx     # Budget management page
│   │       ├── Dashboard.jsx   # Analytics and metrics overview
│   │       ├── Expenses.jsx    # Detailed expense tracking and export
│   │       ├── GenericPage.jsx # Dynamic content renderer for static pages
│   │       ├── Home.jsx        # Premium landing page
│   │       ├── Login.jsx       # User login view
│   │       └── Register.jsx    # User registration view
│   ├── index.html              # HTML template (SEO Optimized)
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
│
└── server/                     # Node.js Backend
    ├── middleware/             
    │   └── auth.js             # JWT verification middleware
    ├── models/                 # Mongoose Database Schemas
    │   ├── Budget.js           # Budget limits schema
    │   ├── Expense.js          # Expense records schema
    │   ├── Goal.js             # Savings goal schema
    │   └── User.js             # User accounts schema
    ├── routes/                 # Express API Routes
    │   ├── auth.js             # POST /register, POST /login, GET /me
    │   ├── budgets.js          # GET, POST, PUT, DELETE /budgets
    │   ├── expenses.js         # GET, POST, PUT, DELETE, /monthly-summary
    │   └── goals.js            # GET, POST, PUT, DELETE /goals
    ├── server.js               # Express app setup and DB connection
    ├── .env                    # Environment variables (Hidden)
    └── package.json            # Backend dependencies
```

---

## ⚙️ Detailed Setup Instructions

To run this project locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)

### 1. Backend Setup

1. Open a terminal and navigate to the server directory:
   ```bash
   cd ExTracker/server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server/` directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend development server:
   ```bash
   node server.js
   ```
   *The server will run on `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a new terminal window and navigate to the client directory:
   ```bash
   cd ExTracker/client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Ensure the proxy in `vite.config.js` is correctly pointing to your backend port (`http://localhost:5000`). This is already configured by default.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The client will run on `http://localhost:5173`.*

### 3. Usage
Open your browser and navigate to `http://localhost:5173`. You can explore the landing page, create an account, log in, and start tracking your finances!

---

## 🚀 Deployment Guide (Production)

To deploy this application to the web:

1. **Backend Deployment (e.g., Render, Railway, Fly.io):**
   - Push your code to GitHub.
   - Connect the repository to your hosting provider.
   - Set the Root Directory to `server`.
   - Set your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`).
   - The start command is `node server.js`.

2. **Frontend Deployment (e.g., Vercel, Netlify):**
   - Connect the repository to your hosting provider.
   - Set the Framework Preset to `Vite`.
   - Set the Root Directory to `client`.
   - Before deploying, update the `api.js` base URL to point to your live deployed backend URL instead of `/api`.
   - Deploy.

---
*Built with ❤️ using the MERN stack.*
