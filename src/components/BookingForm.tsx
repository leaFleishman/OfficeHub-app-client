
import type {
    Control,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";

import type { BookingFormValues } from "../features/bookings/bookingFormSchema";
import type { Room, User } from "../types/domain";

import FormField from "./FormField";
import Message from "./message";
import BookingParticipants from "../features/bookings/BookingParticipants ";
import AvailableRooms from "../features/bookings/AvailableRooms";


type Props = {
    register: UseFormRegister<BookingFormValues>;
    control: Control<BookingFormValues>;
    errors: FieldErrors<BookingFormValues>;
    setValue: UseFormSetValue<BookingFormValues>;

    employees: User[];
    rooms: Room[];

    date: string;
    startTime: string;
    endTime: string;
    roomId: number;

    hasValidSchedule: boolean;

    roomsLoading: boolean;
    roomsFailed: boolean;
    employeesLoading: boolean;
    employeesFailed: boolean;

    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;

    onSubmit: () => void;
};

const BookingForm = ({ register, control, errors, setValue, employees, rooms, date, startTime, endTime, roomId, hasValidSchedule, roomsLoading, roomsFailed, employeesLoading, employeesFailed, isPending, isSuccess, isError, onSubmit }: Props) => {
    const handleSelectRoom = (selectedRoomId: number) => {
        setValue("roomId", selectedRoomId, {
            shouldValidate: true,
            shouldDirty: true,
        });

        setValue(
            "selectedSchedule",
            `${date}|${startTime}|${endTime}`,
            { shouldValidate: true }
        );
    };

    return (
        <div className="card form-card">
            <div
                className="page-head"
                style={{ marginBottom: "1.5rem" }}
            >
                <span className="eyebrow">NEW BOOKING</span>
                <h1 className="page-title">
                    הזמנת חדר לפגישה
                </h1>
            </div>

            <form
                onSubmit={onSubmit}
                className="form-stack"
                dir="rtl"
            >
                <FormField
                    id="date"
                    label="תאריך הפגישה"
                    type="date"
                    error={errors.date?.message}
                    {...register("date")}
                />

                <FormField
                    id="startTime"
                    label="שעת התחלה"
                    type="time"
                    error={errors.startTime?.message}
                    {...register("startTime")}
                />

                <FormField
                    id="endTime"
                    label="שעת סיום"
                    type="time"
                    error={errors.endTime?.message}
                    {...register("endTime")}
                />

                <BookingParticipants
                    control={control}
                    errors={errors}
                    employees={employees}
                />

                {employeesLoading && (
                    <p className="card-caption">
                        טוען רשימת עובדים...
                    </p>
                )}

                {employeesFailed && (
                    <Message
                        message="טעינת רשימת העובדים נכשלה."
                    />
                )}

                <AvailableRooms
                    rooms={rooms}
                    roomId={roomId}
                    hasValidSchedule={hasValidSchedule}
                    roomsLoading={roomsLoading}
                    roomsFailed={roomsFailed}
                    onSelectRoom={handleSelectRoom}
                />

                {errors.roomId && (
                    <p
                        role="alert"
                        className="field-error"
                    >
                        {errors.roomId.message}
                    </p>
                )}

                <FormField
                    id="subject"
                    label="נושא הפגישה"
                    error={errors.subject?.message}
                    {...register("subject")}
                />

                {isError && (
                    <Message
                        message="שמירת ההזמנה נכשלה. בדקי את הפרטים ונסי שוב."
                    />
                )}

                {isSuccess && (
                    <p
                        role="status"
                        className="alert-success"
                    >
                        ההזמנה נשמרה בהצלחה.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isPending || !hasValidSchedule}
                    className="btn btn-primary btn-lg btn-block"
                >
                    {isPending
                        ? "שולח הזמנה..."
                        : "סיום הזמנה"}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
