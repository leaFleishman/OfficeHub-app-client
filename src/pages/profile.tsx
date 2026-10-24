import { useState } from "react";
import { changePassword, updateProfile } from "../api/profile";
import ConfirmDialog from "../components/ConfirmDialog";
import { useApiMutation } from "../hooks/useApiMutation";
import { useAuth } from "../auth/useAuth";
import type { User } from "../types/domain";
import Message from "../components/message";
import FormField from "../components/FormField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileForm = Pick<User, "name" | "email"> & {
    phone: string;
    address: string;
};

type ConfirmationAction = "save" | "cancel" | null;

const fields: { key: keyof ProfileForm; label: string }[] = [
    { key: "name", label: "שם" },
    { key: "phone", label: "טלפון" },
    { key: "address", label: "כתובת" },
    { key: "email", label: "אימייל" },
];

const toForm = (user: User): ProfileForm => ({
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    address: user.address ?? "",
});

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

const Profile = () => {
    const { user, isLoading, updateUser } = useAuth();

    const [isEditMode, setIsEditMode] = useState(false);
    const [draft, setDraft] = useState<ProfileForm | null>(null);
    const [confirmationAction, setConfirmationAction] =
        useState<ConfirmationAction>(null);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    // עדכון פרטי הפרופיל
    const mutation = useApiMutation((data: ProfileForm) =>
        updateProfile(
            data.name,
            data.email,
            data.phone || null,
            data.address || null
        )
    );

    // שינוי סיסמה
    const passwordMutation = useApiMutation(
        (data: ChangePasswordInput) =>
            changePassword(data.currentPassword, data.newPassword)
    );

    // טופס שינוי סיסמה
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

    // כל ה-Hooks מוגדרים לפני תנאי היציאה
    if (isLoading) {
        return <Message message="טוען..." />;
    }

    if (!user) {
        return <Message message="יש להתחבר לפני הצפייה בפרופיל" />;
    }

    const values = isEditMode && draft ? draft : toForm(user);

    // שמירת פרטי הפרופיל
    const confirmAction = () => {
        if (confirmationAction === "cancel") {
            setDraft(null);
            setIsEditMode(false);
            setConfirmationAction(null);
            return;
        }

        if (confirmationAction === "save" && draft) {
            mutation.mutate(draft, {
                onSuccess: (updatedUser) => {
                    updateUser(updatedUser);
                    setDraft(null);
                    setIsEditMode(false);
                    setConfirmationAction(null);
                },
            });
        }
    };

    // שמירת הסיסמה החדשה
    const onPasswordSubmit = (data: PasswordForm) => {
        passwordMutation.mutate(
            {
                currentPassword: data.oldPass,
                newPassword: data.newPass,
            },
            {
                onSuccess: () => {
                    setIsChangePasswordOpen(false);
                    resetPassword();
                },
            }
        );
    };

    return (
        <main dir="rtl" className="page-narrow stack-y">
            <div className="page-narrow stack-y">
                <div className="page-head">
                    <span className="eyebrow">PROFILE</span>
                    <h1 className="page-title">הפרופיל שלי</h1>
                    <p className="page-sub">
                        צפייה ועדכון של הפרטים האישיים שלך
                    </p>
                </div>

                <section className="card card-flush">
                    <div className="profile-banner">
                        <div className="avatar avatar-lg">
                            {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                        </div>

                        <div>
                            <h2 className="card-heading">{user.name}</h2>
                            <p className="user-role mt-1">{user.role}</p>
                        </div>
                    </div>

                    <div className="profile-body">
                        <div className="flex items-center justify-between">
                            <h3 className="section-title">פרטים אישיים</h3>

                            {isEditMode && (
                                <span className="badge badge-warn">
                                    <span className="badge-dot"></span>
                                    מצב עריכה
                                </span>
                            )}
                        </div>

                        <div className="form-grid">
                            {fields.map(({ key, label }) => (
                                <div key={key} className="field">
                                    <label
                                        htmlFor={key}
                                        className="field-label"
                                    >
                                        {label}
                                    </label>

                                    <input
                                        id={key}
                                        type="text"
                                        value={values[key]}
                                        readOnly={!isEditMode}
                                        onChange={(event) =>
                                            setDraft({
                                                ...values,
                                                [key]: event.target.value,
                                            })
                                        }
                                        className={`input ${
                                            isEditMode
                                                ? "input-editing"
                                                : "input-readonly"
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="row-actions divider">
                            {isEditMode ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setConfirmationAction("save")
                                        }
                                        disabled={mutation.isPending}
                                        className="btn btn-primary"
                                    >
                                        {mutation.isPending
                                            ? "שומר..."
                                            : "שמירת שינויים"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setConfirmationAction("cancel")
                                        }
                                        disabled={mutation.isPending}
                                        className="btn btn-ghost"
                                    >
                                        ביטול שינויים
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDraft(toForm(user));
                                        setIsEditMode(true);
                                    }}
                                    className="btn btn-primary"
                                >
                                    עריכת פרופיל
                                </button>
                            )}
                        </div>

                        {mutation.isError && (
                            <p role="alert" className="alert-error">
                                שמירת הפרופיל נכשלה:{" "}
                                {mutation.error.message}
                            </p>
                        )}
                    </div>

                    <div className="profile-body stack-y">
                        <button
                            type="button"
                            onClick={() => {
                                resetPassword();
                                setIsChangePasswordOpen((open) => !open);
                            }}
                            className="btn btn-ghost"
                        >
                            {isChangePasswordOpen
                                ? "סגירת טופס שינוי סיסמה"
                                : "שינוי סיסמה"}
                        </button>

                        {isChangePasswordOpen && (
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
                                        שינוי הסיסמה נכשל:{" "}
                                        {passwordMutation.error.message}
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
                                        setIsChangePasswordOpen(false);
                                    }}
                                    disabled={passwordMutation.isPending}
                                    className="btn btn-ghost"
                                >
                                    ביטול
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </div>

            <ConfirmDialog
                isOpen={confirmationAction !== null}
                title={
                    confirmationAction === "save"
                        ? "שמירת שינויים"
                        : "ביטול שינויים"
                }
                message={
                    confirmationAction === "save"
                        ? "לשמור את השינויים בפרופיל?"
                        : "לבטל את השינויים ולחזור לפרטים הקודמים?"
                }
                confirmText={
                    confirmationAction === "save" ? "שמירה" : "כן, לבטל"
                }
                cancelText="חזרה"
                onConfirm={confirmAction}
                onCancel={() => setConfirmationAction(null)}
                isLoading={mutation.isPending}
            />
        </main>
    );
};

export default Profile;