# Clinic App

This is a monorepo containing both the **backend API** and the **frontend SPA**.

## Prerequisites

- Node.js v16+ and npm
- MySQL (e.g., via XAMPP)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Database**

   - Import the schema:

     ```sql
     -- in phpMyAdmin or MySQL CLI
     source backend/schema.sql;
     ```

## Development

Start both backend and frontend in parallel:

```bash
npm run dev
```

- **Backend**: [http://localhost:3001](http://localhost:3001)
- **Frontend**: [http://localhost:5173](http://localhost:5173)

## Project Structure

```
/ backend       # Express + TypeScript API
/ frontend      # React + Vite SPA
package.json    # root scripts and dependencies
README.md       # this file
```

Enjoy building and testing the Clinic App! Feel free to explore the code and
make improvements.
