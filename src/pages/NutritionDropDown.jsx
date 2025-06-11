import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader"; // Imported but not used
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const NutritionDropDown = ({
  nutritionInfo,
  onDelete,
  isVisible,
  inputVal,
  onSave, // We're using this prop
}) => {
  // If the list is not visible, don't render anything from this component.
  // This helps prevent unnecessary rendering of the list content.
  if (!isVisible) {
    return null;
  }

  return (
    <List
      // Removed `display: isVisible ? "block" : "none"` from inline style
      // because the `if (!isVisible) return null;` handles it.
      sx={{
        width: "100%",
        maxWidth: 220,
        bgcolor: "background.paper",
        position: "absolute", // Adjusted for absolute positioning if desired
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
    >
      {/* ListSubheader is imported but not used, consider removing if not needed */}
      {/* If you want a subheader, you'd place it here:
        <ListSubheader component="div" id="nested-list-subheader">
          Selected Foods
        </ListSubheader>
      */}
      <ul>
        {/* Render a message if nutritionInfo is empty */}
        {nutritionInfo.length === 0 ? (
          <ListItem>
            <ListItemText primary="No items added yet." />
          </ListItem>
        ) : (
          // Map over nutritionInfo when it has items
          nutritionInfo.map((info) => (
            <ListItem key={info.id || info.description}>
              <ListItemText
                primary={`${info.description} carbs: ${info.carbs}g`}
              />
              {/* Ensure info.id exists for onDelete; provide a fallback if needed */}
              <DeleteForeverIcon
                style={{ cursor: "pointer" }}
                onClick={() => onDelete(info.id)}
              />
            </ListItem>
          ))
        )}

        {/* The "Save meal" button */}
        <ListItem>
          <input
            type="text"
            onChange={inputVal}
            placeholder={"add mean name"}
          />
          <button
            style={{
              width: "100%", // Make the button fill the list item space
              padding: "8px 16px",
              marginTop: "8px",
              cursor: "pointer",
              // Only display if there are items to save
              display: nutritionInfo.length === 0 ? "none" : "block",
            }}
            // Call onSave directly without passing nutritionInfo again
            // as saveMeal in parent component already accesses it.
          >
            Save meal
          </button>
        </ListItem>

        {/* The "Save meal & log dose" button - also only show if there are items */}
        {nutritionInfo.length > 0 && (
          <ListItem>
            <button
              style={{
                width: "100%",
                padding: "8px 16px",
                marginTop: "8px",
                cursor: "pointer",
              }}
              // You'd need a separate handler for this, e.g., onSaveAndLogDose
              onClick={onSave}
            >
              Save meal & log dose
            </button>
          </ListItem>
        )}
      </ul>
    </List>
  );
};

export default NutritionDropDown;

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// const NutritionDropDown = ({
//   nutritionInfo,
//   onDelete,
//   isVisible,
//   onSave,
//   // mealName,
// }) => {
//   return (
//     <List
//       style={{
//         display: isVisible ? "block" : "none",
//         position: "absolute",
//       }}
//       sx={{
//         width: "100%",
//         maxWidth: 220,
//         bgcolor: "background.paper",
//         position: "relative",
//         overflow: "auto",
//         maxHeight: 300,
//         "& ul": { padding: 0 },
//       }}
//     >
//       <ul>
//         {nutritionInfo.map((info, key) => (
//           <ListItem key={key}>
//             <ListItemText
//               primary={info.description + "    carbs: " + info.carbs + "g"}
//             />
//             <DeleteForeverIcon onClick={() => onDelete(info.id)} />
//           </ListItem>
//         ))}
//         {/* <input type="text" onChange={mealName} /> */}
//         <button
//           style={{
//             justifyContent: "center",
//             display: nutritionInfo.length === 0 ? "none" : "block",
//           }}
//           onClick={() => onSave(nutritionInfo)}
//         >
//           Save meal
//         </button>
//         <button> save meal & log dose</button>
//       </ul>
//       {/* <button
//         style={{ display: nutritionInfo.length === 0 ? "block" : "none" }}
//       >
//         save meal
//       </button> */}
//     </List>
//   );
// };

// export default NutritionDropDown;

//map it out
