import Bookings from "../../components/bookings";
import Message from "../../components/Message";
import { useMyBookings } from "../../hooks/useBookings";

// הפגישות שלי - GET /bookings/mine, ביטול פגישה
const {
    isPending,
    isError,
} = useMyBookings();


export const NyBookings = () => {
    if (isPending) {
        return <Message message="טוען הזמנות..."></Message>
    }
    if (isError) {
        return <Message message=">טעינת ההזמנות נכשלה"></Message>;
    }

    return (<>
        <Bookings></Bookings>
    </>)
}





