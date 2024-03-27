import MinimumLayout from "../layout/MinimumLayout.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";

const guestRoutes = [
  {
    path: "/",
    element: <MinimumLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default guestRoutes;
