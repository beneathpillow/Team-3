# MERN Stack Starter

A basic starter project for a webapp with a **MongoDB** database, a **Node.js / Express** backend (using [Mongoose](https://mongoosejs.com/)), and a **React** frontend (built with [Vite](https://vite.dev/)).

## Project structure

This project is set up as an npm workspace, containing two folders:

- `backend`, which contains the Node.js / Express app (runs on [localhost:3000](http://localhost:3000))
- `frontend`, which contains the React app (runs on [localhost:5173](http://localhost:5173))

## Getting started

### MongoDB

The backend connects to a MongoDB database when it starts, so you'll need MongoDB running first. By default, it connects to a database called `mern-stack-starter` on your own computer, at `mongodb://127.0.0.1:27017`. You can either:

- Install and run [MongoDB Community Server](https://www.mongodb.com/try/download/community), **or**
- Run MongoDB using Docker: `docker run -d --name mongodb -p 27017:27017 mongo`, **or**
- Use a cloud database, such as [MongoDB Atlas](https://www.mongodb.com/atlas). In this case, change `MONGODB_URI` in [`backend/.env`](./backend/.env) to your database's connection string.

**NOTE:** If your connection string contains a username and password (e.g. for MongoDB Atlas), don't commit it to a public git repository.

If the backend can't connect to MongoDB, it will display an error message and stop.

### Running the webapp

Install dependencies for both apps by running the following command in the project root (the same folder as this README):

```
npm install
```

Then start both apps together by running the following command, also in the project root:

```
npm run dev
```

Open [localhost:5173](http://localhost:5173) in your browser, and you should see the heading "MERN Stack Starter".

You can stop running the webapp by pressing Ctrl+C in the terminal (same shortcut for both Windows and macOS).

## Where to start

### Backend

- [`backend/src/app.js`](./backend/src/app.js) creates and starts the Express app.
- Routes are defined in the [`backend/src/routes`](./backend/src/routes) folder. All API routes start with `/api`, and are added to the router in [`api.js`](./backend/src/routes/api/api.js).
- The port the backend runs on, and the MongoDB connection string, are set in [`backend/.env`](./backend/.env).
- The connection to MongoDB is made in [`backend/src/data/db.js`](./backend/src/data/db.js).
- Mongoose models can go in a new `backend/src/data/models` folder. For example:

  ```js
  // backend/src/data/models/thing.js
  import mongoose from "mongoose";

  const thingSchema = new mongoose.Schema({
    name: { type: String, required: true }
  });

  export const Thing = mongoose.model("Thing", thingSchema);
  ```

  Then, in a route handler: `const things = await Thing.find();`

### Frontend

- [`frontend/src/main.jsx`](./frontend/src/main.jsx) is the entry point of the React app. It displays the [`App`](./frontend/src/App.jsx) component, and imports the global stylesheet [`index.css`](./frontend/src/index.css).
- [`frontend/src/App.jsx`](./frontend/src/App.jsx) is the root component. Start adding your own components from here. Other components can go in a new `frontend/src/components` folder.
- The base URL of the backend API is available as `import.meta.env.VITE_API_BASE_URL`, which is set in [`frontend/.env`](./frontend/.env). You can use it like this:

  ```js
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/things`);
  ```

  (Only environment variables starting with `VITE_` are available to the frontend code.)
