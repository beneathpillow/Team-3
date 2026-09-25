// The entry point of the React app. This displays the App component inside the
// <div id="root"> element in index.html.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// The global stylesheet, which applies to the whole webapp
import "./index.css";

import App from "./App.jsx";

// StrictMode enables extra checks during development, to help find common mistakes
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
