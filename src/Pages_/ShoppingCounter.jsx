import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const ShoppingCounter = ({ counter, clickIcon }) => {
  return (
    <div>
      {" "}
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={counter} color="secondary">
          <LunchDiningIcon onClick={clickIcon} />
        </StyledBadge>
      </IconButton>
    </div>
  );
};

export default ShoppingCounter;
