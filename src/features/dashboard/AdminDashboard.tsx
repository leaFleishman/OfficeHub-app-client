import { getBuildingDashboard } from "../../api/dashboard";
import QueryMessage from "../../components/QueryMessage ";
import StatCard from "../../components/StatCard";
import { useApiQuery } from "../../hooks/useApiQuery";

const AdminDashboard = () => {
    const { data, isPending, isError } = useApiQuery([["companies","rooms","inquiries","employees"]],getBuildingDashboard);
const queryMessage =(<QueryMessage errorMessage="שגיאה בטעינה" loadingMessage="טוען חדרים..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage

    return (
         <div>
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
