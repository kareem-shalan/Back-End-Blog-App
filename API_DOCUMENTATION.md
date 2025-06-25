# 📘 API Documentation

## 📡 Base URL

```
http://localhost:3000
```

## 🛠️ Tech Stack

- **Backend:** Node.js + Express.js  
- **Database:** MySQL (via Sequelize ORM)

---

## 🔐 Authentication

**POST** `/auth/signup`  
📝 Register a new user  
📤 Body:
```json
{
  "firstName": "Karim",
  "middleName": "Ali",
  "lastName": "Mohamed",
  "email": "karim@example.com",
  "password": "123456"
}
```
📥 Response:
```json
{
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "karim@example.com"
  }
}
```

---

## 👤 Users

**GET** `/users`  
🔍 Get all users  
📤 No body required  
📥 Returns a list of all users

**GET** `/users/:userId`  
🔍 Get user by ID  
📤 No body required  
📥 Returns one user object

**PUT** `/users/:userId`  
✏️ Update user info  
📤 Body (optional fields):
```json
{
  "firstName": "New Name",
  "email": "new@example.com"
}
```
📥 Returns updated user data

**DELETE** `/users/:userId`  
🗑️ Delete a user  
📤 No body required  
📥 Returns deletion message

**GET** `/users/:userId/stats`  
📊 Get user stats  
📤 No body required  
📥 Returns stats related to user

---

## 📝 Blogs

**GET** `/blogs`  
🔍 Get all blogs  
📤 No body required  
📥 Returns a list of blog posts

**GET** `/blogs/:blogId`  
🔍 Get a single blog by ID  
📤 No body required  
📥 Returns blog details

**POST** `/blogs`  
📝 Create a new blog post  
📤 Body:
```json
{
  "title": "My Blog Title",
  "content": "Blog content here...",
  "isPublished": true,
  "userId": 1
}
```
📥 Returns the created blog

**PUT** `/blogs/:blogId`  
✏️ Update blog post  
📤 Body (any of the fields below):
```json
{
  "title": "Updated Title",
  "content": "Updated Content",
  "isPublished": false
}
```
📥 Returns the updated blog

**DELETE** `/blogs/:blogId`  
🗑️ Delete a blog  
📤 No body required  
📥 Returns deletion message

**GET** `/users/:userId/blogs`  
📄 Get all blogs for specific user  
📤 No body required  
📥 Returns array of blogs

---

## 📮 Posts

**POST** `/create`  
📝 Create a new post  
📤 Body:
```json
{
  "title": "Post Title",
  "content": "Post Content",
  "userId": 1
}
```
📥 Returns the new post

**GET** `/all`  
🔍 Get all posts  
📤 No body required  
📥 Returns array of posts

**GET** `/:id`  
🔍 Get post by ID  
📤 No body required  
📥 Returns post object

**PATCH** `/:id`  
✏️ Update post  
📤 Body:
```json
{
  "title": "New Title",
  "content": "Updated Content"
}
```
📥 Returns updated post

**DELETE** `/:id`  
🗑️ Delete post  
📤 No body required  
📥 Returns confirmation message

---

## 💬 Comments

**POST** `/comments`  
📝 Add new comment  
📤 Body:
```json
{
  "content": "Nice blog!",
  "postId": 2,
  "userId": 1
}
```
📥 Returns the created comment

**GET** `/comments`  
🔍 Get all comments  
📤 No body required  
📥 Returns array of comments

---

## 📦 Response Format (Success)

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

---

## ❌ Error Format

```json
{
  "message": "User not found",
  "error": "No user with ID = 404"
}
```

---

## 🔁 Common Status Codes

- `200 OK` → Success  
- `201 Created` → New resource created  
- `400 Bad Request` → Invalid input  
- `404 Not Found` → Resource not found  
- `409 Conflict` → Duplicate data  
- `500 Server Error` → Internal failure

---

## 🧪 Run Server

```bash
npm run dev
```