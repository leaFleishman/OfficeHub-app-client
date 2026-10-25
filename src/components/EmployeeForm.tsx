import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createEmployee } from "../api/employees";
import { useApiMutation } from "../hooks/useApiMutation";
import type { CreateEmployeeInput } from "../types/domain";
import FormField from "./FormField";

const schema = z.object({
    name: z.string().trim().min(3, "השם חייב להכיל לפחות 3 תווים"),
    email: z.string().trim().email("יש להזין כתובת אימייל תקינה"),
    phone: z
        .string()
        .regex(/^\d{7,10}$/, "יש להזין מספר טלפון בן 7 עד 10 ספרות"),
    address: z.string().trim().min(3, "הכתובת חייבת להכיל לפחות 3 תווים"),
    password: z.string().min(4, "הסיסמה חייבת להכיל לפחות 4 תווים"),
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
            password: "",
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="card form-card">
        <div className="page-head" style={{ marginBottom: "1.5rem" }}>
            <span className="eyebrow">NEW EMPLOYEE</span>
            <h1 className="page-title">הוספת עובד</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} dir="rtl" className="form-stack">
            <FormField
                id="name"
                label="שם העובד"
                autoComplete="name"
                error={errors.name?.message}
                {...register("name")}
            />

            <FormField
                id="email"
                label="אימייל"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
            />

            <FormField
                id="phone"
                label="מספר טלפון"
                type="tel"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register("phone")}
            />

            <FormField
                id="address"
                label="כתובת"
                autoComplete="street-address"
                error={errors.address?.message}
                {...register("address")}
            />

            <FormField
                id="password"
                label="סיסמה"
                type="password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
            />

            <FormField
                id="role"
                label="תפקיד"
                error={errors.role?.message}
            >
                <select id="role" {...register("role")}>
                    <option value="Employee">עובד</option>
                    <option value="Manager">מנהל חברה</option>
                </select>
            </FormField>

            <button type="submit" disabled={mutation.isPending} className="btn btn-primary btn-lg btn-block">
                {mutation.isPending ? "מוסיף עובד..." : "הוספת עובד"}
            </button>

            {mutation.isError && (
                <p role="alert" className="alert-error">הוספת העובד נכשלה: {mutation.error.message}</p>
            )}
            {mutation.isSuccess && <p role="status" className="alert-success">העובד נוסף בהצלחה.</p>}
        </form>
        </div>
    );
};

export default EmployeeForm;