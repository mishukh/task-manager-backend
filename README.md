# Task Manager Backend

A robust, multi-tenant REST API for managing project workflows. This backend allows multiple organizations to exist in isolation, ensuring that users can only access data belonging to their specific organization.

---

## Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose Schema)
*   **Auth**: JSON Web Tokens (JWT) & Bcrypt
*   **Validation**: Mongoose Built-in Validators


## 🚀 Quick Start Guide

Follow these steps to get the server running without any errors.

### 1. Prerequisites
Ensure you have the following installed:
*   **Node.js** (v14 or newer)
*   **MongoDB** (running locally or a cloud URI)

### 2. Installation
Open your terminal in the project folder and run:
```bash
npm install
```

### 3. Configuration
Create a file named `.env` in the root directory (same level as `package.json`).
**Copy and paste the following content into it:**

```env
PORT=5000
MONGO_URI=mongo_key
JWT_SECRET=super_secret_key
```
*   *Note: If using MongoDB Atlas, replace the `MONGO_URI` with your connection string.*

### 4. Run the Server
```bash
npm run dev
```
You should see:
> Server running on port 5000
> MongoDB connected

---

## 🔑 How to Authenticate

This API uses **Bearer Token Authentication**. Most endpoints are protected and require a token.

**Step 1: Register or Login**
*   Send a `POST` request to `/api/auth/register` or `/api/auth/login`.
*   The response will contain a `token`.

**Step 2: Use the Token**
*   For all subsequent requests (e.g., creating tasks), you **MUST** include the following header:
    *   **Key**: `Authorization`
    *   **Value**: `Bearer <YOUR_TOKEN_HERE>`

---

## 📡 API Endpoints Reference

### Authentication (Public)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new Org & Admin. Body: `{ "username": "...", "email": "...", "password": "...", "orgName": "..." }` |
| `POST` | `/api/auth/login` | Login to receive your access token. Body: `{ "email": "...", "password": "..." }` |

### Projects (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/projects` | List all projects in your organization. |
| `POST` | `/api/projects` | Create a project. Body: `{ "name": "New Website", "description": "..." }` |
| `GET` | `/api/projects/:id` | Get details of a specific project. |
| `PUT` | `/api/projects/:id` | Update project details. |
| `DELETE` | `/api/projects/:id` | Permanently delete a project. |

### Tasks (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | List tasks. Filters: `?status=todo`, `?project=ID`. |
| `POST` | `/api/tasks` | Create a task. Body: `{ "title": "Fix Header", "project": "ID", "priority": "high", "dueDate": "YYYY-MM-DD" }` |
| `GET` | `/api/tasks/:id` | Get single task details. |
| `PUT` | `/api/tasks/:id` | Update status/details. Body: `{ "status": "done" }` |
| `DELETE` | `/api/tasks/:id` | Delete a task. |

### Users (Protected)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users` | List all team members. |
| `GET` | `/api/users/:id` | Get user profile. |
| `PUT` | `/api/users/:id` | Update role (Admin only). Body: `{ "role": "manager" }` |
| `DELETE` | `/api/users/:id` | Remove a user (Admin only). |

---

## 🛡️ Features & Security

*   **Organization Isolation**: Users created in "Company A" cannot access "Company B" data.
*   **Role-Based Access**:
    *   **Admins**: Full access.
    *   **Managers**: Can manage content but not delete users.
    *   **Users**: Standard access.
*   **Validation**: Invalid inputs (like missing email) return clear `400 Bad Request` errors.
