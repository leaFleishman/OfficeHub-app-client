// לוח בקרה למנהל חברה - GET /dashboard/company


import StatCard from "../../components/StatCard";
import { useCompanyDashboard } from "../../hooks/useDashboard";

const ManagerDashboard = () => {
    const { data, isLoading, isError, error } = useCompanyDashboard();

    if (isLoading) {
        return <div><p>בטעינה...</p></div>;
    }

    if (isError) {
        return <div>שגיאה: {String(error)}</div>;
    }

    return (
         <div>
      <h1 className=" text-red-600">לוח מנהל בניין</h1>
      <div className="flex flex-nowrap gap-4">
        <StatCard title=" עובדים פעילים" value={data.employees.active}  />
        <StatCard title="עובדים חסומים" value={data.employees.blocked}  />
        <StatCard title="מספר פגישות השבוע" value={data.meetingsThisWeek}  />
        <StatCard title="הפגישה הקרובה" value={data.topRooms.length} />
      </div>
      {/* להוסיף טבלאות/גרפים לפי צורך */}
    </div>
    );
};

export default ManagerDashboard;