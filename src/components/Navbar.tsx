import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (<>
        <div>
            {user?.role !== "Admin" && (
                <>
                    <div><button onClick={() => navigate("/inquiries")}>פניות</button></div>
                    <div><button onClick={() => navigate("/bookings")}>פגישות</button></div>
                    <div> <button onClick={() => navigate("/CreateBooking")}>הזמנת חדר לפגישה</button></div>

                </>
            )}

            <div> <button onClick={() => navigate("/profile")}>עריכת פרופיל</button></div>
            {user?.role !== "Employee" && <div><button onClick={() => navigate("/admin")}>ניהול</button></div>}
            {user?.role === "Admin" && (<div> <button onClick={() => navigate("/allInquires")}> טיפול פניות</button></div>)}

        </div>

    </>)
}
export default Navbar