import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../pages/home";
import Bookings from "../components/bookings";
import { CreateRoom, EditRoom } from "../features/rooms/createRoom";
import Dashboard from "../features/dashboard/Dashboard";
import Profile from "../pages/profile";
import CreateBooking from "../features/bookings/createBooking";
import Admin from "../pages/admin";
import EmployeeForm from "../components/EmployeeForm";
import CompanyForm from "../components/CompanyForm";
import MyInquiries from "../features/inquiries/MyInquiries";
import AllInquiries from "../features/inquiries/allInquires";
import { InquiryManagement } from "../features/inquiries/InquiryManagement";
import NewInquiryForm from "../features/inquiries/NewInquiryForm";
import { MyBookings } from "../features/bookings/MyBookings";
import Meetings from "../pages/meetings";
import InquiriesPage from "../pages/InquiriesPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import RoomManagement from "../features/rooms/RoomManagement";
import { AllCompanies } from "../components/Company";
import RootLayout from "./RootLayout";
import CompaniesAdmin from "../pages/CompaniesAdmin";


export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
    {
        path: "/",
        element: <App />,
        children: [

            {
                //admin only-------------------
                element: <ProtectedRoute allowedRoles={["Admin"]}></ProtectedRoute>, children: [
                    { path: "CreateRoom", element: <CreateRoom /> },
                    { path: "EditRoom/:id", element: <EditRoom /> },
                    { path: "RoomManagement", element: <RoomManagement></RoomManagement> },
                    { path: "AllCompanies", element: <AllCompanies></AllCompanies> },
                    { path: "CompanyForm", element: <CompanyForm></CompanyForm> },
                    { path: "AllInquires", element: <AllInquiries></AllInquiries> },
                    {path:"CompaniesAdmin",element:<CompaniesAdmin></CompaniesAdmin>}

                ]
            },

            //admin and manager------------
            {
                element: <ProtectedRoute allowedRoles={["Admin", "Manager"]} ></ProtectedRoute>, children: [

                    { path: "employees/new", element: <EmployeeForm /> },
                    { path: "admin", element: <Admin></Admin> },

                ]

            },


            { path: "CreateBooking", element: <CreateBooking></CreateBooking> },
            { path: "home", element: <Home />, },
            { path: "inquiries", element: <MyInquiries></MyInquiries> },
            { path: "bookings", element: <Bookings></Bookings> },
            { path: "NewBookingForm", element: <CreateBooking ></CreateBooking> },
            { path: "dashboard", element: <Dashboard></Dashboard> },
            { path: "profile", element: <Profile ></Profile> },

            { path: "InquiryManagement/:id", element: <InquiryManagement></InquiryManagement> },
            { path: "NewInquiryForm", element: <NewInquiryForm></NewInquiryForm> },
            { path: "MyBookings", element: <MyBookings /> },
            { path: "Meetings", element: <Meetings></Meetings> },
            { path: "InquiriesPage", element: <InquiriesPage></InquiriesPage> },
           
        ],
    },

    { path: "/login", element: <Login />, },
    { path: "*", element: <p style={{ color: "red" }}>not found</p>, },

    ],
  },
]);