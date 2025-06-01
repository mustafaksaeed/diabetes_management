import React, { useState } from "react";
import TextField from "@mui/material/TextField"; // Still imported but not used. You can remove if not needed.
import FsearchCard from "./FsearchCard";

const FoodSearch = () => {
  const [input, setInput] = useState("");

  const [filteredFoods, setFilteredFoods] = useState([]);

  async function call(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/foodsearch?searchquery=${input}`
    );

    const data = await response.json();
    const filterData = data.foods
      .filter((v) => v.description.toLowerCase() === input.toLowerCase())
      .map((food) => {
        return {
          // ...food,
          // info: foodInfo.foodNutrients[2].value,
          brandOwner: food.brandOwner,
          description: food.description,
          protein: food.foodNutrients[0].value,
          carbs: food.foodNutrients[2].value,
          sugars: food.foodNutrients[4].value,
          fiber: food.foodNutrients[5].value,
        };
      });

    // [protein, , carbs, , sugars, fiber]

    // const indexes = [0, 2, 4, 5]

    // Update the state with the filtered data
    setFilteredFoods(filterData);
    console.log("filter", filterData);
    console.log("data", data);
  }

  return (
    <div>
      <form onSubmit={(e) => call(e)}>
        <input
          style={{ margin: "0 auto" }}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </form>

      {filteredFoods.map((foodItem, index) => (
        <FsearchCard key={index} 
          brandOwner={foodItem.brandOwner}
          description={foodItem.description}
          protein={foodItem.protein}
          carbs={foodItem.carbs}
          sugars={foodItem.sugars}
          fiber={foodItem.fiber}
        />
      ))}
    </div>
  );
};

export default FoodSearch;
