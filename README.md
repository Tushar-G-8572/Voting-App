# 🗳️ MERN Stack Voting App

A modern voting application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project allows user registration, role-based access (User/Admin), poll creation by admins, voting by users, and result visualization.

---

## 📁 Project Structure

### 🧠 Backend (`/backend`)
A Node.js + Express.js REST API that manages authentication, polls, votes, and admin/user roles.

#### 📦 Folders & Files
backend/
├── app.js
├── server.js
├── controller/
│ ├── admin.controller.js
│ ├── user.controller.js
│ └── poll.controller.js
├── db/
│ └── db.js
├── middleware/
│ ├── auth.js
│ └── role.js
├── models/
│ ├── user.model.js
│ ├── admin.model.js
│ └── poll.model.js
├── routes/
│ ├── admin.route.js
│ ├── user.route.js
│ └── poll.route.js
├── services/
│ ├── user.service.js
│ └── poll.service.js

### 💻 Frontend (`/frontend`)
A React.js-based UI with separate views for users and admins.

#### 📦 Folders & Files

frontend/
├── src/
│ ├── App.jsx
│ ├── Main.jsx
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ ├── Dashboard/
│ │ │ ├── AdminDashboard.jsx
│ │ │ └── UserDashboard.jsx
│ ├── pages/
│ │ ├── CreatePoll.jsx
│ │ ├── DeletePoll.jsx
│ │ ├── EditPoll.jsx
│ │ ├── ViewAllPolls.jsx
│ │ ├── ViewOpenPolls.jsx
│ │ ├── ViewVotedResult.jsx
│ │ ├── ViewVoter.jsx
│ │ └── VoteOpenPoll.jsx


## 🚀 Features

- 🔐 User Authentication (JWT)
- 🧑‍⚖️ Role-based access (Admin/User)
- 🗳️ Create, Edit, Delete, and View Polls
- ✅ One vote per user per poll
- 📊 View Results & Voter Info (Admin)
- 🧭 Responsive Dashboard UI

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Auth**: JWT (JSON Web Tokens)
