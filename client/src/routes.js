import {
    ADMIN_ROUTE,
    APPLICATION_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    ORDERING_ROUTE,
    USERBUY_ROUTE
} from "./utils/consts";
import Basket from "./pages/Basket";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ApplicationPage from "./pages/ApplicationPage";
import Orders from "./pages/Orders";
import Ordering from "./pages/Ordering";
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component:Admin
    },
    {
        path: USERBUY_ROUTE,
        Component: Orders
    },

]

export const publicRoutes = [

    {
        path: ORDERING_ROUTE,
        Component: Ordering
    },

    {
        path: SHOP_ROUTE,
        Component:Shop
    },
    {
        path: LOGIN_ROUTE,
        Component:Auth
    },

    {
        path: REGISTRATION_ROUTE,
        Component:Auth
    },
    {
        path: APPLICATION_ROUTE +'/:id',
        Component:ApplicationPage
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }]