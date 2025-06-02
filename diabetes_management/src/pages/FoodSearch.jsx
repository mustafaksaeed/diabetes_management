import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField"; // Still imported but not used. You can remove if not needed.
import FsearchCard from "./FsearchCard";
import ShoppingCounter from "./ShoppingCounter";
import NutritionContext from "../Context/NutritionContext";
const FoodSearch = () => {
  const [input, setInput] = useState("");

  const [filteredFoods, setFilteredFoods] = useState([]);
  const { nutritionInfo } = useContext(NutritionContext);
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
  function IconClick() {}

  //sort data so if its equal make it on top and less likely on bottom
  //(evenutally) => cache data

  return (
    <div>
      <form onSubmit={(e) => call(e)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <input
            style={{ marginLeft: "4rem" }}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          <ShoppingCounter
            style={{ marginRight: "4rem" }}
            clickIcon={() => console.log("clicked")}
            counter={nutritionInfo.length === 0 ? 0 : nutritionInfo.length}
          />
        </div>
      </form>

      {filteredFoods.map((foodItem, index) => (
        <FsearchCard
          key={index}
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
