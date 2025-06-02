import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NutritionContext from "../Context/NutritionContext";

// interface IFSearchCard {
//   protein: number,

// }

export default function FSearchCard({
  // foodInfo,
  protein,
  carbs,
  sugars,
  fiber,
  description,
  brandOwner,
}) {
  // console.log("foodInfo =", foodInfo);

  const { nutritionInfo, setNutritionInfo } = useContext(NutritionContext);

  function getInfo() {
    const info = { protein, carbs, sugars, fiber, description, brandOwner };
    console.log(info);
    setNutritionInfo((prev) => [...prev, info]);
  }
  console.log("nutrition info", nutritionInfo);

  // const [protein, , carbs, , sugars, fiber] = foodInfo.foodNutrients;

  //make
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {description}
            </Typography>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {brandOwner}
            </Typography>
            <Typography sx={{ color: "text.primary", fontSize: 14 }}>
              {"protein"} : {protein}
            </Typography>
            <Typography sx={{ color: "text.primary", fontSize: 14 }}>
              {"carbs"} : {carbs}
            </Typography>
            <Typography sx={{ color: "text.primary", fontSize: 14 }}>
              {"sugars"} : {sugars}
            </Typography>
            <Typography sx={{ color: "text.primary", fontSize: 14 }}>
              {"fiber"} : {fiber}
            </Typography>
            {/* {nutrition.map((info, key) => {
            return (
              <Typography
                key={key}
                sx={{ color: "text.primary", fontSize: 14 }}
              >
                {info.title} : {info.info}
              </Typography>
            );
          })} */}
          </CardContent>
          <CardActions>
            <Button onClick={() => getInfo()} size="small">
              Add to Meal
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

/*
ok how to make it so when i click that specific 


*/
