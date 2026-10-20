import { useAuth } from "../auth/useAuth"
import { NyBookings } from "../features/bookings/MyBookings"
import Dashboard from "../features/dashboard/Dashboard"

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <Dashboard />
            {user?.role !== "Admin" && (
                <>
                    <h2>הזמנות חדרי הישיבות שלי החודש</h2>
                    <NyBookings />
                </>
            )}
            {user?.role==="Admin"&&"כל הפניות"}
        </>
    );
}

export default Home