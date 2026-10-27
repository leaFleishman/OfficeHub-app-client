
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
                <Link to="/CreateBooking" className="btn btn-primary">
                    הוסף הזמנה
                </Link>
                {/* {user?.role === "Admin" && (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate("")}
                    >
                        הוסף עובד
                    </button>
                )} */}
                {user?.role === "Admin" && (<>
                    <Link to={"/RoomManagement"} className="btn btn-primary">ניהול חדרים</Link>
                    <Link to={"/CompaniesAdmin"} className="btn btn-primary">ניהול חברות</Link>
                    <Link to={"/allbookings"} className="btn btn-primary">כל ההזמנות</Link>
                </>)}

            </div>

            {user?.role === "Manager" && (
                <>
                    <div className="row-actions">
                       
                       <Link className="btn btn-primary" to={"/employees/new"}>הוסף עובד</Link>


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
