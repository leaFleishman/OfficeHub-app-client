import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCompany } from "../api/companies";
import { useApiMutation } from "../hooks/useApiMutation";
import FormField from "./FormField";

const schema = z.object({
    name: z.string().trim().min(3, "שם החברה חייב להכיל לפחות 3 תווים"),
    floor: z.number().int("יש להזין מספר קומה שלם"),
    phone: z .string() .regex(/^\d{7,10}$/, "יש להזין מספר טלפון בן 7 עד 10 ספרות"),

      
});

type FormData = z.infer<typeof schema>;

const CompanyForm = () => {
    const mutation = useApiMutation(
        (data: FormData) => createCompany(data.name, data.floor, data.phone),
        [["companies"]]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            floor: 0,
            phone: "",
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} dir="rtl">
            <FormField
                id="company-name"
                label="שם החברה"
                autoComplete="organization"
                error={errors.name?.message}
                {...register("name")}
            />

            <FormField
                id="company-floor"
                label="קומה"
                type="number"
                error={errors.floor?.message}
                {...register("floor", { valueAsNumber: true })}
            />

            <FormField
                id="company-phone"
                label="מספר טלפון"
                type="tel"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register("phone")}
            />

            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "מוסיף חברה..." : "הוספת חברה"}
            </button>

            {mutation.isError && (
                <p role="alert">הוספת החברה נכשלה: {mutation.error.message}</p>
            )}
            {mutation.isSuccess && <p role="status">החברה נוספה בהצלחה.</p>}
        </form>
    );
};

export default CompanyForm;