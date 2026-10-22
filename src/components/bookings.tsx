
import { useState } from "react";
import { useApiMutation } from "../hooks/useApiMutation";
import { cancelBooking, getMyBookings } from "../api/bookings";
import type { Booking } from "../types/domain";
import Message from "./message";
import { useApiQuery } from "../hooks/useApiQuery";
import ConfirmDialog from "./ConfirmDialog";
import { useAuth } from "../auth/useAuth";
import QueryMessage from "./QueryMessage ";

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
        error,
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

   if (isPending || isError)
    return queryMessage

    return (
        <main
            dir="rtl"
            className="mx-auto min-h-screen w-full max-w-5xl bg-slate-50 px-4 py-8 text-slate-800 sm:px-6"
        >
            <header className="mb-8 border-b border-slate-200 pb-5">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {title}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    {title === "הפגישות שלי"
                        ? "צפייה בפרטי הפגישות וניהול ההזמנות שלך"
                        : "צפייה בפרטי כל ההזמנות במערכת"}
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
                        {title === "הפגישות שלי"
                            ? "אין לך פגישות להצגה"
                            : "לא נמצאו הזמנות."}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        {title === "הפגישות שלי"
                            ? "ההזמנות שלך יופיעו כאן לאחר יצירתן."
                            : "ההזמנות יופיעו כאן לאחר יצירתן."}
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

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            משתתפים
                                        </p>

                                        {booking.participants?.length ? (
                                            <ul className="mt-1 list-inside list-disc">
                                                {booking.participants.map(
                                                    (participant) => (
                                                        <li key={participant.id}>
                                                            {participant.name}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <p className="mt-1 text-slate-500">
                                                אין מידע על משתתפים.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {isActive&&user?.role!=="Employee"&& (
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
