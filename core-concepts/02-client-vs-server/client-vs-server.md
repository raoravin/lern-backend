# Lesson 2: Client vs Server

---

## 🧠 What is a Client?

A **Client** is any device or software that **sends a request** and **waits for a response**.

It is always the one that *initiates* the conversation.

**Examples of Clients:**
- Your browser (Chrome, Firefox, Safari) when you open a website
- A mobile app (Instagram app on your phone) when it loads your feed
- A Postman request when you test an API
- Even another server can be a "client" when fetching data from a third-party API

> 🔑 **Key Rule:** A client **asks**. A server **answers**.

---

## 🖥️ What is a Server?

A **Server** is a computer (or software running on a computer) that **listens** for incoming requests and **sends back a response**.

It is always *waiting* to be contacted — it never initiates.

**Examples of Servers:**
- A Node.js application running on port 3000
- A Nginx web server serving static HTML files
- A PostgreSQL database server waiting for SQL queries
- Amazon S3 serving image files

> 🔑 Servers **don't have a screen the user looks at.** They just run 24/7 in a data center, waiting for requests.

---

## 🔄 How They Talk: The Request-Response Cycle

This is the most fundamental concept in web development. Every interaction on the internet follows this cycle:

```
CLIENT                                SERVER
  |                                      |
  |  1. CLIENT sends a REQUEST           |
  |  (HTTP GET /api/products)            |
  | -----------------------------------> |
  |                                      |
  |                                      |  2. Server PROCESSES the request
  |                                      |     - Validates the request
  |                                      |     - Queries the database
  |                                      |     - Applies business logic
  |                                      |
  |  3. Server sends back a RESPONSE     |
  |  (200 OK + JSON data)                |
  | <----------------------------------- |
  |                                      |
  4. CLIENT renders/uses the response
```

**Every single thing on the internet works this way.** Loading Google, checking Instagram, streaming Netflix — all of it is just this cycle happening millions of times per second.

---

## 📦 What is Inside a Request?

When a client sends a request, it contains:

| Part | Description | Example |
|------|-------------|---------|
| **URL** | Where to send the request | `https://api.github.com/users/ravin` |
| **Method** | What action to perform | `GET`, `POST`, `PUT`, `DELETE` |
| **Headers** | Metadata about the request | `Authorization: Bearer <token>`, `Content-Type: application/json` |
| **Body** | Data sent with the request (only for POST/PUT) | `{ "name": "Ravin", "email": "r@r.com" }` |

### HTTP Methods Explained Simply:

| Method | Meaning | Real World Example |
|--------|---------|-------------------|
| `GET` | Fetch/read data | Load your Twitter feed |
| `POST` | Create new data | Submit a registration form |
| `PUT` | Replace existing data | Update your entire profile |
| `PATCH` | Partially update data | Update only your username |
| `DELETE` | Remove data | Delete a post |

---

## 📬 What is Inside a Response?

When the server replies, it sends back:

| Part | Description | Example |
|------|-------------|---------|
| **Status Code** | Was it successful or not? | `200 OK`, `404 Not Found`, `500 Server Error` |
| **Headers** | Metadata about the response | `Content-Type: application/json` |
| **Body** | The actual data returned | `{ "user": { "name": "Ravin" } }` |

### Most Important HTTP Status Codes:

| Code | Meaning | When it happens |
|------|---------|-----------------|
| `200` | OK | Request succeeded |
| `201` | Created | New resource was successfully created |
| `204` | No Content | Success but nothing to return (e.g., after DELETE) |
| `301` | Moved Permanently | URL has changed, redirect permanently |
| `400` | Bad Request | Client sent invalid data |
| `401` | Unauthorized | Not logged in |
| `403` | Forbidden | Logged in but no permission |
| `404` | Not Found | Resource doesn't exist |
| `422` | Unprocessable Entity | Validation failed |
| `429` | Too Many Requests | Rate limit hit |
| `500` | Internal Server Error | Something crashed on the server |
| `503` | Service Unavailable | Server is down or overloaded |

> 💡 **Rule of thumb:** 2xx = success, 3xx = redirect, 4xx = client's fault, 5xx = server's fault.

---

