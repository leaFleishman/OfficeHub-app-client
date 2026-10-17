import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

const DashboardNavigation = () => {
const navigate=useNavigate()
    const { user } = useAuth()

    return (<>
        <div>
            <div> <button onClick={()=>navigate("/bookings")}>פגישות</button></div>
            <div> <button onClick={()=>navigate("inquiries")}>פניות</button></div>
            <div> <button onClick={()=>navigate("")}>הזמנת חדר לפגישה</button></div>
            <div> <button onClick={()=>navigate("")}>עריכת פרופיל</button></div>
            { user?.role!== "Employee" && <div><button onClick={()=>navigate("")}>ניהול</button></div>}

        </div>

    </>)
}
export default DashboardNavigation