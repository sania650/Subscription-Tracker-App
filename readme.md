# Subscription Tracker

A full-stack web app to track your monthly subscriptions, built with HTML, Node.js, Express, and MySQL.

---

## Project Structure

```
subtracker/
├── server.js       # Node.js backend API
├── index.html      # Frontend UI
├── package.json    # Project dependencies, JSON is a way to store and send data as text.
└── README.md       # This file
```

---

## Requirements

- [Node.js](https://nodejs.org/) (v14 or above)
- MySQL (running locally or on a server)

---

## Setup Instructions

### 1. Clone or download the project
Place all files in a single folder called `subtracker`.

### 2. Install dependencies
Open a terminal inside the project folder and run:
```bash
npm install
```
This installs `express`, `mysql2`, and `cors` from `package.json`.

### 3. Configure MySQL
Open `server.js` and update these lines with your database details:
```js
host     : 'localhost',
user     : 'root',          // your MySQL username
password : 'root',              // your MySQL password
database : 'subscription_tracker'   // your database name
```

### 4. Create the database table
Run this SQL query in your MySQL client:
```sql
CREATE TABLE IF NOT EXISTS subscriptions (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  cost       DECIMAL(10,2) NOT NULL,
  day        INT NOT NULL,
  category   VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. Start the server
```bash
node server.js
```
You should see:
```
Server running at http://localhost:3000
MySQL connected
```

### 6. Open the app
Go to your browser and open:
```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions` | Get all subscriptions |
| POST | `/api/subscriptions` | Add a new subscription |
| PUT | `/api/subscriptions/:id` | Update a subscription |
| DELETE | `/api/subscriptions/:id` | Delete a subscription |

---

## Features

- Add, edit and delete subscriptions
- Calendar date picker for billing day
- Shows which subscription is due next
- Displays total monthly and annual cost
- Data stored in MySQL database
- Subscriptions sorted by due date

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML / CSS / JS | Frontend UI |
| Node.js | Backend runtime |
| Express | API routing |Express is used because Node.js alone cannot handle API routes easily.
| MySQL | Database |
| mysql2 | MySQL driver for Node.js |
| cors | Allow frontend to call backend API |

---

## Common Errors

**MySQL connection failed**
- Check your username, password and database name in `server.js`
- Make sure MySQL is running

**Cannot GET /**
- Make sure `index.html` is in the same folder as `server.js`

**Failed to save / data not showing**
- Open browser console (F12) and check for errors
- Make sure server is running on port 3000

---

## License

MIT