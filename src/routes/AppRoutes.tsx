// הגדרת כל הנתיבים של האפליקציה עם createBrowserRouter

import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Login from "../pages/login"
import Dashboard from "../features/dashboard/Dashboard"


export const router = createBrowserRouter([{
    path: "/", element: <App></App>, children: [

        { index: true, element: <Dashboard></Dashboard> }
    ]
}, {
    path: "/login", element: <Login></Login>
}, {
    path: "*", element: <p style={{ color: "red" }}>not found</p>
}]
)