import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Pages from "./pages/index.js";
// import Navbar from "./Components/Navbar/Navbar.jsx";
import { Navbar } from "./Components/Global";
import DoseProvider from "./Contexts/DoseProvider";
import NutritionProvider from "./Contexts/NutritionProvider";
import MealsProvider from "./Contexts/MealsProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MealsProvider>
      <NutritionProvider>
        <DoseProvider>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="dosehistory" element={<Pages.DoseHistory />} />
                <Route path="InsulinCalc" element={<Pages.InsulinCalc />} />
                <Route path="meals" element={<Pages.FoodSearch />} />
                <Route path="logdose" element={<Pages.LogDose />} />
                <Route path="Report" element={<Pages.Report />} />
                <Route path="Settings" element={<Pages.Settings />} />
              </Routes>
            </div>
          </BrowserRouter>
        </DoseProvider>
      </NutritionProvider>
    </MealsProvider>
  </StrictMode>
);
/*
  Dose-History,
  InsulinCalc,
  LogDose,
  Report,
  Settings,


*/
