// לוח בקרה לעובד - GET /dashboard/employee

import { getEmployeeDashboard } from "../../api/dashboard";
import StatCard from "../../components/StatCard";
import { useApiQuery } from "../../hooks/useApiQuery";

const EmployeeDashboard = () => {
    const { data, isLoading, isError, error } = useApiQuery([["employees","inquiries","bookings"]],getEmployeeDashboard);

    if (isLoading) {
        return <div><p>בטעינה...</p></div>;
    }

    if (isError) {
        return <div>שגיאה: {String(error)}</div>;
    }

    return (
         <div>
      <h1>לוח עובד משרד</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard title=" פגישות " value={data.meetupcomingMeetings } />
        <StatCard title="פניות פתוחות" value={data.openInquiries } />
        <StatCard title="הפגישה הקרובה" value={data.nextMeeting} />
      </div>
      {/* להוסיף טבלאות/גרפים לפי צורך */}
    </div>
    );
};

export default EmployeeDashboard;