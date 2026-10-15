import { useAuth } from "../../auth/useAuth";
import DashboardNavigation from "../../components/DashboardNavigation";
import Message from "../../components/Message";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";


const Dashboard = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Message message="טוען..."></Message>
    }

    if (!user) {
        return <Message message="יש להתחבר כדי להציג את לוח הבקרה."></Message>
    }

    if (user.role === "Admin") {

        return(<><AdminDashboard /><DashboardNavigation></DashboardNavigation>;</>) 
    }

    if (user.role === "Manager") {
        return(<><ManagerDashboard />;
        <DashboardNavigation></DashboardNavigation>
        </>) 
    }

    return(<><EmployeeDashboard></EmployeeDashboard>
    <DashboardNavigation></DashboardNavigation>
    </>) 
};

export default Dashboard;