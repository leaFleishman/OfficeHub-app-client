import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="w-full bg-white shadow-md">
            <nav className="flex items-center justify-between px-8 py-4">
                {/* ניווט */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/home"
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        דף הבית
                    </Link>

                    <Link
                        to="/InquiriesPage"
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        פניות 
                    </Link>

                     <Link
                        to="/Meetings"
                        className="font-medium text-gray-700 transition hover:text-blue-600"
                    >
                        פגישות 
                    </Link>

                   
                </div>

                {/* פרטי המשתמש */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="font-semibold text-gray-800">
                            {user?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {user?.role}
                        </p>
                    </div>

                    {/* עיגול עם האות הראשונה */}
                    <Link to={"/profile"}>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-sm">
                            {user?.name?.charAt(0)?.toUpperCase() ?? "?"}

                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        התנתקות
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;