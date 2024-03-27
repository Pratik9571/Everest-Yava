import MainLayout from "../layout/MainLayout.jsx";
import About from "../pages/About.jsx";
import AddProduct from "../pages/AddProduct.jsx";
import Cart from "../pages/Cart.jsx";
import Contact from "../pages/Contact.jsx";
import EditProduct from "../pages/EditProduct.jsx";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import ProductList from "../pages/ProductList.jsx";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default mainRoutes;
