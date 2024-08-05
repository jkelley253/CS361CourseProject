# CS361CourseProject

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Features

- **Onboarding:** Add new employees with details like name, email, manager, team, title, and application access.
- **Offboarding:** Remove employees and revoke their access to applications and groups.
- **Employee Maintenance:** Update employee details and manage their application and group access.
- **App Maintenance:** Manage application access for employees, including removing inactive users.
- **Org Chart:** View the organization chart based on employee titles.
- **Notifications:** Create, update, delete, and push notifications to users. Daily reminders are automatically created and managed.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ai-org-system.git
   cd ai-org-system

### Dependencies 

cd backend
npm install
npm install mongoose
npm install dotenv
npm install config
npm install cors
npm install body-parser

cd ../frontend
npm install
npm install react-router-dom

cd ../notifications
npm install
npm install mongoose
npm install dotenv
npm install config
npm install cors
npm install node-cron



### Env
#### backend/.env
PORT=5080
MONGODB_URI=mongodb+srv://user1:test@cluster0.yffalho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

#### notifications/.env
PORT=5081
MONGODB_URI=mongodb+srv://user1:test@cluster0.yffalho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

## Usage
- **Login Page: Navigate to the login page to log in or create a new account.
- **Home Page: After logging in, access different features like onboarding, offboarding, employee maintenance, app maintenance, and org chart.
- **Notifications: View and manage notifications, which will display on the home page.

## Project Structure 
-Backend
--controllers
--models
--routes
--server.mjs
--.env

-frontend
--src
---assets
---componenets
---app.js
---.env

-notifications
--controllers
--models
--routes
--notificationScheduler.mjs
--server.mjs
--.env

## API endpoints

### Users:
- **POST /api/users - Create a new user
- **GET /api/users/:email - Get user by email
- **PUT /api/users/:email - Update user by email
- **DELETE /api/users/offboard/:email - Offboard a user
  
### Employees:
- **GET /api/employees - Get all active employees

### Applications:
- **GET /api/apps/:appName/users - Get users by app name
- **PUT /api/apps/:appName/remove-users - Remove users from app

### Notifications:
- **POST /api/notifications - Create a notification
- **GET /api/notifications - Get all notifications
- **PUT /api/notifications/:id - Update a notification
- **DELETE /api/notifications/:id - Delete a notification
- **POST /api/notifications/push - Push notifications to users

## Technologies Used
- ** frontend: React, Axios, CSS
- ** backend: Node.js, Express, Mongoose, MongoDB
- ** Notifications: Node.js, Express, Mongoose, MongoDB, node-cron
