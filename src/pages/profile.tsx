import { useState } from "react";
import { updateProfile } from "../api/profile";
import ConfirmDialog from "../components/ConfirmDialog";
import { useApiMutation } from "../hooks/useApiMutation";
import { useAuth } from "../auth/useAuth";
import type { User } from "../types/domain";
import Message from "../components/message";

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

const Profile = () => {
  const { user, isLoading, updateUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [draft, setDraft] = useState<ProfileForm | null>(null);
  const [confirmationAction, setConfirmationAction] =
    useState<ConfirmationAction>(null);

  const mutation = useApiMutation((data: ProfileForm) =>
    updateProfile(data.name, data.email, data.phone || null, data.address || null)
  );

  if (isLoading) return <Message message="טוען..."></Message>
  if (!user) return <Message message="יש להתחבר לפני הצפייה בפרופיל"></Message>

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
    <main dir="rtl">
      <h1>פרופיל</h1>

      {fields.map(({ key, label }) => (
        <div key={key}>
          <label htmlFor={key}>{label}</label>
          <input
            id={key}
            type="text"
            value={values[key]}
            readOnly={!isEditMode}
            onChange={(event) =>
              setDraft({ ...values, [key]: event.target.value })
            }
          />
        </div>
      ))}

      {isEditMode ? (
        <>
          <button
            type="button"
            onClick={() => setConfirmationAction("save")}
            disabled={mutation.isPending}
          >
            שמירת שינויים
          </button>
          <button
            type="button"
            onClick={() => setConfirmationAction("cancel")}
            disabled={mutation.isPending}
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
        >
          עריכת פרופיל
        </button>
      )}

      {mutation.isError && (
        <p role="alert">שמירת הפרופיל נכשלה: {mutation.error.message}</p>
      )}

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
        confirmText={confirmationAction === "save" ? "שמירה" : "כן, לבטל"}
        cancelText="חזרה"
        onConfirm={confirmAction}
        onCancel={() => setConfirmationAction(null)}
        isLoading={mutation.isPending}
      />
    </main>
  );
};

export default Profile;
