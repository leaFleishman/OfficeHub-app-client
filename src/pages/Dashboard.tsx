import { MyBookings } from "../features/bookings/MyBookings"
import GenaralDashboard from "../features/dashboard/GenaralDashboard"

const Dashboard = () => {

    return (
        <>
            <GenaralDashboard />


            <h2 className="section-title">הזמנות חדרי הישיבות שלי החודש</h2>
            <MyBookings></MyBookings>

        </>
    );
}

export default Dashboard