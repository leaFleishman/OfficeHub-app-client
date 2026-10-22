// לוח בקרה למנהל חברה - GET /dashboard/company


import { getCompanyDashboard } from "../../api/dashboard";
import Message from "../../components/message";
import StatCard from "../../components/StatCard";
import { useApiQuery } from "../../hooks/useApiQuery";

const ManagerDashboard = () => {
    const { data, isLoading, isError } = useApiQuery([["employees", "bookings", "inquiries"]], getCompanyDashboard);

   
   

    {
    }
    if (isLoading) {
        return <Message message=">בטעינה..."></Message>
    }

    if (isError||!data) {
        return <Message message="שגיאה"></Message>
    }
    const details = data.nextMeeting
  ? `${data.nextMeeting.subject} - ${data.nextMeeting.roomName} - ${data.nextMeeting.date}`
  : "אין פגישות קרובות";
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="flex flex-nowrap gap-4">
                <StatCard title=" עובדים פעילים" value={data.employees.active} />
                <StatCard title="עובדים חסומים" value={data.employees.blocked} />
                <StatCard title="מספר פגישות השבוע" value={data.meetingsThisWeek} />
                <StatCard title="הפגישה הקרובה" value={details }
                />
            </div>
            {/* להוסיף טבלאות/גרפים לפי צורך */}
        </div>
    );
};

export default ManagerDashboard;