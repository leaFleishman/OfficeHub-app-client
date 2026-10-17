import Bookings from "../../components/bookings";
import Message from "../../components/message";
import { useCompanyBookings } from "../../hooks/useBookings";

// הפגישות שלי - GET /bookings/mine, ביטול פגישה



export const AllBookings = () => {
    const {
        isPending,
        isError,
    } = useCompanyBookings();
    if (isPending) {
        return <Message message=">טוען הזמנות..."></Message>;

    }
    if (isError) {
        return <Message message="טעינת ההזמנות נכשלה"></Message>;
    }

    return (<>
        <Bookings></Bookings>
    </>)

}





