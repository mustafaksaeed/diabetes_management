import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField"; // Still imported but not used. You can remove if not needed.
import FsearchCard from "./FsearchCard";
import ShoppingCounter from "./ShoppingCounter";
import NutritionContext from "../Contexts/NutritionContext";
import NutritionDropDown from "./NutritionDropDown";
import MealHistory from "./MealHistory";
import MealsContext from "../Contexts/MealsContext";

const FoodSearch = () => {
  const [input, setInput] = useState("");
  const [listVisible, setListVisible] = useState(false);

  const [filteredFoods, setFilteredFoods] = useState([]);
  const { nutritionInfo, setNutritionInfo } = useContext(NutritionContext);

  const [mealName, setMealName] = useState("");
  const { meals, setMeals } = useContext(MealsContext);

  useEffect(() => {
    console.log("Visibility changed:", listVisible);
  }, [listVisible]);

  async function call(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/foodsearch?searchquery=${input}`
    );

    const data = await response.json();
    const filterData = data.foods
      .filter((v) => v.description.toLowerCase() === input.toLowerCase())
      .map((food) => {
        if (food.foodNutrients.length < 6) {
          console.warn(
            "Insufficient nutrient data for food:",
            food.description
          );
          return {
            brandOwner: food.brandOwner,
            description: food.description,
            protein: 0,
            carbs: 0,
            sugars: 0,
            fiber: 0,
          };
        }

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

  const deleteItems = (id) => {
    const items = nutritionInfo.filter((item) => item.id !== id);

    setNutritionInfo(items);
  };

  function handleInput(e) {
    setMealName(e.target.value);
  }

  function saveMeal() {
    let sum = 0;
    const TotalCarbs = nutritionInfo.reduce((accumulator, info) => {
      return accumulator + info.carbs;
    }, 0);
    console.log("sum carbs, sum", sum);

    const listObj = {
      name: mealName,
      id: Date.now(),
      Totalcarbs: TotalCarbs,
    };

    setMeals((prevMeals) => {
      return [...prevMeals, listObj];
    });
    setNutritionInfo([]);
  }
  console.log("mealList", meals);

  return (
    <div style={{ marginBotton: "4rem" }}>
      <form onSubmit={(e) => call(e)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "15rem",
          }}
        >
          <div>
            <input
              style={{ marginLeft: "4rem" }}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          <div>
            <ShoppingCounter
              counter={nutritionInfo.length === 0 ? 0 : nutritionInfo.length}
              clickIcon={() =>
                setListVisible((prev) => {
                  if (nutritionInfo.length > 0) {
                    return !prev;
                  }
                  return prev;
                })
              }
            />

            <NutritionDropDown
              isVisible={listVisible}
              nutritionInfo={nutritionInfo}
              onDelete={deleteItems}
              onSave={saveMeal}
              inputVal={(e) => handleInput(e)}
              // mealName={(e) => setMealName(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div
        style={{
          position: "static",
          marginTop: "4rem",
          width: "80%",
          height: "400px",
          overflow: "auto",
          margin: "0 auto",
        }}
      >
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
      <div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          Meal History
        </h2>
        <MealHistory meals={meals} />
      </div>
    </div>
  );
};

export default FoodSearch;

//use material ui and take out bootstrap
/*
- add light mode/dark mode
- 



*/
