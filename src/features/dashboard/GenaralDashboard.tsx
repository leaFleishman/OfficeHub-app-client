import { useAuth } from "../../auth/useAuth";
import Message from "../../components/message";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";


const GenaralDashboard = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Message message="טוען..."></Message>
    }

    if (!user) {
        return <Message message="יש להתחבר כדי להציג את לוח הבקרה."></Message>
    }

    if (user.role === "Admin") {

        return(<><AdminDashboard /></>) 
    }

    if (user.role === "Manager") {
        return(<><ManagerDashboard />
        </>) 
    }

    return(<><EmployeeDashboard></EmployeeDashboard>
    </>) 
};

export default GenaralDashboard;