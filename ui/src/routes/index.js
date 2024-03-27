import guestRoutes from "./guestRoutes.jsx";
import mainRoutes from "./mainRoutes.jsx";

const allRoutes = [...guestRoutes, ...mainRoutes];
console.log(allRoutes);

export default allRoutes;
