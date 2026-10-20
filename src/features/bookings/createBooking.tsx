import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createBookings } from "../../api/bookings";
import { getEmployees } from "../../api/employees";
import { getAvailableRooms } from "../../api/rooms";
import { useApiMutation } from "../../hooks/useApiMutation";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { CreateBookingInput, Room, User } from "../../types/domain";
import BookingForm from "../../components/BookingForm";
import { bookingFormSchema } from "./bookingFormSchema";
import type { BookingFormValues } from "./bookingFormSchema";

const PAGE = 1;
const PAGE_SIZE = 20;

const CreateBooking = () => {
    const {
        data: employees = [],
        isLoading: employeesLoading,
        isError: employeesFailed,
    } = useApiQuery<User[]>(["employees"], getEmployees);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            roomId: 0,
            selectedSchedule: "",
            subject: "",
            date: "",
            startTime: "",
            endTime: "",
            participantIds: [],
        },
    });

    const {
        date,
        startTime,
        endTime,
        participantIds,
        roomId,
    } = watch();

    const minCopacity = participantIds.length;

    const hasValidSchedule =
        /^\d{4}-\d{2}-\d{2}$/.test(date) &&
        /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(startTime) &&
        /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(endTime) &&
        endTime > startTime;

    const start = hasValidSchedule
        ? `${date}T${startTime}:00`
        : "";

    const end = hasValidSchedule
        ? `${date}T${endTime}:00`
        : "";

    const {
        data: rooms = [],
        isLoading: roomsLoading,
        isError: roomsFailed,
    } = useApiQuery<Room[]>(
        ["availableRooms", start, end, minCopacity, PAGE, PAGE_SIZE],
        () => getAvailableRooms(start, end, minCopacity, PAGE, PAGE_SIZE)
    );

    const mutation = useApiMutation(
        (booking: CreateBookingInput) => createBookings(booking),
        [["bookings"]]
    );

    const onSubmit = (booking: BookingFormValues) => {
        const currentSchedule =
            `${booking.date}|${booking.startTime}|${booking.endTime}`;

        if (booking.selectedSchedule !== currentSchedule) {
            setValue("roomId", 0, {
                shouldValidate: true,
                shouldDirty: true,
            });

            setValue("selectedSchedule", "");

            alert("פרטי הזמן השתנו. יש לבחור חדר מחדש.");
            return;
        }

        const payload = {
            ...booking,
            start: `${booking.date}T${booking.startTime}:00`,
            end: `${booking.date}T${booking.endTime}:00`,
        } as CreateBookingInput;

        mutation.mutate(payload);
    };

    return (
        <BookingForm
            register={register}
            errors={errors}
            setValue={setValue}
            employees={employees}
            rooms={rooms}
            date={date}
            startTime={startTime}
            endTime={endTime}
            roomId={roomId}
            hasValidSchedule={hasValidSchedule}
            roomsLoading={roomsLoading}
            roomsFailed={roomsFailed}
            employeesLoading={employeesLoading}
            employeesFailed={employeesFailed}
            isPending={mutation.isPending}
            isSuccess={mutation.isSuccess}
            isError={mutation.isError}
            onSubmit={handleSubmit(onSubmit)}
        />
    );
};

export default CreateBooking;
