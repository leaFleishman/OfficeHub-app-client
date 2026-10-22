// לוח בקרה לעובד - GET /dashboard/employee

import { getEmployeeDashboard } from "../../api/dashboard";
import { getMyBookings } from "../../api/bookings";
import StatCard from "../../components/StatCard";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { Booking } from "../../types/domain";
import QueryMessage from "../../components/QueryMessage ";

const EmployeeDashboard = () => {
    const { data, isError } = useApiQuery([["employees", "inquiries", "bookings"]], getEmployeeDashboard);
    const {
        data: bookings = [],
        isPending,
        isError: bookingsIsError,
        error: bookingsError,
    } = useApiQuery<Booking[]>(["bookings"], getMyBookings);

   
const queryMessage =(<QueryMessage errorMessage="טעינה נכשלה" loadingMessage="טוען ..."  isError={bookingsIsError} isPending={isPending}></QueryMessage>)

   if (isPending || bookingsIsError)
    return queryMessage

    return (
        <div>
            <h1>לוח עובד משרד</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard title=" פגישות " value={bookings.filter((booking) => booking.status === "Active").length} />
                <StatCard title="פניות פתוחות" value={data.openInquiries} />
                <StatCard
                    title="הפגישה הקרובה"
                    value={data.nextMeeting?.subject ?? "אין פגישות קרובות"}
                />      </div>
            {/* להוסיף טבלאות/גרפים לפי צורך */}
        </div>
    );
};

export default EmployeeDashboard;