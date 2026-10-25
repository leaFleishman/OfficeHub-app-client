
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCompany, updateCompany } from "../api/companies";
import { useApiMutation } from "../hooks/useApiMutation";
import type { Company } from "../types/domain";
import FormField from "./FormField";

const schema = z.object({
    name: z.string().trim().min(3, "שם החברה חייב להכיל לפחות 3 תווים"),
    floor: z.number().int("יש להזין מספר קומה שלם"),
    phone: z
        .string()
        .regex(/^\d{7,10}$/, "יש להזין מספר טלפון בן 7 עד 10 ספרות"),
    managerName: z.string().trim().min(2, "יש להזין שם מנהל"),
    managerEmail: z.string().email("כתובת אימייל לא תקינה"),
    managerPassword: z.string().min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
});

type FormData = z.infer<typeof schema>;

type CompanyFormProps = {
    company?: Company;
};

const CompanyForm = ({ company }: CompanyFormProps) => {
    const mutation = useApiMutation(
        (data: FormData) => {
            if (company) {
                return updateCompany(
                    data.name,
                    data.floor,
                    data.phone
                );
            }

            return createCompany(
                data.name,
                data.floor,
                data.phone
                , {
                    name: data.managerName,
                    email: data.managerEmail,
                    password: data.managerPassword,
                }
            );
        },
        [["companies"]]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: company?.name ?? "",
            floor: company?.floor ?? 0,
            phone: company?.phone ?? "",
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="card form-card" dir="rtl">
            <div className="page-head" style={{ marginBottom: "1.5rem" }}>
                <span className="eyebrow">
                    {company ? "EDIT COMPANY" : "NEW COMPANY"}
                </span>

                <h1 className="page-title">
                    {company ? "עריכת פרטי חברה" : "הוספת חברה"}
                </h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-stack"
            >
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
                    {...register("floor", {
                        valueAsNumber: true,
                    })}
                />

                <FormField
                    id="company-phone"
                    label="מספר טלפון"
                    type="tel"
                    autoComplete="tel"
                    error={errors.phone?.message}
                    {...register("phone")}
                />
                {!company&&<>

                <FormField id="managerName" label="שם מנהל חברה" type="text" autoComplete="managerName" error={errors.managerName?.message} {...register("managerName")}></FormField>
                <FormField id="managerEmail" label="מייל מנהל החברה" type="email" autoComplete="email" error={errors.managerEmail?.message} {...register("managerEmail")}></FormField>
                <FormField id="managerPassword" label="text" type="password" autoComplete="password" error={errors.managerPassword?.message} {...register("managerPassword")}></FormField>
                </>}

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="btn btn-primary btn-lg btn-block"
                >
                    {mutation.isPending
                        ? company
                            ? "שומר שינויים..."
                            : "מוסיף חברה..."
                        : company
                            ? "שמירת שינויים"
                            : "הוספת חברה"}
                </button>

                {mutation.isError && (
                    <p role="alert" className="alert-error">
                        {company
                            ? "עדכון החברה נכשל: "
                            : "הוספת החברה נכשלה: "}
                        {mutation.error.message}
                    </p>
                )}

                {mutation.isSuccess && (
                    <p role="status" className="alert-success">
                        {company
                            ? "פרטי החברה עודכנו בהצלחה."
                            : "החברה נוספה בהצלחה."}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CompanyForm;
