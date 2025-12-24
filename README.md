User Management Dashboard
Project Overview

The User Management Dashboard is a full-stack web application built using React, Node.js, Express, MongoDB, and Tailwind CSS.
It allows users to perform complete CRUD operations such as creating, viewing, updating, and deleting user records through a clean and responsive interface.

This project demonstrates real-world full-stack development with REST APIs and database integration.

Features

Display all users in a dashboard

Add a new user

View user details

Edit existing user information

Delete a user with confirmation

Responsive UI using Tailwind CSS

RESTful API integration

Tech Stack:

# Frontend
React

React Router DOM

Tailwind CSS

Fetch API

# Backend

Node.js

Express.js

MongoDB

Mongoose

user-management-dashboard/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│
└── README.md



| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/users     | Get all users   |
| GET    | /api/users/:id | Get user by ID  |
| POST   | /api/users     | Create new user |
| PUT    | /api/users/:id | Update user     |
| DELETE | /api/users/:id | Delete user     |



Validation

Validation is implemented at the backend using Mongoose schema validation

Required fields such as name and email are validated

Email format is validated before saving data to the database

This ensures data consistency and prevents invalid records.

State Management

useState is used to manage form and user data

useEffect is used to fetch data from the backend

API logic is separated for better code readability

UI & Styling

Tailwind CSS is used for styling

Responsive layout for all screen sizes

Clean and minimal dashboard design


@ How to run project
# Backend
cd backend
npm install
npx nodemon server.js

# Frontend
cd frontend
npm install
npm start

Key Learnings

Full CRUD implementation using REST APIs

React routing and component-based architecture

Backend validation and error handling

MongoDB data modeling with Mongoose

Clean frontend-backend integration

## conclusion
This project showcases a complete full-stack CRUD application with proper architecture and best practices.
It is suitable for academic projects, internships, and entry-level developer roles.

