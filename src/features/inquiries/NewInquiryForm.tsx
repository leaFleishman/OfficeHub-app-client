import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useApiMutation } from "../../hooks/useApiMutation";
import { AddInquiries } from "../../api/inquiries";
import FormField from "../../components/FormField";

// פנייה חדשה - POST /inquiries

const schema = z.object({
    subject: z.string().min(3, "נושא חייב להכיל לפחות 3 תווים"),
    content: z.string().min(4, "לפחות 4 תווים"),
});

type FormData = z.infer<typeof schema>;

const NewInquiryForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const mutation = useApiMutation(
        (data: FormData) => AddInquiries(data.subject, data.content),
        [["inquiries"]]
    );

    const onSubmit = (data: FormData) => {
        mutation.mutate(data, {
            onSuccess: () => navigate("/home"),
        });
    };

    return (
        <div className="card form-card">
        <div className="page-head" style={{ marginBottom: "1.5rem" }}>
            <span className="eyebrow">NEW INQUIRY</span>
            <h1 className="page-title">פנייה חדשה</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form-stack" dir="rtl">
            <FormField
                id="sub"
                label="נושא"
                error={errors.subject?.message ?? ""}
                {...register("subject")}
            />

            <FormField
                id="con"
                label="תוכן הפנייה"
                error={errors.content?.message ?? ""}
                {...register("content")}
            />

            <button
                type="submit"
                disabled={mutation.isPending}
                className="btn btn-primary btn-lg btn-block"
            >
                {mutation.isPending ? "שולח..." : "שליחת פנייה"}
            </button>

            {mutation.isError && (
                <p className="alert-error">שליחת הפנייה נכשלה</p>
            )}
        </form>
        </div>
    );
};

export default NewInquiryForm;