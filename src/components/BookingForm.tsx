
import { Controller } from "react-hook-form";
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

const BookingForm = ({
    register,
    control,
    errors,
    setValue,
    employees,
    rooms,
    date,
    startTime,
    endTime,
    roomId,
    hasValidSchedule,
    roomsLoading,
    roomsFailed,
    employeesLoading,
    employeesFailed,
    isPending,
    isSuccess,
    isError,
    onSubmit,
}: Props) => {
    const participantIdsError =
        errors.participantIds?.message ??
        (Array.isArray(errors.participantIds)
            ? errors.participantIds.find((error) => error?.message)?.message
            : undefined);

    return (
        <form onSubmit={onSubmit} className="space-y-4">
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

            <FormField
                id="participantIds"
                label="משתתפים"
                error={participantIdsError}
            >
                <Controller
                    name="participantIds"
                    control={control}
                    render={({ field }) => (
                        <select
                            id="participantIds"
                            multiple
                            className="min-h-24 rounded-lg border border-slate-300 px-3 py-2"
                            aria-invalid={Boolean(errors.participantIds)}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={field.value.map(String)}
                            onChange={(e) =>
                                field.onChange(
                                    Array.from(e.target.selectedOptions, (option) =>
                                        Number(option.value)
                                    )
                                )
                            }
                        >
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </FormField>

            {employeesLoading && <p>טוען רשימת עובדים...</p>}

            {employeesFailed && (
                <Message message="טעינת רשימת העובדים נכשלה." />
            )}

            {hasValidSchedule && (
                <section className="space-y-2">
                    {roomsLoading && <p>טוען חדרים פנויים...</p>}

                    {roomsFailed && (
                        <Message message="טעינת החדרים הפנויים נכשלה." />
                    )}

                    {!roomsLoading && !roomsFailed && rooms.length === 0 && (
                        <Message message="אין חדרים פנויים המתאימים לפרטים שנבחרו." />
                    )}

                    {!roomsLoading &&
                        !roomsFailed &&
                        rooms.map((room) => (
                            <button
                                key={room.id}
                                type="button"
                                aria-pressed={roomId === room.id}
                                className={`block w-full rounded-lg border p-3 text-right ${
                                    roomId === room.id
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-slate-300"
                                }`}
                                onClick={() => {
                                    setValue("roomId", room.id, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });

                                    setValue(
                                        "selectedSchedule",
                                        `${date}|${startTime}|${endTime}`,
                                        { shouldValidate: true }
                                    );
                                }}
                            >
                                {room.name} — קיבולת: {room.capacity}
                            </button>
                        ))}
                </section>
            )}

            {errors.roomId && (
                <p role="alert">{errors.roomId.message}</p>
            )}

            <FormField
                id="subject"
                label="נושא הפגישה"
                error={errors.subject?.message}
                {...register("subject")}
            />

            {isError && (
                <Message message="שמירת ההזמנה נכשלה. בדקי את הפרטים ונסי שוב." />
            )}

            {isSuccess && (
                <p role="status">ההזמנה נשמרה בהצלחה.</p>
            )}

            <button 
                type="submit"
                disabled={isPending || !hasValidSchedule}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
                {isPending ? "שולח הזמנה..." : "סיום הזמנה"}
            </button>
        </form>
    );
};

export default BookingForm;
