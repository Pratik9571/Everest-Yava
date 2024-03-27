import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          width: "100vw",
          flexWrap: "wrap",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
