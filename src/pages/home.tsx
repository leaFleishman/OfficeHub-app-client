import { useAuth } from "../auth/useAuth"
import { MyBookings } from "../features/bookings/MyBookings"
import Dashboard from "../features/dashboard/Dashboard"
import AllInquiries from "../features/inquiries/allInquires";

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <Dashboard />

            {user?.role !== "Admin" && (
                <>
                    <h2>הזמנות חדרי הישיבות שלי החודש</h2>
                  
                    <MyBookings />
                </>
            )}
            {user?.role==="Admin"&&<>
            <AllInquiries></AllInquiries>
            </>}
        </>
    );
}

export default Home