import React, { useState } from "react";
import NutritionContext from "./NutritionContext";

const NutritionProvider = ({ children }) => {
  const [nutritionInfo, setNutritionInfo] = useState([]);
  return (
    <NutritionContext.Provider value={{ nutritionInfo, setNutritionInfo }}>
      {children}
    </NutritionContext.Provider>
  );
};

export default NutritionProvider;
