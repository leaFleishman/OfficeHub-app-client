import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../pages/home";
import Inquiries from "../components/Inquiries";
import Bookings from "../components/bookings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "home",
                element: <Home />,
                children: []
            },
            {
                path: "inquiries", element: <Inquiries></Inquiries>
            }, { path: "bookings", element: <Bookings></Bookings> }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <p style={{ color: "red" }}>not found</p>,
    },
]);