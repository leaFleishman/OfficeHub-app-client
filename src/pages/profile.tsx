
import { useState } from "react";
import { updateProfile } from "../api/profile";
import ConfirmDialog from "../components/ConfirmDialog";
import { useApiMutation } from "../hooks/useApiMutation";
import { useAuth } from "../auth/useAuth";
import type { User } from "../types/domain";
import QueryMessage from "../components/QueryMessage ";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import ProfileDetails from "../components/profile/ProfileDetails";


type ProfileForm = Pick<User, "name" | "email"> & {
    phone: string;
    address: string;
};

type ConfirmationAction = "save" | "cancel" | null;

const toForm = (user: User): ProfileForm => ({
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    address: user.address ?? "",
});

const Profile = () => {
    const { user, isLoading, updateUser } = useAuth();

    const [isEditMode, setIsEditMode] = useState(false);
    const [draft, setDraft] = useState<ProfileForm | null>(null);
    const [confirmationAction, setConfirmationAction] =
        useState<ConfirmationAction>(null);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const mutation = useApiMutation((data: ProfileForm) =>
        updateProfile(
            data.name,
            data.email,
            data.phone || null,
            data.address || null
        )
    );

    if (isLoading || !user) {
        return (
            <QueryMessage
                isPending={isLoading}
                isError={!user}
                loadingMessage="טוען..."
                errorMessage="יש להתחבר לפני הצפייה בפרופיל"
            />
        );
    }

    const values = isEditMode && draft ? draft : toForm(user);

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
                    {isChangePasswordOpen ? (
                        <ChangePasswordForm
                            onCancel={() => setIsChangePasswordOpen(false)}
                        />
                    ) : (
                        <ProfileDetails
                            user={user}
                            values={values}
                            isEditMode={isEditMode}
                            isSaving={mutation.isPending}
                            errorMessage={
                                mutation.isError
                                    ? mutation.error.message
                                    : undefined
                            }
                            onChange={(key, value) => {
                                setDraft({
                                    ...values,
                                    [key]: value,
                                });
                            }}
                            onEdit={() => {
                                setDraft(toForm(user));
                                setIsEditMode(true);
                            }}
                            onSave={() => setConfirmationAction("save")}
                            onCancel={() => setConfirmationAction("cancel")}
                            onChangePassword={() => {
                                setIsChangePasswordOpen(true);
                            }}
                        />
                    )}
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
