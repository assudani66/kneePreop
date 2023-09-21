import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { KneeCapCotextProvider } from "./store/context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KneeCapCotextProvider>
      <App />
    </KneeCapCotextProvider>
  </React.StrictMode>
);
