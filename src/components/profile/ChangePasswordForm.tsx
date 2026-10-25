
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "../../hooks/useApiMutation";
import { changePassword } from "../../api/profile";
import FormField from "../FormField";

const passwordSchema = z.object({
    oldPass: z.string().min(1, "יש להזין סיסמה ישנה"),
    newPass: z.string().min(4, "הסיסמה חייבת להכיל לפחות 4 תווים"),
    checkNewPass: z.string().min(1, "יש לאמת את הסיסמה"),
}).refine(
    (data) => data.newPass === data.checkNewPass,
    {
        message: "הסיסמאות אינן זהות",
        path: ["checkNewPass"],
    }
);

type PasswordForm = z.infer<typeof passwordSchema>;

type ChangePasswordInput = {
    currentPassword: string;
    newPassword: string;
};

type ChangePasswordFormProps = {
    onCancel: () => void;
};

const ChangePasswordForm = ({
    onCancel,
}: ChangePasswordFormProps) => {
    const passwordMutation = useApiMutation(
        (data: ChangePasswordInput) =>
            changePassword(data.currentPassword, data.newPassword)
    );

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPassword,
    } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPass: "",
            newPass: "",
            checkNewPass: "",
        },
    });

    const onPasswordSubmit = (data: PasswordForm) => {
        passwordMutation.mutate(
            {
                currentPassword: data.oldPass,
                newPassword: data.newPass,
            },
            {
                onSuccess: () => {
                    resetPassword();
                    onCancel();
                },
            }
        );
    };

    return (
        <div className="profile-body stack-y">
            <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="form-stack"
            >
                <FormField
                    id="oldPass"
                    label="סיסמה ישנה"
                    type="password"
                    autoComplete="current-password"
                    {...registerPassword("oldPass")}
                    error={passwordErrors.oldPass?.message}
                />

                <FormField
                    id="newPass"
                    label="סיסמה חדשה"
                    type="password"
                    autoComplete="new-password"
                    {...registerPassword("newPass")}
                    error={passwordErrors.newPass?.message}
                />

                <FormField
                    id="checkNewPass"
                    label="אימות סיסמה חדשה"
                    type="password"
                    autoComplete="new-password"
                    {...registerPassword("checkNewPass")}
                    error={passwordErrors.checkNewPass?.message}
                />

                {passwordMutation.isError && (
                    <p role="alert" className="alert-error">
                        שינוי הסיסמה נכשל: {passwordMutation.error.message}
                    </p>
                )}

                {passwordMutation.isSuccess && (
                    <p role="status" className="alert-success">
                        הסיסמה שונתה בהצלחה.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={passwordMutation.isPending}
                    className="btn btn-primary"
                >
                    {passwordMutation.isPending
                        ? "משנה סיסמה..."
                        : "שמירת סיסמה חדשה"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        resetPassword();
                        onCancel();
                    }}
                    disabled={passwordMutation.isPending}
                    className="btn btn-ghost"
                >
                    חזרה לפרופיל
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
