import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

  // const [protein, , carbs, , sugars, fiber] = foodInfo.foodNutrients;

  return (
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
          <Button size="small">Add to Meal</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
