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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
                {mutation.isPending ? "שולח..." : "שליחת פנייה"}
            </button>

            {mutation.isError && (
                <p className="text-red-600">שליחת הפנייה נכשלה</p>
            )}
        </form>
    );
};

export default NewInquiryForm;