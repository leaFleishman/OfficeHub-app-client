
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import EmployeeManagement from "../features/employees/EmployeeManagement";
import RoomsList from "../features/rooms/RoomsList";

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <div className="page-head">
                <span className="eyebrow">ADMIN</span>
                <h1 className="page-title">ניהול</h1>
            </div>

            <div className="row-actions">
                <button type="button" className="btn btn-primary" onClick={() => navigate("/CreateBooking")}>
                    הוסף הזמנה
                </button>
                {user?.role==="Admin"&&(<><Link to={"/RoomManagement"} className="btn">ניהול חדרים</Link>
                <Link to={"/CompaniesAdmin"} className="btn">ניהול חברות</Link></>)}
                
            </div>

            {user?.role === "Manager" && (
                <>
                 <div className="row-actions">
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/employees/new")}>
                        הוסף עובד
                    </button>
                    </div>
                    <EmployeeManagement />

                   
                </>
            )}

            {user?.role === "Admin" && (<>
                <RoomsList></RoomsList>
              </>
            )}

        </>
    );
};

export default Admin;
