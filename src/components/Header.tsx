import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="site-header">
            <nav className="site-nav">
              
                <div className="nav-links">
                    <Link to="/home" className="brand-mark" aria-label="דף הבית">
                        O
                    </Link>

                    <Link
                        to="/home"
                        className="nav-link"
                    >
                        דף הבית
                    </Link>

                    <Link
                        to="/InquiriesPage"
                        className="nav-link"
                    >
                        פניות 
                    </Link>

                     <Link
                        to="/Meetings"
                        className="nav-link"
                    >
                        פגישות 
                    </Link>
{user?.role==="Manager"&&(<>
<Link to="/myCompany" className="nav-link">החברה שלי</Link>

</>

)}

{(user?.role=="Admin"||user?.role==="Manager")&&(<Link to="/admin" className="nav-link">ניהול</Link>
)}
{user?.role==="Admin"&&(<><Link to="/allInquires"  className="nav-link">טיפול בפניות</Link></>)}

                   
                </div>

            
                <div className="user-chip">
                    <div className="user-meta">
                        <p className="user-name">
                            {user?.name}
                        </p>
                        <p className="user-role">
                            {user?.role}
                        </p>
                    </div>

                    <Link to={"/profile"}>
                        <div className="avatar">
                            {user?.name?.charAt(0)?.toUpperCase() ?? "?"}

                        </div>
                    </Link>
                    <button
                        type="button"
                        onClick={logout}
                        className="btn btn-danger btn-sm"
                    >
                        התנתקות
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
