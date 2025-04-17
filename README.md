# 🗳️ DoubtPolls – Frontend

**DoubtPolls** is a modern, dynamic polling application where users can create, vote, view results, and manage their profiles—all with a sleek UI and real-time updates. This is the **frontend** of the project built using **React**, **Vite**, **TypeScript**, **SCSS**, and **Recharts**.

> 🛠️ The backend is hosted separately. [Visit Backend Repository](https://github.com/keshavagrawal18/doubtpolls-backend)

---

## 🚀 Features

- 🔐 **User Authentication** (Login/Register)  
- 📊 **Poll Creation and Voting**  
- 📈 **Interactive Results Visualization** with Recharts  
- 🙋‍♂️ **User Profile** with Edit & Vote History  
- 🧠 **Context API** for Global State (Auth, Toast, Polls, Votes)  
- 🧱 **Reusable Components** (Buttons, Modals, Cards)  
- 💅 **SCSS-based Modular Styling**  
- 🌐 **SPA Routing** with `react-router-dom@v7`  
- 📦 **Optimized Vercel Deployment** with SPA support  
- 📱 Fully **Responsive Design**

---

## 🧪 Tech Stack

| Tech             | Description                          |
|------------------|--------------------------------------|
| React + TypeScript | Core library for UI and type safety |
| Vite             | Fast build and dev server            |
| React Router v7  | Client-side routing                  |
| SCSS             | Modular and customizable styles      |
| Recharts         | Data visualization in results        |
| React Toastify   | Toast notifications                  |
| Context API      | State management                     |
| UUID             | Generating unique IDs                |

---


## 📁 Project Structure

```plaintext
src/
├── api/          # API request modules
├── components/   # Reusable components (Button, Modal, InputField, etc.)
├── context/      # Auth, Poll, Votes, Toast Contexts
├── hooks/        # Custom hooks (useFetchPoll, useResults, etc.)
├── layouts/      # Main layout, Header, Footer
├── pages/        # Auth, Home, CreatePoll, Results, Profile, NotFound
├── routes/       # Protected routes (PrivateRoute)
├── styles/       # SCSS modules, _mixins.scss, _variables.scss
├── utils/        # Helpers like handleError.ts
├── App.tsx       # App entry with routes
└── main.tsx      # Vite root entry
```




---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/keshavagrawal18/doubtpolls-frontend.git
cd doubtpolls-frontend
```

## 🚀 Getting Started

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables
Create a .env file at the root of the project with the following content:

```bash
VITE_API_URL=http://localhost:5000/api
```
✅ Ensure this matches your backend server URL and port.

### 4. Run the Development Server
```bash
npm run dev
```
This will start the app at http://localhost:5173 

### 5. Deployment
This frontend is optimized for Vercel with full SPA (Single Page Application) support.
The vercel.json file includes route rewrites to handle:

### Dynamic routes

Fallback routing to index.html

This ensures client-side routing works even after refreshing or sharing deep links.

## 🎥 Demo

Check out the live demo: [DoubtPolls Demo](https://doubtpolls.vercel.app)
