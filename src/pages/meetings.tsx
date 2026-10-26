import { useAuth } from "../auth/useAuth"
import CreateBooking from "../features/bookings/createBooking"
import { MyBookings } from "../features/bookings/MyBookings"

const Meetings = () => {
  const { user } = useAuth()

  return (<>
    {user?.role !== "Employee" && (<CreateBooking></CreateBooking>)}
    <MyBookings></MyBookings>
  </>)

}
export default Meetings