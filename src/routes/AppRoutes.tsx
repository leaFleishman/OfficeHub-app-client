import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import Bookings from "../components/bookings";
import { CreateRoom, EditRoom } from "../features/rooms/createRoom";
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
import MyCompany from "../components/myCompany";
import GenaralDashboard from "../features/dashboard/GenaralDashboard";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                index: true,
                element: <Navigate to="/login" replace />,
            },
            {
                element: <App />,
                children: [
                    // Admin only
                    {
                        element: <ProtectedRoute allowedRoles={["Admin"]} />,
                        children: [
                            { path: "CreateRoom", element: <CreateRoom /> },
                            { path: "EditRoom/:id", element: <EditRoom /> },
                            { path: "RoomManagement", element: <RoomManagement /> },
                            { path: "AllCompanies", element: <AllCompanies /> },
                            { path: "AllInquires", element: <AllInquiries /> },
                            { path: "CompaniesAdmin", element: <CompaniesAdmin /> },
                        ],
                    },

                    // Admin and Manager
                    {
                        element: (
                            <ProtectedRoute
                                allowedRoles={["Admin", "Manager"]}
                            />
                        ),
                        children: [
                            { path: "employees/new", element: <EmployeeForm /> },
                            { path: "admin", element: <Admin /> },
                            { path: "CompanyForm", element: <CompanyForm /> },
                        ],
                    },

                    // Manager only
                    {
                        element: <ProtectedRoute allowedRoles={["Manager"]} />,
                        children: [
                            { path: "MyCompany", element: <MyCompany /> },
                        ],
                    },

                    // Other routes
                    { path: "CreateBooking", element: <CreateBooking /> },
                    { path: "home", element: <Dashboard /> },
                    { path: "inquiries", element: <MyInquiries /> },
                    { path: "bookings", element: <Bookings /> },
                    { path: "NewBookingForm", element: <CreateBooking /> },
                    { path: "dashboard", element: <GenaralDashboard /> },
                    { path: "profile", element: <Profile /> },
                    {
                        path: "InquiryManagement/:id",
                        element: <InquiryManagement />,
                    },
                    { path: "NewInquiryForm", element: <NewInquiryForm /> },
                    { path: "MyBookings", element: <MyBookings /> },
                    { path: "Meetings", element: <Meetings /> },
                    { path: "InquiriesPage", element: <InquiriesPage /> },
                ],
            },
            {
                path: "*",
                element: (
                    <p
                        className="alert-error"
                        style={{ margin: "2rem" }}
                    >
                        not found
                    </p>
                ),
            },
        ],
    },
]);

