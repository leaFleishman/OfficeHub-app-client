import { getMyBookings } from "../../api/bookings";
import Bookings from "../../components/bookings";
import Message from "../../components/message";
import { useApiQuery } from "../../hooks/useApiQuery";

// הפגישות שלי - GET /bookings/mine, ביטול פגישה


export const MyBookings = () => {
    const{isError,isPending}=useApiQuery(["bookings"],getMyBookings)

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




