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
         <div className="stack-y">
      <div className="page-head">
        <span className="eyebrow">BUILDING OVERVIEW</span>
        <h1 className="page-title">סקירת הבניין</h1>
      </div>
      <div className="stat-grid">
        <StatCard title="חברות" value={data.companies} />
        <StatCard title="עובדים" value={data.employees} />
        <StatCard title="חדרים בתפוסה" value={data.rooms} />
        <StatCard title="פניות פתוחות" value={data.openInquiries} />
      </div>

      <div className="chart-grid">
        <section className="card chart-card">
          <div className="chart-head">
            <h2 className="chart-title">התפלגות הבניין</h2>
            <span className="chart-sub">ביחס לערך הגבוה ביותר</span>
          </div>
          <div className="bars">
            <div className="bar-row">
              <span className="bar-label">חברות</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(data.companies / Math.max(data.companies, data.employees, data.rooms, data.openInquiries, 1)) * 100}%` }}></div></div>
              <span className="bar-value">{data.companies}</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">עובדים</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(data.employees / Math.max(data.companies, data.employees, data.rooms, data.openInquiries, 1)) * 100}%` }}></div></div>
              <span className="bar-value">{data.employees}</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">חדרים בתפוסה</span>
              <div className="bar-track"><div className="bar-fill bar-fill--gold" style={{ width: `${(data.rooms / Math.max(data.companies, data.employees, data.rooms, data.openInquiries, 1)) * 100}%` }}></div></div>
              <span className="bar-value">{data.rooms}</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">פניות פתוחות</span>
              <div className="bar-track"><div className="bar-fill bar-fill--gold" style={{ width: `${(data.openInquiries / Math.max(data.companies, data.employees, data.rooms, data.openInquiries, 1)) * 100}%` }}></div></div>
              <span className="bar-value">{data.openInquiries}</span>
            </div>
          </div>
        </section>

        <section className="card chart-card">
          <div className="chart-head">
            <h2 className="chart-title">חברות מול עובדים</h2>
            <span className="chart-sub">יחס כללי</span>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="donut-track" cx="50" cy="50" r="40" strokeWidth="9" />
                <circle className="donut-arc" cx="50" cy="50" r="40" strokeWidth="9" pathLength={100} stroke="#c9486f" strokeDasharray={`${(data.employees / Math.max(data.companies + data.employees, 1)) * 100} 100`} />
              </svg>
              <div className="donut-center">
                <span className="donut-number">{data.companies + data.employees}</span>
                <span className="donut-caption">סה״כ</span>
              </div>
            </div>
            <div className="legend">
              <div className="legend-item"><span className="legend-dot"></span>עובדים<b>{data.employees}</b></div>
              <div className="legend-item"><span className="legend-dot legend-dot--muted"></span>חברות<b>{data.companies}</b></div>
            </div>
          </div>
        </section>
      </div>
    </div>
    );
};

export default AdminDashboard;
