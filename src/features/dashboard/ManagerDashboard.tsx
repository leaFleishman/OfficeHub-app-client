// לוח בקרה למנהל חברה - GET /dashboard/company


import { getCompanyDashboard } from "../../api/dashboard";
import QueryMessage from "../../components/QueryMessage ";
import StatCard from "../../components/StatCard";
import { useApiQuery } from "../../hooks/useApiQuery";

const ManagerDashboard = () => {
    const { data, isLoading, isError } = useApiQuery([["employees", "bookings", "inquiries"]], getCompanyDashboard);

    if (isLoading || isError || !data) {
        return (
            <QueryMessage
                errorMessage="טעינת לוח הבקרה נכשלה"
                loadingMessage="טוען..."
                isError={isError || !data}
                isPending={isLoading}
            />
        );
    }
    const details = data.nextMeeting
  ? `${data.nextMeeting.subject} - ${data.nextMeeting.roomName} - ${data.nextMeeting.date}`
  : "אין פגישות קרובות";
    return (
        <div className="stack-y">
            <div className="page-head">
                <span className="eyebrow">COMPANY OVERVIEW</span>
                <h1 className="page-title">סקירת החברה</h1>
            </div>

            <div className="stat-grid">
                <StatCard title=" עובדים פעילים" value={data.employees.active} />
                <StatCard title="עובדים חסומים" value={data.employees.blocked} />
                <StatCard title="מספר פגישות השבוע" value={data.meetingsThisWeek} />
                <StatCard title="הפגישה הקרובה" value={details }
                />
            </div>

            <div className="chart-grid">
                <section className="card chart-card">
                    <div className="chart-head">
                        <h2 className="chart-title">מצב עובדים</h2>
                        <span className="chart-sub">פעילים מול חסומים</span>
                    </div>
                    <div className="donut-wrap">
                        <div className="donut">
                            <svg viewBox="0 0 100 100" aria-hidden="true">
                                <circle className="donut-track" cx="50" cy="50" r="40" strokeWidth="9" />
                                <circle className="donut-arc" cx="50" cy="50" r="40" strokeWidth="9" pathLength={100} stroke="#72d3a8" strokeDasharray={`${(data.employees.active / Math.max(data.employees.active + data.employees.blocked, 1)) * 100} 100`} />
                            </svg>
                            <div className="donut-center">
                                <span className="donut-number">{data.employees.active + data.employees.blocked}</span>
                                <span className="donut-caption">עובדים</span>
                            </div>
                        </div>
                        <div className="legend">
                            <div className="legend-item"><span className="legend-dot legend-dot--ok"></span>פעילים<b>{data.employees.active}</b></div>
                            <div className="legend-item"><span className="legend-dot legend-dot--muted"></span>חסומים<b>{data.employees.blocked}</b></div>
                        </div>
                    </div>
                </section>

                <section className="card chart-card">
                    <div className="chart-head">
                        <h2 className="chart-title">פעילות החברה</h2>
                        <span className="chart-sub">ביחס לערך הגבוה ביותר</span>
                    </div>
                    <div className="bars">
                        <div className="bar-row">
                            <span className="bar-label">עובדים פעילים</span>
                            <div className="bar-track"><div className="bar-fill" style={{ width: `${(data.employees.active / Math.max(data.employees.active, data.employees.blocked, data.meetingsThisWeek, 1)) * 100}%` }}></div></div>
                            <span className="bar-value">{data.employees.active}</span>
                        </div>
                        <div className="bar-row">
                            <span className="bar-label">עובדים חסומים</span>
                            <div className="bar-track"><div className="bar-fill bar-fill--gold" style={{ width: `${(data.employees.blocked / Math.max(data.employees.active, data.employees.blocked, data.meetingsThisWeek, 1)) * 100}%` }}></div></div>
                            <span className="bar-value">{data.employees.blocked}</span>
                        </div>
                        <div className="bar-row">
                            <span className="bar-label">פגישות השבוע</span>
                            <div className="bar-track"><div className="bar-fill" style={{ width: `${(data.meetingsThisWeek / Math.max(data.employees.active, data.employees.blocked, data.meetingsThisWeek, 1)) * 100}%` }}></div></div>
                            <span className="bar-value">{data.meetingsThisWeek}</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ManagerDashboard;
