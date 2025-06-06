import React, { useState } from "react";
import DoseContext from "./DoseContext";

const DoseProvider = ({ children }) => {
  const [doses, setDoses] = useState([
    {
      date: new Date("2025-05-29T08:00:00"), // May 29th, 8:00 AM
      dose: 3.3, // mg
    },
    {
      date: new Date("2025-05-29T16:30:00"), // May 29th, 4:30 PM
      dose: 4.4, // mg
    },
    {
      date: new Date("2025-05-30T09:15:00"), // May 30th, 9:15 AM
      dose: 6.6, // mg
    },
    {
      date: new Date("2025-05-30T17:00:00"), // May 30th, 5:00 PM
      dose: 6.6, // mg
    },
  ]);
  return (
    <DoseContext.Provider value={{ doses, setDoses }}>
      {children}
    </DoseContext.Provider>
  );
};

export default DoseProvider;
