import { Controller } from "react-hook-form";
import type {
    Control,
    FieldErrors,
} from "react-hook-form";
import type { BookingFormValues } from "./bookingFormSchema";
import type { User } from "../../types/domain";
import FormField from "../../components/FormField";



type Props = {
    control: Control<BookingFormValues>;
    errors: FieldErrors<BookingFormValues>;
    employees: User[];
};

const BookingParticipants = ({
    control,
    errors,
    employees,
}: Props) => {
    const participantIdsError =
        errors.participantIds?.message ??
        (Array.isArray(errors.participantIds)
            ? errors.participantIds.find(
                  (error) => error?.message
              )?.message
            : undefined);

    return (
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
                        className="input"
                        aria-invalid={Boolean(errors.participantIds)}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value.map(String)}
                        onChange={(e) =>
                            field.onChange(
                                Array.from(
                                    e.target.selectedOptions,
                                    (option) => Number(option.value)
                                )
                            )
                        }
                    >
                        {employees.map((employee) => (
                            <option
                                key={employee.id}
                                value={employee.id}
                            >
                                {employee.name}
                            </option>
                        ))}
                    </select>
                )}
            />
        </FormField>
    );
};

export default BookingParticipants;