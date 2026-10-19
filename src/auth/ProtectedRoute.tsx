// עוטף נתיב: אם לא מחובר -> /login, אם התפקיד לא מתאים -> הפניה
// import { useAuth } from "../auth/useAuth";

// type ProtectedRouteProps = {
//     allowedRoles: string[];
// };

// const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
//     const { user, isLoading } = useAuth();

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }

//     if (!allowedRoles.includes(user.role)) {
//         return <Navigate to="/unauthorized" replace />;
//     }

//     return <Outlet />;
// };

// export default ProtectedRoute;