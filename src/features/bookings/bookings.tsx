
import { useState } from "react";
import { useApiMutation } from "../../hooks/useApiMutation";
import { cancelBooking, getMyBookings } from "../../api/bookings";
import type { Booking } from "../../types/domain";
import { useApiQuery } from "../../hooks/useApiQuery";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useAuth } from "../../auth/useAuth";
import QueryMessage from "../../components/QueryMessage ";

type BookingsProps = {
    bookings?: Booking[];
    title?: string;
};

const Bookings = ({
    bookings: providedBookings,
    title = "הפגישות שלי",
}: BookingsProps) => {
    const { user } = useAuth();

    const [bookingToCancel, setBookingToCancel] =
        useState<Booking | null>(null);

    const {
        data: myBookings = [],
        isPending,
        isError,
    } = useApiQuery<Booking[]>(["bookings"], getMyBookings, {
        enabled: providedBookings === undefined,
    });
    const bookings = providedBookings ?? myBookings;

    const cancelMutation = useApiMutation(
        cancelBooking,
        [["bookings"]]
    );

    const handleConfirm = () => {
        if (!bookingToCancel) return;

        cancelMutation.mutate(bookingToCancel, {
            onSuccess: () => setBookingToCancel(null),
        });
    };

    const queryMessage =(<QueryMessage errorMessage="טעינת הזמנות נכשלה" loadingMessage="טוען הזמנות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (providedBookings === undefined && (isPending || isError))
    return queryMessage

    return (
        <main
            dir="rtl"
            className="stack-y"
        >
            <header className="page-head">
                <span className="eyebrow">BOOKINGS</span>
                <h1 className="page-title">
                    {title}
                </h1>
                <p className="page-sub">
                    {title === "הפגישות שלי"
                        ? "צפייה בפרטי הפגישות וניהול ההזמנות שלך"
                        : "צפייה בפרטי כל ההזמנות במערכת"}
                </p>
            </header>

            {cancelMutation.isError && (
                <div
                    role="alert"
                    className="alert-error"
                >
                    ביטול הפגישה נכשל: {cancelMutation.error.message}
                </div>
            )}

            {bookings.length > 0 && (
                <section className="card chart-card">
                    <div className="chart-head">
                        <h2 className="chart-title">סטטוס הזמנות</h2>
                        <span className="chart-sub">{bookings.length} הזמנות בתצוגה</span>
                    </div>

                    <div className="donut-wrap">
                        <div className="donut">
                            <svg viewBox="0 0 100 100" aria-hidden="true">
                                <circle className="donut-track" cx="50" cy="50" r="40" strokeWidth="9" />
                                <circle
                                    className="donut-arc"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    strokeWidth="9"
                                    pathLength={100}
                                    stroke="#c9486f"
                                    strokeDasharray={`${(bookings.filter((b) => b.status === "Active").length / bookings.length) * 100} 100`}
                                />
                            </svg>
                            <div className="donut-center">
                                <span className="donut-number">
                                    {Math.round((bookings.filter((b) => b.status === "Active").length / bookings.length) * 100)}%
                                </span>
                                <span className="donut-caption">פעילות</span>
                            </div>
                        </div>

                        <div className="legend">
                            <div className="legend-item">
                                <span className="legend-dot"></span>
                                פעילות
                                <b>{bookings.filter((b) => b.status === "Active").length}</b>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot legend-dot--muted"></span>
                                בוטלו
                                <b>{bookings.filter((b) => b.status !== "Active").length}</b>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {bookings.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-title">
                        {title === "הפגישות שלי"
                            ? "אין לך פגישות להצגה"
                            : "לא נמצאו הזמנות."}
                    </p>
                    <p className="empty-sub">
                        {title === "הפגישות שלי"
                            ? "ההזמנות שלך יופיעו כאן לאחר יצירתן."
                            : "ההזמנות יופיעו כאן לאחר יצירתן."}
                    </p>
                </div>
            ) : (
                <ul className="card-grid">
                    {bookings.map((booking) => {
                        const isActive = booking.status === "Active";

                        return (
                            <li
                                key={booking.id}
                                className="card card-hover booking-card"
                            >
                                <div className="booking-top">
                                    <div>
                                        <p className="meta-label">
                                            חדר ישיבות
                                        </p>
                                        <h2 className="booking-room">
                                            {booking.roomName}
                                        </h2>
                                    </div>

                                    <span
                                        className={`badge ${
                                            isActive
                                                ? "badge-ok"
                                                : "badge-muted"
                                        }`}
                                    >
                                        <span className="badge-dot"></span>
                                        {isActive ? "פעילה" : "בוטלה"}
                                    </span>
                                </div>

                                <div>
                                    <div className="time-track" aria-hidden="true">
                                        <span
                                            className={`time-block ${isActive ? "" : "time-block--off"}`}
                                            style={{
                                                left: `${((Number(booking.startTime.slice(0, 2)) * 60 + Number(booking.startTime.slice(3, 5))) / 1440) * 100 || 0}%`,
                                                width: `${(((Number(booking.endTime.slice(0, 2)) * 60 + Number(booking.endTime.slice(3, 5))) - (Number(booking.startTime.slice(0, 2)) * 60 + Number(booking.startTime.slice(3, 5)))) / 1440) * 100 || 0}%`,
                                            }}
                                        ></span>
                                    </div>
                                    <div className="time-scale" aria-hidden="true">
                                        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
                                    </div>
                                </div>

                                <div className="booking-meta">
                                    <div className="span-2">
                                        <p className="meta-label">
                                            נושא הפגישה
                                        </p>
                                        <p className="meta-value">
                                            {booking.subject || "לא צוין"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="meta-label">
                                            תאריך
                                        </p>
                                        <p className="meta-value">
                                            {booking.date}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="meta-label">
                                            שעות הפגישה
                                        </p>
                                        <p className="meta-value">
                                            {booking.startTime}–{booking.endTime}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="meta-label">
                                            הוזמנה עבור
                                        </p>
                                        <p className="meta-value">
                                            {booking.userName || "לא צוין"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="meta-label">
                                            מספר חדר
                                        </p>
                                        <p className="meta-value">
                                            {booking.roomId}
                                        </p>
                                    </div>

                                    <div className="span-2">
                                        <p className="meta-label">
                                            משתתפים
                                        </p>

                                        {booking.participants?.length ? (
                                            <ul className="participants">
                                                {booking.participants.map(
                                                    (participant) => (
                                                        <li key={participant.id} className="tag">
                                                            {participant.name}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <p className="meta-value badge-muted">
                                                אין מידע על משתתפים.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {isActive&&user?.role!=="Employee"&& (
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block"
                                        onClick={() =>
                                            setBookingToCancel(booking)
                                        }
                                        disabled={cancelMutation.isPending}
                                    >
                                        ביטול הזמנה
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            <ConfirmDialog
                isOpen={bookingToCancel !== null}
                title="ביטול פגישה"
                message="האם את בטוחה שברצונך לבטל את הפגישה?"
                confirmText="כן, לבטל"
                cancelText="חזרה"
                onConfirm={handleConfirm}
                onCancel={() => setBookingToCancel(null)}
                isLoading={cancelMutation.isPending}
            />
        </main>
    );
};

export default Bookings;
