import { getMyBookings } from "../../api/bookings";
import Bookings from "../../components/bookings";
import QueryMessage from "../../components/QueryMessage ";
import { useApiQuery } from "../../hooks/useApiQuery";

// הפגישות שלי - GET /bookings/mine, ביטול פגישה


export const MyBookings = () => {
    const{isError,isPending}=useApiQuery(["bookings"],getMyBookings)

const queryMessage =(<QueryMessage errorMessage="טעינת הזמנות נכשלה" loadingMessage="טוען הזמנות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage

    return (<>
        <Bookings></Bookings>
    </>)
}



