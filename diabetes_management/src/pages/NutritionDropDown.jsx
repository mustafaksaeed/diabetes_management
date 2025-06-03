import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const NutritionDropDown = ({ nutritionInfo, onDelete }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
    >
      <ul>
        {nutritionInfo.map((info, key) => (
          <ListItem key={key}>
            <ListItemText
              primary={info.description + "    carbs: " + info.carbs + "g"}
            />
            <DeleteForeverIcon onClick={() => onDelete(info.id)} />
          </ListItem>
        ))}
      </ul>
    </List>
  );
};

export default NutritionDropDown;

//map it out
