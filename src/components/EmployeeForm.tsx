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
            <div className="field">
            <label htmlFor="name" className="field-label">שם העובד</label>
            <input id="name" autoComplete="name" {...register("name")} />
            {errors.name && <p role="alert" className="field-error">{errors.name.message}</p>}
            </div>

            <div className="field">
            <label htmlFor="email" className="field-label">אימייל</label>
            <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
            />
            {errors.email && <p role="alert" className="field-error">{errors.email.message}</p>}
            </div>

            <div className="field">
            <label htmlFor="phone" className="field-label">מספר טלפון</label>
            <input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
            />
            {errors.phone && <p role="alert" className="field-error">{errors.phone.message}</p>}
            </div>

            <div className="field">
            <label htmlFor="address" className="field-label">כתובת</label>
            <input
                id="address"
                autoComplete="street-address"
                {...register("address")}
            />
            {errors.address && <p role="alert" className="field-error">{errors.address.message}</p>}
            </div>

            <div className="field">
            <label htmlFor="password" className="field-label">סיסמה</label>
            <input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
            />
            {errors.password && <p role="alert" className="field-error">{errors.password.message}</p>}
            </div>

            <div className="field">
            <label htmlFor="role" className="field-label">תפקיד</label>
            <select id="role" {...register("role")}>
                <option value="Employee">עובד</option>
                <option value="Manager">מנהל חברה</option>
            </select>
            {errors.role && <p role="alert" className="field-error">{errors.role.message}</p>}
            </div>

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