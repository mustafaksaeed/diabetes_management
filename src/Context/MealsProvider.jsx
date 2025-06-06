import React, { useState } from "react";
import MealsContext from "./MealsContext";
const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  return (
    <MealsContext.Provider value={{ meals, setMeals }}>
      {children}
    </MealsContext.Provider>
  );
};

export default MealsProvider;
