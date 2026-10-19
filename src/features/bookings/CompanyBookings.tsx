import { getCompanyBookings } from "../../api/bookings";
import Message from "../../components/message";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { Booking } from "../../types/domain";

type CompanyBookingsProps = {
    empId: number;
    roomId: number;
    companyId: number;
    from: string;
    to: string;
};

type CompanyBookingsResponse = {
    items: Booking[];
};

export const AllBookings = ({
    empId,
    roomId,
    companyId,
    from,
    to,
}: CompanyBookingsProps) => {
    const {
        data,
        isError,
        isPending,
        error,
    } = useApiQuery<CompanyBookingsResponse>(
        ["company-bookings", empId, roomId, companyId, from, to],
        () => getCompanyBookings(empId, roomId, companyId, from, to)
    );

    if (isPending) {
        return <Message message="טוען הזמנות..." />;
    }

    if (isError) {
        return <Message message={`טעינת ההזמנות נכשלה: ${error.message}`} />;
    }

    if (data.items.length === 0) {
        return <Message message="לא נמצאו הזמנות לחברה." />;
    }

    return (
        <main dir="rtl">
            <h1>הזמנות החברה</h1>
            <ul>
                {data.items.map((booking) => (
                    <li key={booking.id}>
                        <h2>פגישה בחדר {booking.roomName}</h2>
                        <p>נקבעה עבור: {booking.userName ?? "לא צוין"}</p>
                        <p>תאריך: {booking.date}</p>
                        <p>נושא: {booking.subject ?? "לא צוין"}</p>
                        <p>
                            שעות: {booking.startTime}–{booking.endTime}
                        </p>
                        <p>
                            סטטוס: {booking.status === "Active" ? "פעילה" : "בוטלה"}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
};
