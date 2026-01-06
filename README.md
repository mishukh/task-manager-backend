# Task Manager Backend

Backend API for a multi-tenant task management system. Built with Node.js, Express, and MongoDB.

## Setup

1.  **Install**: `npm install`
2.  **Config**: Create a `.env` file:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/taskmanager
    JWT_SECRET=your_secret_key
    ```
3.  **Run**: `npm run dev`

## API Reference

All endpoints except **Auth** require the header: `Authorization: Bearer <your_token>`.

### Authentication

*   **Register**
    `POST /api/auth/register`
    Creates a new account and organization. You automatically become the admin.
    *Body:* `{ "username": "Alice", "email": "alice@corp.com", "password": "pass", "orgName": "Alice Corp" }`

*   **Login**
    `POST /api/auth/login`
    Returns your access token.
    *Body:* `{ "email": "alice@corp.com", "password": "pass" }`

### Projects

*   **Create Project**
    `POST /api/projects`
    *Body:* `{ "name": "Website Redesign", "description": "Q1 Goal" }`

*   **List Projects**
    `GET /api/projects`
    Returns all projects in your organization.

*   **Get Project**
    `GET /api/projects/:id`
    Get details for a specific project.

*   **Update Project**
    `PUT /api/projects/:id`
    *Body:* `{ "name": "New Name", "description": "New Desc" }`

*   **Delete Project**
    `DELETE /api/projects/:id`
    Removes the project permanently.

### Tasks

*   **Create Task**
    `POST /api/tasks`
    *Body:* `{ "title": "Fix Bug", "project": "project_id", "priority": "high", "dueDate": "2024-12-31" }`
    *Note: `project` ID is optional but recommended.*

*   **List Tasks**
    `GET /api/tasks`
    Get all tasks. Supports filtering:
    *   `GET /api/tasks?status=in-progress`
    *   `GET /api/tasks?project=project_id`
    *   `GET /api/tasks?assignedTo=user_id`

*   **Get Task**
    `GET /api/tasks/:id`

*   **Update Task**
    `PUT /api/tasks/:id`
    *Body:* `{ "status": "done" }`

*   **Delete Task**
    `DELETE /api/tasks/:id`

### Users

*   **List Users**
    `GET /api/users`
    See everyone in your organization.

*   **Get User**
    `GET /api/users/:id`

*   **Update User**
    `PUT /api/users/:id`
    Update roles or details. Admin/Manager only.
    *Body:* `{ "role": "manager" }`

*   **Delete User**
    `DELETE /api/users/:id`
    Admin only.
