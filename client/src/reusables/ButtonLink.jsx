import { Button } from "@mui/material";
import React from "react";

const ButtonLink = (props) => {
  const { btnText, onClick } = props;
  return (
    <>
      <Button
        onClick={onClick}
        sx={{
          color: "white",
          fontSize: { xs: "16px", sm: "20px" },
          fontWeight: "bold",
        //   fontSize: "clamp(15px, 3vw, 20px)",
        //   fontWeight: 600,
          textTransform: "none", // Prevents uppercase transformation
          position: "relative",
          textDecoration: "none",
          padding: "8px 16px",
          "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            bottom: 0,
            width: "0%",
            height: "2px",
            backgroundColor: "white", // Underline color
            transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
          },
          "&:hover::after": {
            width: "100%",
            left: 0,
          },
          "&:focus": {
            outline: "none",
          },
        }}
      >
        {btnText}
      </Button>
    </>
  );
};

export default ButtonLink;
