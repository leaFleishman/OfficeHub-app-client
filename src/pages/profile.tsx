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
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-10"
    >
      <div className="mx-auto max-w-2xl">
        {/* כותרת */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            הפרופיל שלי
          </h1>
          <p className="mt-2 text-slate-500">
            צפייה ועדכון של הפרטים האישיים שלך
          </p>
        </div>

        {/* כרטיס פרופיל */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* אזור עליון */}
          <div className="flex items-center gap-5 bg-gradient-to-l from-blue-700 to-blue-500 px-6 py-8 text-white">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-3xl font-bold shadow-md">
              {user.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>
              <p className="mt-1 text-sm text-blue-100">
                {user.role}
              </p>
            </div>
          </div>

          {/* פרטים אישיים */}
          <div className="space-y-5 p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                פרטים אישיים
              </h3>

              {isEditMode && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  מצב עריכה
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-slate-600"
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
                    className={`w-full rounded-xl border px-4 py-3 text-slate-800 outline-none transition ${isEditMode
                        ? "border-blue-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        : "border-slate-200 bg-slate-50"
                      }`}
                  />
                </div>
              ))}
            </div>

            {/* כפתורים */}
            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
              {isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setConfirmationAction("save")}
                    disabled={mutation.isPending}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {mutation.isPending
                      ? "שומר..."
                      : "שמירת שינויים"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmationAction("cancel")}
                    disabled={mutation.isPending}
                    className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
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
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  עריכת פרופיל
                </button>
              )}
            </div>

            {/* הודעת שגיאה */}
            {mutation.isError && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                שמירת הפרופיל נכשלה: {mutation.error.message}
              </p>
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
