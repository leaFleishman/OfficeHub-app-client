import { useApiMutation } from "../hooks/useApiMutation";
import { cancelBooking, getMyBookings } from "../api/bookings";
import type { Booking } from "../types/domain";
import Message from "./message";
import { useApiQuery } from "../hooks/useApiQuery";

const Bookings = () => {
    const { data: bookings = [], isLoading,isError } = useApiQuery(['bookings'],getMyBookings);

    // אחרי ביטול מוצלח, רענון הרשימה ["bookings"]
    const cancelMutation = useApiMutation(cancelBooking, [["bookings"]]);

    if (isLoading) {
        return <Message message="טוען הזמנה..."></Message>;
    }
    if (isError) {
        <Message message="שגיאת העלאת הקבצים"></Message>
    }

    return (
        <div>
            <h1>הזמנות</h1>

            {cancelMutation.isError && (
                <p>שגיאה: {cancelMutation.error.message}</p>
            )}

            {bookings.map((booking: Booking) => {
                

                return (
                    <div key={booking.id}>
                        <p>
                            נקבעה פגישה עבור: {booking.userName}
                            בתאריך: {booking.date}
                        </p>

                        <p>בנושא: {booking.subject}</p>

                        <p>
                            הפגישה תתקיים בחדר {booking.roomName},
                            {booking.roomId}
                        </p>

                        <p>
                            החל משעה {booking.startTime}
                            ועד השעה {booking.endTime}
                        </p>

                        <button
                            onClick={() => cancelMutation.mutate(booking)}>
                        
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Bookings;