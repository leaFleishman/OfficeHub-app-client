import { useState } from "react";
import { blockUser, getEmployeeById } from "../api/employees";
import { useApiQuery } from "../hooks/useApiQuery";
import type { User } from "../types/domain";
import { useApiMutation } from "../hooks/useApiMutation";
import ConfirmDialog from "./ConfirmDialog";

const EmployeeCard = (user: User) => {
    const { id, isBlocked, phone, email, name } = user;
    const [showDetails, setShowDetails] = useState(false);
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
    const mutation = useApiMutation(
        (employeeId: number) => blockUser(employeeId),
        [["employees"]]
    );

    const {
        isLoading,
        isError,
        data: employee,
        error,
    } = useApiQuery<User>(
        ["employees", id],
        () => getEmployeeById(id),
        { enabled: showDetails }
    );
    const details = employee ?? user;

    return (
        <div className="card card-hover" dir="rtl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="avatar avatar-md">
                        {name?.charAt(0)}
                    </div>

                    <div className="min-w-0">
                        <h3 className="card-heading truncate">
                            {name}
                        </h3>
                        <p className="card-caption mt-1">
                            מזהה עובד: {id}
                        </p>
                    </div>
                </div>

                <span
                    className={`badge ${
                        isBlocked
                            ? "badge-danger"
                            : "badge-ok"
                    }`}
                >
                    <span className="badge-dot" />
                    {isBlocked ? "חסום" : "פעיל"}
                </span>
            </div>

            <div className="info-grid mt-5">
                <div className="info-tile">
                    <p className="info-label">טלפון</p>
                    <p dir="ltr" className="info-value ltr-value">
                        {phone ?? "לא צוין"}
                    </p>
                </div>

                <div className="info-tile">
                    <p className="info-label">אימייל</p>
                    <p dir="ltr" className="info-value ltr-value">
                        {email}
                    </p>
                </div>
            </div>

            <div className="row-actions divider">
                <button
                    type="button"
                    aria-expanded={showDetails}
                    onClick={() => setShowDetails((current) => !current)}
                    className="btn btn-sm"
                >
                    {showDetails ? "סגירת פרטים" : "הצגת פרטים"}
                </button>

                {!isBlocked && (
                    <button
                        type="button"
                        onClick={() => setIsBlockDialogOpen(true)}
                        disabled={mutation.isPending}
                        className="btn btn-danger btn-sm"
                    >
                        {mutation.isPending ? "חוסם..." : "חסימת עובד"}
                    </button>
                )}
            </div>

            {showDetails && (
                <div className="info-tile mt-5" style={{ padding: "1.1rem" }}>
                    <h4 className="card-heading mb-4">
                        פרטי העובד
                    </h4>

                    {isLoading && (
                        <p className="card-caption py-2">
                            טוען פרטי עובד...
                        </p>
                    )}

                    {isError && (
                        <p role="alert" className="alert-error mb-3">
                            טעינת פרטי העובד נכשלה
                            {error instanceof Error ? `: ${error.message}` : ""}
                        </p>
                    )}

                    <div className="info-grid">
                        <div className="info-tile">
                            <p className="info-label">שם</p>
                            <p className="info-value">{details.name}</p>
                        </div>

                        <div className="info-tile">
                            <p className="info-label">מזהה</p>
                            <p className="info-value">{details.id}</p>
                        </div>

                        <div className="info-tile">
                            <p className="info-label">חברה</p>
                            <p className="info-value">
                                {details.companyId ?? "לא משויך"}
                            </p>
                        </div>

                        <div className="info-tile">
                            <p className="info-label">תאריך יצירה</p>
                            <p className="info-value">
                                {details.createdAt}
                            </p>
                        </div>

                        <div className="info-tile">
                            <p className="info-label">תפקיד</p>
                            <p className="info-value">{details.role}</p>
                        </div>

                        <div className="info-tile">
                            <p className="info-label">טלפון</p>
                            <p dir="ltr" className="info-value ltr-value">
                                {details.phone ?? "לא צוין"}
                            </p>
                        </div>

                        <div className="info-tile span-2">
                            <p className="info-label">אימייל</p>
                            <p dir="ltr" className="info-value ltr-value">
                                {details.email}
                            </p>
                        </div>

                        <div className="info-tile span-2">
                            <p className="info-label">סטטוס</p>
                            <p className={`info-value ${
                                details.isBlocked ? "badge-danger" : "badge-ok"
                            }`} style={{ background: "none", border: 0, padding: 0 }}>
                                {details.isBlocked ? "חסום" : "פעיל"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {mutation.isError && (
                <p role="alert" className="alert-error mt-4">
                    חסימת העובד נכשלה: {mutation.error.message}
                </p>
            )}

            <ConfirmDialog
                isOpen={isBlockDialogOpen}
                title="חסימת עובד"
                message={`האם לחסום את ${name}?`}
                confirmText="כן, לחסום"
                cancelText="ביטול"
                onConfirm={() =>
                    mutation.mutate(id, {
                        onSuccess: () => setIsBlockDialogOpen(false),
                    })
                }
                onCancel={() => setIsBlockDialogOpen(false)}
                isLoading={mutation.isPending}
            />
        </div>
    );
};

export default EmployeeCard;