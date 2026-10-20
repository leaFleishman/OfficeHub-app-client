import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../pages/home";
import Bookings from "../components/bookings";
import { CreateRoom } from "../features/rooms/createRoom";
import EmployeeManagement from "../features/employees/EmployeeManagement";
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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "home", element: <Home />, },
            { path: "inquiries", element: <MyInquiries></MyInquiries> },
            { path: "bookings", element: <Bookings></Bookings> },
            { path: "NewBookingForm", element: <CreateBooking ></CreateBooking> },
            { path: "EmployeeManagement", element: <EmployeeManagement></EmployeeManagement> },
            { path: "dashboard", element: <Dashboard></Dashboard> },
            { path: "profile", element: <Profile ></Profile> },
            { path: "CreateRoom", element: <CreateRoom /> },
            { path: "admin", element: <Admin></Admin> },
            { path: "employees/new", element: <EmployeeForm /> },
            { path: "CompanyForm", element: <CompanyForm></CompanyForm> },
            { path: "CreateBooking", element: <CreateBooking></CreateBooking> },
            {path:"AllInquires" ,element:<AllInquiries></AllInquiries>},
            {path:"InquiryManagement/:id",element:<InquiryManagement></InquiryManagement>},
            {path:"NewInquiryForm",element:<NewInquiryForm></NewInquiryForm>},
            { path: "MyBookings", element: <MyBookings /> },
            {path:"Meetings",element:<Meetings></Meetings>},
            {path:"InquiriesPage",element:<InquiriesPage></InquiriesPage>}
        ],
    },
    { path: "/login", element: <Login />, },
    { path: "*", element: <p style={{ color: "red" }}>not found</p>, },



]);