## 🌐 Types of Clients

Not all clients are browsers. Understanding this expands your thinking:

### 1. Browser Clients
The most common. The browser handles rendering HTML, CSS, JS and making HTTP requests.
```
Chrome → GET https://youtube.com → YouTube's Server
```

### 2. Mobile App Clients
Apps don't render web pages. They call APIs directly and use native UI components.
```
Instagram App → GET /api/feed → Instagram's Backend
Instagram App renders results using native iOS/Android components
```

### 3. Server-to-Server (S2S) Clients
A backend server calling *another* backend server.
```
Your Node.js App → POST https://api.stripe.com/v1/charges → Stripe's Server
Your Node.js App → GET https://api.openai.com/v1/chat → OpenAI's Server
```
In this case, *your backend is acting as a client!*

### 4. CLI / Script Clients
Command-line tools or scripts that make HTTP requests.
```bash
curl https://api.github.com/users/octocat
```

---

## 🏗️ Types of Servers

### 1. Web / Application Server
Runs your business logic. This is what we build with Node.js.
> Example: Express.js server handling API routes

### 2. Database Server
Stores and manages data. Listens for SQL/NoSQL queries.
> Example: PostgreSQL server on port 5432

### 3. File / Static Server
Serves static files like HTML, CSS, JS, images.
> Example: Nginx, AWS S3

### 4. Cache Server
Super-fast in-memory data storage for frequent lookups.
> Example: Redis on port 6379

### 5. Proxy / Reverse Proxy Server
Sits in front of your application servers. When a client makes a request, it hits the reverse proxy FIRST. The proxy then routes the request to the correct backend server.
**It is responsible for:**
- **Load Balancing:** Spreading incoming traffic across multiple Node.js servers so no single server gets overloaded or crashes.
- **Security & SSL:** Handling the HTTPS encryption lock so your Node app doesn't have to.
- **Caching:** Saving common responses to speed up repeated requests.
> **Examples:** Nginx, HAProxy, Traefik, AWS Load Balancer

---

## 🔁 A Real Example: What Happens When You Log In?

```
1. CLIENT (Browser)
   → User fills login form (email + password)
   → Sends: POST /api/auth/login
     Body: { email: "ravin@gmail.com", password: "abc123" }
     Headers: { Content-Type: application/json }

2. SERVER (Node.js)
   → Receives request
   → Validates: Is email a valid format? Is password present?
   → Queries DATABASE: SELECT * FROM users WHERE email = 'ravin@gmail.com'
   → Compares hashed password
   → If match → generates JWT token
   → Sends: 200 OK
     Body: { token: "eyJhbGciOi..." }

3. CLIENT (Browser)
   → Receives 200 OK + token
   → Stores token in localStorage or httpOnly cookie
   → Redirects user to dashboard
```

This is happening every time you log in to any website.

---

## 🧪 Simulating a Client — Using `curl`

You don't need a browser to act as a client. The `curl` command is a terminal-based client:

```bash
# GET request - fetch data
curl https://jsonplaceholder.typicode.com/posts/1

# POST request - send data
curl -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d '{ "title": "Hello", "body": "World", "userId": 1 }'
```

> This is exactly what happens when your Node.js backend calls an external API — it's just code doing what `curl` does.

---

## 🏋️ Mini Exercise

1. Open your browser, go to any website (e.g., `https://jsonplaceholder.typicode.com/posts/1`)
2. Open **DevTools** → **Network tab** → Refresh the page
3. Click on the first request and find:
   - What is the **Method**?
   - What is the **Status Code**?
   - What is in the **Response**?

> This is the real request-response cycle happening live in your browser!

---

## 📌 Key Takeaways

- **Client** = initiates requests (browser, app, `curl`, another server)
- **Server** = listens and responds (Node.js, databases, Nginx, Redis)
- Every interaction on the internet = a **Request → Processing → Response** cycle
- A request has: **URL, Method, Headers, Body**
- A response has: **Status Code, Headers, Body**
- HTTP Methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- Status Codes: 2xx success, 4xx client error, 5xx server error
- A server can also be a **client** when calling another service

---

*Next Lesson → How the Internet Works: HTTP, DNS, TCP/IP*
