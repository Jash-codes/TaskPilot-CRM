
# 🚀 Taskpilot - Freelancer CRM & Business OS

**Taskpilot** is a comprehensive Customer Relationship Management (CRM) and Business Operating System designed for freelancers and solo agencies. It unifies project management, client relations, financial tracking, and productivity tools into a single, high-performance dark-mode interface.

---

## ✨ Key Features

### 📊 **Dashboard**

* Real-time business overview
* Revenue history charts
* Project status pie charts
* Completion rate gauges
* Quick stats: active clients, pending invoices, total budget

### 👥 **Client CRM**

* Centralized client management
* CSV import/export support
* Quick action: View Projects
* Futuristic UI with glassmorphism

### 📁 **Project Management (Kanban)**

* Trello-like drag & drop Kanban board
* Detailed project view with budget, deadlines, scope
* Interactive task checklist

### 💰 **Financials**

* Invoice generator
* Dynamic line items (qty, price)
* Auto total calculation
* Payment status tracking

### 🛠️ **Productivity Tools**

* E-Signature pad (HTML5 Canvas)
* Calendar with synced deadlines
* Inbox (simulated real-time chat UI)
* Settings: profile & password management

---

## 💻 Tech Stack

### **Frontend**

* React (Vite)
* Redux Toolkit
* CSS3 (Variables, Grid, Flexbox, Glassmorphism)
* Recharts
* Lucide React
* Framer Motion

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT, bcryptjs
* Multer, CSV-Parser

---

## 🚀 Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/Jash-codes/TaskPilot-CRM.git
cd TaskPilot-CRM
```

---

## 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
npm install
```

### **Create `.env` file**

```
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key_here
```

### **Start Backend Server**

```bash
npm run dev
```

Backend runs at: **[http://localhost:5001](http://localhost:5001)**

---

## 🖥️ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

### **Start Frontend**

```bash
npm run dev
```

Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

---

## 📂 Project Structure

```
taskpilot/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Logic for Users, Clients, Projects, Invoices, Messages
│   ├── middleware/     # Authentication & Error handling
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   └── server.js       # Entry point
│
└── frontend/
    ├── src/
    │   ├── app/        # Redux store setup
    │   ├── assets/     # Images, logos
    │   ├── components/ # Sidebar, Header, Spinner, PrivateRoute, etc.
    │   ├── features/   # Redux slices & services
    │   ├── pages/      # Dashboard, Clients, Projects, Invoices, etc.
    │   ├── App.jsx     # Routing & Layout
    │   └── index.css   # Global styling + theme variables
```

---

## 🔐 Accounts & Testing

You can register a new account at **/register**.

### Recommended Demo Flow:

1. Register a new user
2. Add a Client (ex: Tech Corp)
3. Create a Project linked to the client
4. Add tasks inside the project
5. Generate an invoice for that project
6. Visit Dashboard → watch charts update

---

## 🤝 Contributing

Contributions are always welcome!

### Steps:

1. Fork the repository
2. Create your branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit changes:

   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to your branch:

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.


