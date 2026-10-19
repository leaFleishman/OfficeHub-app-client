import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../pages/home";
import Inquiries from "../components/Inquiries";
import Bookings from "../components/bookings";
import { CreateRoom } from "../features/rooms/createRoom";
import EmployeeManagement from "../features/employees/EmployeeManagement";
import Dashboard from "../features/dashboard/Dashboard";
import Profile from "../pages/profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "home", element: <Home />, },
            { path: "inquiries", element: <Inquiries></Inquiries> },
            { path: "bookings", element: <Bookings></Bookings> },
            { path: "NewBookingForm", element: <CreateRoom></CreateRoom> },
            { path: "EmployeeManagement", element: <EmployeeManagement></EmployeeManagement> },
            { path: "dashboard", element: <Dashboard></Dashboard> },
            { path: "profile", element: <Profile ></Profile> }

        ],
    },
    { path: "/login", element: <Login />, },
    {path: "*",element: <p style={{ color: "red" }}>not found</p>,},

        

]);