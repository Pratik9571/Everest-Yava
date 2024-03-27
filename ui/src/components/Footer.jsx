import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      xs={{
        height: "7rem",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Copyright @ Pratik</Typography>
    </Box>
  );
};

export default Footer;
