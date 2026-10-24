import { MyBookings } from "../features/bookings/MyBookings"
import Dashboard from "../features/dashboard/Dashboard"

const Home = () => {

    return (
        <>
            <Dashboard />


            <h2 className="section-title">הזמנות חדרי הישיבות שלי החודש</h2>
            <MyBookings></MyBookings>

        </>
    );
}

export default Home