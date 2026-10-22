// עוטף את כל הראוטים ב-AuthProvider כדי ש-useNavigate יעבוד בתוך ה-Router

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";

const RootLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

export default RootLayout;
