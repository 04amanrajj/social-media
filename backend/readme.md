# Social Media Backend API

This is a **Node.js** and **Express.js** backend API for a social media application. This project focuses on a set of core features to demonstrate proficiency in modern full-stack development.

The API supports user authentication, post management, and robust database interactions. It is a foundational component designed to be integrated with a front-end application, such as one built with **React**.

---

## 🚀 Key Features

* **User Authentication & Authorization**: Secure user registration, login, and logout with **JSON Web Tokens (JWT)** and **Bcrypt** for password hashing. The API also supports third-party authentication via **OAuth 2.0**.
* **Real-Time Communication**: Implements **WebSockets** using **Socket.IO** to enable features like real-time notifications or chat.
* **Posts Management (CRUD)**: Complete functionality to **C**reate, **R**ead, **U**pdate, and **D**elete posts.
* **Database Integration**: Seamlessly interacts with a **PostgreSQL** database using **Knex.js** as a SQL query builder.
* **Robust Error Handling**: Provides clear, descriptive error messages with appropriate HTTP status codes to facilitate debugging.
* **Architectural Pattern**: Follows the **Model-View-Controller (MVC)** pattern for a well-organized and scalable codebase.
* **Environment Configuration**: Manages sensitive credentials and configurations securely using a `.env` file.

---

## 🛠️ Tech Stack

- **Backend:** [Node.js](https://nodejs.org/en/) & [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Query Builder:** [Knex.js](https://knexjs.org/)
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/), [Open Auth](https://oauth.net/2/) &  [Bcrypt](https://www.npmjs.com/package/bcrypt)
- **Development Tools:** [Nodemon](https://nodemon.io/)
- **Architectural Pattern:** [Model-View-Controller](https://developer.mozilla.org/en-US/docs/Glossary/MVC)
- **Other Libraries:** [Nodemailer](https://nodemailer.com/about/) for email services.
- **Real-Time Communication:** [Socket.IO](https://socket.io/) for WebSockets

---

## 🌐 API Endpoints

### User Authentication

| Method | Endpoint         | Description                        |
| :----- | :--------------- | :--------------------------------- |
| `POST` | `/auth/register` | Register a new user                |
| `POST` | `/auth/login`    | Log in and receive an access token |
| `POST` | `/auth/logout`   | Log out (invalidates the token)    |

### Posts Management

| Method   | Endpoint     | Description                    |
| :------- | :----------- | :----------------------------- |
| `GET`    | `/posts`     | Retrieve a list of all posts   |
| `GET`    | `/posts/:id` | Retrieve a specific post by ID |
| `POST`   | `/posts`     | Create a new post              |
| `PUT`    | `/posts/:id` | Update an existing post by ID  |
| `DELETE` | `/posts/:id` | Delete a specific post by ID   |

---

## ▶️ Getting Started

To run this project locally, clone the repository and follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/04amanrajj/social-media.git
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Create a `.env` file:**
    Copy the contents and fill in your database credentials and other necessary environment variables.
    ```
    PORT=3000
    DATABASE_URL='postgresql://postgres:myPostgres@localhost:5432/postgres'
    JWT_SECRET=...
    JWT_EXPIRES_IN=...
    ```
4.  **Run the application:**
    * **Development:**
       ```sh
       npm run dev
       ```
    * **Production:**
       ```sh 
       npm start
       ```
This will start the server, typically on `http://localhost:3000`
