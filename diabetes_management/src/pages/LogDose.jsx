import React, { useState, useContext } from "react";
import DoseHistory from "./DoseHistory";
import DoseContext from "../Context/DoseContext";

const LogDose = () => {
  const [log, setLog] = useState("");

  const { doses, setDoses } = useContext(DoseContext);

  function doseMan(e) {
    e.preventDefault();
  }

  console.log("doses", doses);
  const newDose = {
    date: new Date(),
    dose: log,
  };

  console.log(doses);
  return (
    <div>
      <form onSubmit={(e) => doseMan(e)}>
        <input type="text" onChange={(e) => setLog(e.target.value)} />
        <button
          type="submit"
          onClick={() => setDoses((prevDoses) => [...prevDoses, newDose])}
        >
          log dose
        </button>
        <p>
          last logged loged dose:{" "}
          {doses.length > 0 ? doses[doses.length - 1].dose : "empty"}
        </p>
      </form>
    </div>
  );
};

export default LogDose;

// v1 push to doses array and see if you can export it
//v2 do the constructors thing idk why but make a second input with time value and push to doses array
