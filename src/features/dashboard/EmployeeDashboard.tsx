// לוח בקרה לעובד - GET /dashboard/employee

import StatCard from "../../components/StatCard";
import { useEmployeeDashboard } from "../../hooks/useDashboard";

const EmployeeDashboard = () => {
    const { data, isLoading, isError, error } = useEmployeeDashboard();

    if (isLoading) {
        return <div><p>בטעינה...</p></div>;
    }

    if (isError) {
        return <div>שגיאה: {String(error)}</div>;
    }

    return (
         <div>
      <h1>לוח עובד משרד</h1>
      <div>
        <StatCard title="ההזמנה הקרובה " value={data} />
        <StatCard title="פניות פתוחות" value={data.openInquiries} />
        <StatCard title="פגישות" value={`${data.occupancyRate}%`} />
      </div>
      {/* להוסיף טבלאות/גרפים לפי צורך */}
    </div>
    );
};

export default EmployeeDashboard;