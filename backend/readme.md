# Social Media Backend

A Node.js and Express backend for a simple social media application. This project supports core features like user authentication, post management, and robust database storage. It's built to sharpen skills in modern full-stack development, including React, Node, Express, WebSockets, PostgreSQL, Bcrypt, JWT, Nodemailer, payment gateway, and Knex.js.

---

## Features

- User authentication (register, login, logout with JWT + token blacklist)
- Posts CRUD (create, read all, read by ID, update, delete)
- Database integration using Knex.js
- Error handling with proper status codes
- Configurable via `.env`

---

## Tech Stack

- **Node.js**
- **Express**
- **Knex.js**
- **PostgreSQL** (or MySQL)
- **Nodemon** for development

---

## API Endpoints

**Posts**

 - GET /posts → fetch all posts

GET /posts/:id → fetch single post by ID

POST /posts → create a new post

PUT /posts/:id → update a post

DELETE /posts/:id → delete a post

Auth

POST /auth/register → register a new user

POST /auth/login → login and get token

POST /auth/logout → logout (token blacklist)

Scripts

npm start → start server

npm run dev → start server with nodemo
