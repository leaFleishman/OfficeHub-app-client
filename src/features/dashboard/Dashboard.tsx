import { useAuth } from "../../auth/useAuth";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";


const Dashboard = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <p>טוען...</p>;
    }

    if (!user) {
        return <p>יש להתחבר כדי להציג את לוח הבקרה.</p>;
    }

    if (user.role === "Admin") {
        return <AdminDashboard />;
    }

    if (user.role === "Manager") {
        return <ManagerDashboard />;
    }

    return <EmployeeDashboard />;
};

export default Dashboard;