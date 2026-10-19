import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const ManagermentPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (<>
        <div>
            <h2>פאנל הניהול</h2>

            <button onClick={() => navigate("/dashboard")}>לוח בקרה </button>
            <button onClick={() => navigate("/bookings")}>פגישות</button>
            <button onClick={() => navigate("/inquiries")}>פניות</button>
            {user?.role === "Admin" && (
                <button onClick={() => navigate("/")}>ניהול</button>
            )}
            {user?.role === "Manager" && (<button onClick={() => navigate("/")}>עובדים</button>)}
        </div>


    </>)
}
export default ManagermentPanel