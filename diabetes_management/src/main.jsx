import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import * as Pages from "./pages/index.js"; // Import all pages
import Navbar from "./Components/Navbar/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="dosehistory" element={<Pages.DoseHistory />} />
          <Route path="InsulinCalc" element={<Pages.InsulinCalc />} />
          <Route path="foodSearch" element={<Pages.FoodSearch />} />
          <Route path="logdose" element={<Pages.LogDose />} />
          <Route path="Report" element={<Pages.Report />} />
          <Route path="Settings" element={<Pages.Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
/*
  Dose-History,
  InsulinCalc,
  LogDose,
  Report,
  Settings,


*/
