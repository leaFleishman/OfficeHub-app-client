import type { User } from "../../types/domain";


type ProfileForm = Pick<User, "name" | "email"> & {
    phone: string;
    address: string;
};

type ProfileDetailsProps = {
    user: User;
    values: ProfileForm;
    isEditMode: boolean;
    isSaving: boolean;
    onChange: (key: keyof ProfileForm, value: string) => void;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onChangePassword: () => void;
    errorMessage?: string;
};

const fields: { key: keyof ProfileForm; label: string }[] = [
    { key: "name", label: "שם" },
    { key: "phone", label: "טלפון" },
    { key: "address", label: "כתובת" },
    { key: "email", label: "אימייל" },
];

const ProfileDetails = ({
    user,
    values,
    isEditMode,
    isSaving,
    onChange,
    onEdit,
    onSave,
    onCancel,
    onChangePassword,
    errorMessage,
}: ProfileDetailsProps) => {
    return (
        <>
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
                            <label htmlFor={key} className="field-label">
                                {label}
                            </label>

                            <input
                                id={key}
                                type="text"
                                value={values[key]}
                                readOnly={!isEditMode}
                                onChange={(event) =>
                                    onChange(key, event.target.value)
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
                                onClick={onSave}
                                disabled={isSaving}
                                className="btn btn-primary"
                            >
                                {isSaving ? "שומר..." : "שמירת שינויים"}
                            </button>

                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isSaving}
                                className="btn btn-ghost"
                            >
                                ביטול שינויים
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={onEdit}
                            className="btn btn-primary"
                        >
                            עריכת פרופיל
                        </button>
                    )}
                </div>

                {errorMessage && (
                    <p role="alert" className="alert-error">
                        שמירת הפרופיל נכשלה: {errorMessage}
                    </p>
                )}
            </div>

            <div className="profile-body">
                <button
                    type="button"
                    onClick={onChangePassword}
                    className="btn btn-ghost"
                >
                    שינוי סיסמה
                </button>
            </div>
        </>
    );
};

export default ProfileDetails;
