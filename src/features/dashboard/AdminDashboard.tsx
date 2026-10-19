import { getBuildingDashboard } from "../../api/dashboard";
import StatCard from "../../components/StatCard";
import { useApiQuery } from "../../hooks/useApiQuery";

const AdminDashboard = () => {
    const { data, isLoading, isError, error } = useApiQuery([["companies","rooms","inquiries","employees"]],getBuildingDashboard);

    if (isLoading) {
        return <div><p>בטעינה...</p></div>;
    }

    if (isError) {
        return <div>שגיאה: {String(error)}</div>;
    }

    return (
         <div>
      <h1>לוח מנהל בניין</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

