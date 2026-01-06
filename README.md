# Task Manager Backend

This is the backend API for a Task Management application, built with Node.js, Express, and MongoDB. It features user authentication, role-based access control (RBAC), and management of projects and tasks.

## Features

- **User Authentication**: Register and login with secure password hashing (bcryptjs) and JWT authentication.
- **Role-Based Access Control (RBAC)**: Support for different user roles (e.g., `admin`, `manager`, `user`) to control access to resources.
- **Project Management**: Create, read, update, and delete projects.
- **Task Management**: Create, read, update, and delete tasks.
- **Secure Routes**: specific endpoints are protected and require a valid JWT token.

## Technologies Used

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: JSON Web Token (JWT)
-   **Security**: bcryptjs (Password hashing), CORS
-   **Environment Management**: dotenv

## getting Started

### Prerequisites

-   Node.js (v14 or higher recommended)
-   MongoDB (Local or AtlasURI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd task-manager-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration:**
    Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    *Note: Replace values with your actual configuration.*

4.  **Run the server:**
    
    Development mode (using nodemon):
    ```bash
    npm run dev
    ```
    *Note: You may need to add a "dev" script to package.json: `"dev": "nodemon src/app.js"` if it doesn't exist, or just use `npx nodemon src/app.js`.*

    Production mode:
    ```bash
    node src/app.js
    ```

    The server will start on `http://localhost:5000` (or your defined PORT).

## API Endpoints

### Authentication
-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login user and return JWT

### Users
*Requires Authentication*
-   `GET /api/users` - Get all users (Admin only)
-   `GET /api/users/:id` - Get user details
-   `PUT /api/users/:id` - Update user (Admin/Manager)
-   `DELETE /api/users/:id` - Delete user (Admin only)

### Projects
*Requires Authentication*
-   `POST /api/projects` - Create a project (Admin/Manager)
-   `GET /api/projects` - Get all projects
-   `GET /api/projects/:id` - Get a specific project
-   `PUT /api/projects/:id` - Update a project (Admin/Manager)
-   `DELETE /api/projects/:id` - Delete a project (Admin/Manager)

### Tasks
*Requires Authentication*
-   `POST /api/tasks` - Create a task (Admin/Manager)
-   `GET /api/tasks` - Get all tasks
-   `GET /api/tasks/:id` - Get a specific task
-   `PUT /api/tasks/:id` - Update a task (Admin/Manager)
-   `DELETE /api/tasks/:id` - Delete a task (Admin/Manager)


