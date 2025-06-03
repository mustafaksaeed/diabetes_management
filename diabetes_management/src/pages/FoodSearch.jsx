import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField"; // Still imported but not used. You can remove if not needed.
import FsearchCard from "./FsearchCard";
import ShoppingCounter from "./ShoppingCounter";
import NutritionContext from "../Context/NutritionContext";
import NutritionDropDown from "./NutritionDropDown";
const FoodSearch = () => {
  const [input, setInput] = useState("");

  const [filteredFoods, setFilteredFoods] = useState([]);
  const { nutritionInfo, setNutritionInfo } = useContext(NutritionContext);

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

    setFilteredFoods(filterData);
    console.log("filter", filterData);
    console.log("data", data);
  }

  const deleteItems = (deleted) => {
    const items = nutritionInfo.filter(
      (item) =>
        item.carbs && item.description !== deleted.carbs && deleted.description
    );

    setNutritionInfo(items);
  };
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
            counter={nutritionInfo.length === 0 ? 0 : nutritionInfo.length}
          />
        </div>
        <NutritionDropDown
          nutritionInfo={nutritionInfo}
          onDelete={(deleted) => deleteItems(deleted)}
        />
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
