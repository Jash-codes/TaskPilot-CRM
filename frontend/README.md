
# 🚀 Taskpilot - Freelancer CRM & Business OS

![Taskpilot Banner](frontend/src/assets/dashboard-preview.png)
*(Replace this link with your actual dashboard screenshot)*

**Taskpilot** is a comprehensive Customer Relationship Management (CRM) and Business Operating System designed specifically for freelancers and solo agencies. It unifies project management, client relations, financial tracking, and productivity tools into a single, high-performance dark-mode interface.

---

## ✨ Key Features

### 📊 **Dashboard**
- Real-time overview of business health.
- Visual charts for Revenue History, Project Status, and Completion Rates.
- Quick stats for active clients, pending invoices, and total budget.

### 👥 **Client CRM**
- Complete client database management.
- **CSV Import/Export:** Bulk upload clients or backup your data.
- "View Projects" shortcut to see work associated with specific clients.
- Futuristic, glowing card UI.

### 📁 **Project Management (Kanban)**
- **Kanban Board:** Drag-and-drop style workflow (To Do -> In Progress -> Completed).
- **Project Details:** Deep dive into projects with scope, budget, and deadlines.
- **Task Checklist:** Interactive task management with add/delete/complete functionality.

### 💰 **Financials**
- **Invoice Generator:** Create professional invoices with dynamic line items.
- **Automatic Calculations:** Real-time total calculation.
- **Status Tracking:** Mark invoices as Paid or Pending.

### 🛠️ **Productivity Tools**
- **E-Signature:** Digital signature pad for signing contracts (Canvas API).
- **Calendar:** Auto-synced view of Project Deadlines and Invoice Due Dates.
- **Inbox:** Real-time chat interface to communicate with clients.

---

## 💻 Tech Stack

**Frontend:**
- **React (Vite):** Fast, modern UI development.
- **Redux Toolkit:** Global state management (Auth, Projects, Clients, Invoices).
- **Recharts:** Data visualization and charts.
- **Lucide React:** Modern icon set.
- **CSS3:** Custom "Extra O" Dark Theme (Glassmorphism, Grid Layouts).

**Backend:**
- **Node.js & Express:** RESTful API architecture.
- **MongoDB (Mongoose):** NoSQL database for flexible data storage.
- **JWT (JSON Web Tokens):** Secure authentication.
- **Multer & CSV-Parser:** File upload and processing.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/taskpilot.git](https://github.com/your-username/taskpilot.git)
cd taskpilot
````

### 2\. Backend Setup

Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `backend` folder and add:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

**Start the Backend Server:**

```bash
npm run dev
```

*Server will run on http://localhost:5001*

### 3\. Frontend Setup

Open a **new terminal**, navigate to the frontend folder, and install dependencies.

```bash
cd frontend
npm install
```

**Start the Frontend:**

```bash
npm run dev
```

*Client will run on http://localhost:5173*

-----

## 📂 Project Structure

```
taskpilot/
├── backend/
│   ├── config/         # DB Connection
│   ├── controllers/    # Logic for Users, Clients, Projects, Invoices
│   ├── middleware/     # Auth protection
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   └── server.js       # Entry point
│
└── frontend/
    ├── src/
    │   ├── app/        # Redux Store configuration
    │   ├── assets/     # Images and static files
    │   ├── components/ # Reusable UI (Sidebar, Header, Spinner)
    │   ├── features/   # Redux Slices & Services
    │   ├── pages/      # Main Views (Dashboard, Kanban, Invoices)
    │   ├── App.jsx     # Main Router
    │   └── index.css   # Global Styles & Theme Variables
```

-----

## 🔐 Accounts & Testing

You can register a new account on the `/register` page.
Once logged in, you will have access to the full dashboard.

**Demo Flow:**

1.  **Register** a user.
2.  Go to **Clients** -\> Add a new Client.
3.  Go to **Projects** -\> Create a Project assigned to that Client.
4.  Go to **Invoices** -\> Generate an invoice for that Project.
5.  Check the **Dashboard** to see your stats update automatically\!

-----

## 🤝 Contributing

Contributions are welcome\! Please fork the repository and create a pull request for any feature enhancements.

## 📄 License

This project is licensed under the MIT License.

```

---