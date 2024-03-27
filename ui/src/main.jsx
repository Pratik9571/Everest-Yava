import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import allRoutes from "./routes";

const queryClient = new QueryClient();
const router = createBrowserRouter(allRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  // </React.StrictMode>
);
