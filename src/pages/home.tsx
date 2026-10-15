import { NyBookings } from "../features/bookings/MyBookings"
import Dashboard from "../features/dashboard/Dashboard"

const Home=()=>{
    return(<>
<Dashboard></Dashboard>
<h2>הזמנות חדרי הישיבות שלי החודש</h2>
<NyBookings></NyBookings>
</>)

}

export default Home