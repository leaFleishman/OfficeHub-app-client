import { useAuth } from "../auth/useAuth"
import { NyBookings } from "../features/bookings/MyBookings"
import Dashboard from "../features/dashboard/Dashboard"
import AllInquiries from "../features/inquiries/allInquires";

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <Dashboard />
            <button onClick={()=>navigation.navigate("/NewInquiryForm")}>שלח פנייה</button>

            {user?.role !== "Admin" && (
                <>
                    <h2>הזמנות חדרי הישיבות שלי החודש</h2>
                  
                    <NyBookings />
                </>
            )}
            {user?.role==="Admin"&&<>
            <AllInquiries></AllInquiries>
            </>}
        </>
    );
}

export default Home