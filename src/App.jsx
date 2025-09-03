import React from "react";

import Router from "./Routes/Router";
import DoseProvider from "./Contexts/DoseProvider";
import NutritionProvider from "./Contexts/NutritionProvider";
import MealsProvider from "./Contexts/MealsProvider";

const App = () => {
  return (
    <MealsProvider>
      <Router />
    </MealsProvider>
  );
};

export default App;
