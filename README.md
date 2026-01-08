## Expense Tracker (React + Vite • Node/Express • MongoDB)

Modern expense tracking app with a React (Vite) frontend and a Node/Express + MongoDB backend. It supports adding, editing, deleting, listing expenses, and visualizes spending with charts and quick stats.

### Features
- **CRUD expenses**: description, amount, category, date, notes
- **Stats at a glance**: total, count, average, highest
- **Visualizations**: spending over time and by category (Recharts)
- **Search & filter**: text search and category filter
- **Responsive UI** with Tailwind

### Tech Stack
- **Client**: React 19, Vite, Tailwind, Recharts, lucide-react, Axios
- **Server**: Node.js, Express 5, Mongoose 9, MongoDB, CORS, dotenv, morgan

### Project Structure
```
expense tracker/
├─ client/
│  ├─ vercel.json                  # SPA routing config (Vercel)
│  └─ vite-project/
│     ├─ package.json              # client scripts and deps
│     ├─ src/
│     │  ├─ api.js                 # Axios client (BASE_URL)
│     │  ├─ App.jsx                # main UI logic
│     │  └─ components/            # StatCard, SpendingChart, CategoryChart, Transactionlist, Model
│     └─ vite.config.js
└─ server/
   ├─ package.json                 # server scripts and deps
   ├─ server.js                    # server bootstrap (port, graceful shutdown)
   ├─ app.js                       # express app, middlewares, routes mount
   ├─ config/
   │  └─ db.js                     # Mongo connection (MONGODB_URI + DATABASEPASSWORD)
   ├─ models/
   │  └─ expensemodel.js           # Expense schema/model
   ├─ controllers/
   │  └─ expensecontroller.js      # expense handlers
   └─ routes/
      └─ expenseroutes.js          # /api/v2/expense routes
```

---

## Getting Started

### Prerequisites
- Node.js 18+ recommended
- MongoDB Atlas or local MongoDB instance

### 1) Backend (server)
1. Open a terminal:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in `server/`:
   ```bash
   # The server will default to 8001 if not set, but the client expects 8000.
   PORT=8000

   # Connection strategy: db.js replaces "<PASSWORD>" in MONGODB_URI with DATABASEPASSWORD
   # Example for MongoDB Atlas:
   MONGODB_URI="mongodb+srv://<username>:<PASSWORD>@<cluster-host>/<db>?retryWrites=true&w=majority"
   DATABASEPASSWORD="your-actual-password"
   ```
3. Start the server:
   ```bash
   # If nodemon is installed globally or available:
   npm start
   # Otherwise:
   node server.js
   ```
4. The API will run at:
   - `http://localhost:8000/api/v2/expense` (recommended, matches client default)
   - If you use a different port, update the client `BASE_URL` accordingly (see below).

### 2) Frontend (client)
1. Open a second terminal:
   ```bash
   cd client/vite-project
   npm install
   npm run dev
   ```
2. The app will start on a Vite dev URL (typically `http://localhost:5173`).

### Port alignment (important)
- The client uses `client/vite-project/src/api.js` with:
  ```js
  const BASE_URL = "http://localhost:8000/api/v2";
  ```
- The server defaults to port `8001` unless `PORT` is set. For zero-config, set `PORT=8000` in `server/.env` so the client and server match. Alternatively, change `BASE_URL` to your server URL.

---

## Scripts

### Client (`client/vite-project/package.json`)
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

### Server (`server/package.json`)
- `npm start` — start server via `nodemon server.js` (install `nodemon` globally or replace with `node server.js`)

---

## API Reference
Base URL: `http://localhost:<PORT>/api/v2/expense`

### Expense object
```json
{
  "_id": "664f...",
  "description": "Groceries",
  "amount": 54.99,
  "category": "Food",
  "date": "2025-01-02T00:00:00.000Z",
  "notes": "Weekly shopping",
  "createdAt": "2025-01-02T12:00:00.000Z",
  "updatedAt": "2025-01-02T12:00:00.000Z"
}
```

Allowed categories: `Food`, `Transport`, `Entertainment`, `shopping`, `Bills`, `Healthcare`, `Other`

### List all expenses
- GET `/`
- Response:
```json
{
  "success": true,
  "count": 3,
  "data": [ /* Expense[] */ ]
}
```

### Create an expense
- POST `/`
- Body:
```json
{
  "description": "Taxi",
  "amount": 18.5,
  "category": "Transport",
  "date": "2025-01-03",
  "notes": "Airport run"
}
```
- Response:
```json
{
  "success": true,
  "data": { /* Expense */ }
}
```

### Update an expense
- PUT `/:id`
- Body: any updatable fields from the model (`description`, `amount`, `category`, `date`, `notes`)
- Response:
```json
{
  "success": true,
  "data": { /* Expense (updated) */ }
}
```

### Delete an expense
- DELETE `/:id`
- Response:
```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

---

## Data Model
Defined in `server/models/expensemodel.js`:
- `description` (string, required, max 100)
- `amount` (number, required, min 0.01)
- `category` (enum: Food, Transport, Entertainment, shopping, Bills, Healthcare, Other)
- `date` (Date, defaults to now)
- `notes` (string, max 500)

Note: The model name is currently `CopyExpense` in the code.

---

## Frontend Notes
- Charts are powered by **Recharts**
- Icons from **lucide-react**
- SPA routing config for Vercel is present at `client/vercel.json`

To point the client to a different API URL, edit `client/vite-project/src/api.js`:
```js
const BASE_URL = "http://localhost:8000/api/v2";
```

---

## Troubleshooting
- If the client loads but shows no data:
  - Ensure the server is running and the ports match the `BASE_URL`
  - Check CORS (enabled by default in `server/app.js`)
- If MongoDB fails to connect:
  - Verify `.env` contains a valid `MONGODB_URI` template and `DATABASEPASSWORD`
  - Ensure `MONGODB_URI` contains the literal `<PASSWORD>` placeholder (db.js replaces it)

---

## License
Server package specifies `ISC`. Consider adding a root-level LICENSE to formalize.

