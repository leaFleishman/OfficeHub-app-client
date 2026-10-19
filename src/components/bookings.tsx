import { useState } from "react";
import { useApiMutation } from "../hooks/useApiMutation";
import { cancelBooking, getMyBookings } from "../api/bookings";
import type { Booking } from "../types/domain";
import Message from "./message";
import { useApiQuery } from "../hooks/useApiQuery";
import ConfirmDialog from "./ConfirmDialog";

const Bookings = () => {
    const [bookingToCancel, setBookingToCancel] =
        useState<Booking | null>(null);

    const {
        data: bookings = [],
        isLoading,
        isError,
        error,
    } = useApiQuery<Booking[]>(["bookings"], getMyBookings);

    const cancelMutation = useApiMutation(
        cancelBooking,
        [["bookings"]]
    );

    if (isLoading) {
        return <Message message="טוען הזמנות..." />;
    }

    if (isError) {
        return (
            <Message
                message={`טעינת ההזמנות נכשלה: ${error.message}`}
            />
        );
    }

    const handleConfirm = () => {
        if (!bookingToCancel) return;

        cancelMutation.mutate(bookingToCancel, {
            onSuccess: () => setBookingToCancel(null),
        });
    };

    return (
        <main
            dir="rtl"
            className="mx-auto min-h-screen w-full max-w-5xl bg-slate-50 px-4 py-8 text-slate-800 sm:px-6"
        >
            <header className="mb-8 border-b border-slate-200 pb-5">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    הפגישות שלי
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    צפייה בפרטי הפגישות וניהול ההזמנות שלך
                </p>
            </header>

            {cancelMutation.isError && (
                <div
                    role="alert"
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    ביטול הפגישה נכשל: {cancelMutation.error.message}
                </div>
            )}

            {bookings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                    <p className="text-lg font-semibold text-slate-700">
                        אין לך פגישות להצגה
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        ההזמנות שלך יופיעו כאן לאחר יצירתן.
                    </p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 gap-5 p-0 md:grid-cols-2">
                    {bookings.map((booking) => {
                        const isActive = booking.status === "Active";

                        return (
                            <li
                                key={booking.id}
                                className="list-none rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
                            >
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            חדר ישיבות
                                        </p>
                                        <h2 className="mt-1 text-lg font-bold text-slate-800">
                                            {booking.roomName}
                                        </h2>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                            isActive
                                                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                                : "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                                        }`}
                                    >
                                        {isActive ? "פעילה" : "בוטלה"}
                                    </span>
                                </div>

                                <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            נושא הפגישה
                                        </p>
                                        <p className="mt-1 font-medium text-slate-800">
                                            {booking.subject || "לא צוין"}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500">
                                                תאריך
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {booking.date}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                שעות הפגישה
                                            </p>
                                            <p className="mt-1 font-medium">
                                                {booking.startTime}–{booking.endTime}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            הוזמנה עבור
                                        </p>
                                        <p className="mt-1 font-medium">
                                            {booking.userName || "לא צוין"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            מספר חדר
                                        </p>
                                        <p className="mt-1 font-medium">
                                            {booking.roomId}
                                        </p>
                                    </div>
                                </div>

                                {isActive && (
                                    <button
                                        type="button"
                                        className="mt-5 w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-50"
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