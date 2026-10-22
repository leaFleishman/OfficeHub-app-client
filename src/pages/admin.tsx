
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import EmployeeManagement from "../features/employees/EmployeeManagement";
import RoomsList from "../features/rooms/RoomsList";

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <p>admin</p>

            {user?.role === "Manager" && (
                <>
                    <EmployeeManagement />

                    <button type="button" onClick={() => navigate("/employees/new")}>
                        הוסף עובד
                    </button>
                </>
            )}

            {user?.role === "Admin" && (<>
                <RoomsList></RoomsList>
              </>
            )}

            <button type="button" onClick={() => navigate("/CreateBooking")}>
                הוסף הזמנה
            </button>
            <Link to={"/RoomManagement"}>ניהול חדרים</Link>
            <Link to={"/CompaniesAdmin"}>ניהול חברות</Link>
        </>
    );
};

export default Admin;
