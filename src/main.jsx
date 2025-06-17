import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import Router from "./Routes/Router.jsx";

import { app, auth, db } from "./Firebase/InitFirebase.js";

export { app, auth, db }; // Exporting Firebase app, auth, and db for use in other parts of the application

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
