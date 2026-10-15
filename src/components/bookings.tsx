import { useCancelMeeting, useMyBookings } from "../hooks/useBookings";
import type { Booking } from "../types/domain";



const Bookings = () => {
    const cancelMutation = useCancelMeeting();
    const {
        data: bookings,
    } = useMyBookings();

    return (<div>
        <h1>הזמנות </h1>

        {bookings.map((booking: Booking) => (
            <div key={booking.id}>
                {<p>נקבעה פגישה עבור: {booking.userName} בתאריך: {booking.date}</p>}
                {<p>בנושא: {booking.subject}</p>}
                {<p>הפגישה תתקיים בחדר {booking.roomName} ,  {booking.roomId}</p>}
                {<p>החל משעה {booking.startTime} ועד השעה{booking.endTime}</p>}
                <button
                    disabled={cancelMutation.isPending}
                    onClick={() => {
                        const confirmed = confirm("האם את מאשרת ביטול הפגישה?");

                        if (confirmed) {
                            cancelMutation.mutate(booking);
                        }
                    }}
                >
                    {cancelMutation.isPending ? "מבטל..." : "ביטול הפגישה"}
                </button>
            </div>
        ))}
    </div>)
}
export default Bookings