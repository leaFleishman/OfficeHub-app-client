// לוח בקרה לעובד - GET /dashboard/employee

import { getEmployeeDashboard } from "../../api/dashboard";
import { getMyBookings } from "../../api/bookings";
import StatCard from "../../components/StatCard";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { Booking } from "../../types/domain";
import QueryMessage from "../../components/QueryMessage ";

const EmployeeDashboard = () => {
    // נתוני לוח הבקרה
    const {
        data: dashboard,
        isPending: dashboardIsPending,
        isError: dashboardIsError,
    } = useApiQuery(
        [["employees", "inquiries", "bookings"]],
        getEmployeeDashboard
    );

    const {
        data: bookings = [],
        isPending: bookingsIsPending,
        isError: bookingsIsError,
    } = useApiQuery<Booking[]>(
        ["bookings"],
        getMyBookings
    );

    if (dashboardIsPending || bookingsIsPending) {
        return (
            <QueryMessage
                errorMessage="טעינה נכשלה"
                loadingMessage="טוען..."
                isError={false}
                isPending={true}
            />
        );
    }

    if (dashboardIsError || bookingsIsError || !dashboard) {
        return (
            <QueryMessage
                errorMessage="טעינת לוח הבקרה נכשלה"
                loadingMessage="טוען..."
                isError={true}
                isPending={false}
            />
        );
    }

    // מספר הפגישות הפעילות
    const activeBookings = bookings.filter(
        (booking) => booking.status === "Active"
    ).length;

    // מספר הפגישות שאינן פעילות
    const inactiveBookings = bookings.filter(
        (booking) => booking.status !== "Active"
    ).length;

    return (
        <div className="stack-y">
            <div className="page-head">
                <span className="eyebrow">MY WORKSPACE</span>
                <h1 className="page-title">לוח עובד משרד</h1>
            </div>

            {/* כרטיסי נתונים */}
            <div className="stat-grid">
                <StatCard
                    title="פגישות"
                    value={activeBookings}
                />

                <StatCard
                    title="פניות פתוחות"
                    value={dashboard.openInquiries ?? 0}
                />

                <StatCard
                    title="הפגישה הקרובה"
                    value={
                        dashboard.nextMeeting?.subject ??
                        "אין פגישות קרובות"
                    }
                />
            </div>

            {/* גרף הפגישות */}
            {bookings.length > 0 && (
                <section className="card chart-card">
                    <div className="chart-head">
                        <h2 className="chart-title">הפגישות שלי</h2>
                        <span className="chart-sub">
                            פעילות מול מבוטלות
                        </span>
                    </div>

                    <div className="stackbar" aria-hidden="true">
                        <div
                            className="stackbar-seg seg-a"
                            style={{ flexGrow: activeBookings }}
                        />

                        <div
                            className="stackbar-seg seg-muted"
                            style={{ flexGrow: inactiveBookings }}
                        />
                    </div>

                    <div className="chart-legend-row">
                        <div className="legend-item">
                            <span className="legend-dot" />
                            פעילות
                            <b>{activeBookings}</b>
                        </div>

                        <div className="legend-item">
                            <span className="legend-dot legend-dot--muted" />
                            מבוטלות
                            <b>{inactiveBookings}</b>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default EmployeeDashboard;