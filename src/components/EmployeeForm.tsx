import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createEmployee } from "../api/employees";
import { useApiMutation } from "../hooks/useApiMutation";
import type { CreateEmployeeInput } from "../types/domain";

const schema = z.object({
    name: z.string().trim().min(3, "השם חייב להכיל לפחות 3 תווים"),
    email: z.string().trim().email("יש להזין כתובת אימייל תקינה"),
    phone: z
        .string()
        .regex(/^\d{7,10}$/, "יש להזין מספר טלפון בן 7 עד 10 ספרות"),
    address: z.string().trim().min(3, "הכתובת חייבת להכיל לפחות 3 תווים"),
    role: z.enum(["Employee", "Manager", "Admin"], {
        error: "יש לבחור תפקיד",
    }),
});

type FormData = z.infer<typeof schema>;

const EmployeeForm = () => {
    const mutation = useApiMutation(
        (data: CreateEmployeeInput) => createEmployee(data),
        [["employees"]]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            role: "Employee",
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} dir="rtl">
            <label htmlFor="name">שם העובד</label>
            <input id="name" autoComplete="name" {...register("name")} />
            {errors.name && <p role="alert">{errors.name.message}</p>}

            <label htmlFor="email">אימייל</label>
            <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
            />
            {errors.email && <p role="alert">{errors.email.message}</p>}

            <label htmlFor="phone">מספר טלפון</label>
            <input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
            />
            {errors.phone && <p role="alert">{errors.phone.message}</p>}

            <label htmlFor="address">כתובת</label>
            <input
                id="address"
                autoComplete="street-address"
                {...register("address")}
            />
            {errors.address && <p role="alert">{errors.address.message}</p>}

            <label htmlFor="role">תפקיד</label>
            <select id="role" {...register("role")}>
                <option value="Employee">עובד</option>
                <option value="Manager">מנהל חברה</option>
                <option value="Admin">מנהל מערכת</option>
            </select>
            {errors.role && <p role="alert">{errors.role.message}</p>}

            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "מוסיף עובד..." : "הוספת עובד"}
            </button>

            {mutation.isError && (
                <p role="alert">הוספת העובד נכשלה: {mutation.error.message}</p>
            )}
            {mutation.isSuccess && <p role="status">העובד נוסף בהצלחה.</p>}
        </form>
    );
};

export default EmployeeForm;