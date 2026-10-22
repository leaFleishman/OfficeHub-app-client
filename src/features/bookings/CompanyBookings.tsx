import { getCompanyBookings } from "../../api/bookings";
import Message from "../../components/message";
import QueryMessage from "../../components/QueryMessage ";
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

export const CompanyBookings = ({
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
    } = useApiQuery<CompanyBookingsResponse>(
        ["company-bookings", empId, roomId, companyId, from, to],
        () => getCompanyBookings(empId, roomId, companyId, from, to)
    );
    const queryMessage = (<QueryMessage errorMessage="טעינת ההזמנות נכשלה" loadingMessage="טוען הזמנות..." isError={isError} isPending={isPending}></QueryMessage>)

    if (isPending || isError)
        return queryMessage

    if(!data) return null

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
