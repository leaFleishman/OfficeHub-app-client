
import type { Booking as BookingType } from "../types/domain";

type BookingProps = {
  bookings: BookingType[];
  onCancel?: (booking: BookingType) => void;
  isCanceling?: boolean;
};

const Booking = ({
  bookings,
  onCancel,
  isCanceling = false,
}: BookingProps) => {
  if (bookings.length === 0) {
    return (
      <p dir="rtl" className="p-4 text-center text-gray-500">
        לא נמצאו פגישות.
      </p>
    );
  }

  return (
    <section dir="rtl" className="space-y-4">
      {bookings.map((booking) => (
        <article
          key={booking.id}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold">
            {booking.subject}
          </h2>

          <p className="mt-2">
            <strong>חדר:</strong> {booking.roomName}
          </p>

          <p>
            <strong>תאריך:</strong>{" "}
            {new Date(booking.date).toLocaleDateString("he-IL")}
          </p>

          <p>
            <strong>שעות:</strong>{" "}
            {booking.startTime}–{booking.endTime}
          </p>

          <div className="mt-3">
            <strong>משתתפים:</strong>

            {booking.participants?.length ? (
              <ul className="mt-1 list-inside list-disc">
                {booking.participants.map((participant) => (
                  <li key={participant.id}>
                    {participant.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                אין מידע על משתתפים.
              </p>
            )}
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={() => onCancel(booking)}
              disabled={isCanceling}
              className="mt-4 rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {isCanceling ? "מבטל..." : "ביטול פגישה"}
            </button>
          )}
        </article>
      ))}
    </section>
  );
};

export default Booking;
