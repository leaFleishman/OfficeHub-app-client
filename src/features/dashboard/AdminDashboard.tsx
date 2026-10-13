import StatCard from "../../components/StatCard";
import { useBuildingDashboard } from "../../hooks/useDashboard";

const AdminDashboard = () => {
    const { data, isLoading, isError, error } = useBuildingDashboard();

    if (isLoading) {
        return <div><p>בטעינה...</p></div>;
    }

    if (isError) {
        return <div>שגיאה: {String(error)}</div>;
    }

    return (
         <div>
      <h1>לוח מנהל בניין</h1>
      <div>
        <StatCard title="חברות" value={data.companies} />
        <StatCard title="עובדים" value={data.employees} />
        <StatCard title="חדרים בתפוסה" value={data.rooms} />
        <StatCard title="פניות פתוחות" value={data.openInquiries} />
      </div>
      {/* להוסיף טבלאות/גרפים לפי צורך */}
    </div>
    );
};

export default AdminDashboard;