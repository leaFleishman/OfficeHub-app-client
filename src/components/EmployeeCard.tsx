import { useState } from "react";
import { blockUser, getEmployeeById } from "../api/employees";
import { useApiQuery } from "../hooks/useApiQuery";
import type { User } from "../types/domain";
import { useApiMutation } from "../hooks/useApiMutation";
import ConfirmDialog from "./ConfirmDialog";

const Employee = (user: User) => {
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
        <div>
            <div>{id}</div>
            <div>{phone}</div>
            <div>{email}</div>
            <div>{isBlocked ? "חסום" : "פעיל"}</div>

            <button
                type="button"
                aria-expanded={showDetails}
                onClick={() => setShowDetails((current) => !current)}
            >
                {showDetails ? "סגירת פרטים" : "פרטים"}
            </button>

            {showDetails && (
                <div>
                    {isLoading && <p>טוען פרטי עובד...</p>}

                    {isError && (
                        <p>
                            טעינת פרטי העובד נכשלה
                            {error instanceof Error ? `: ${error.message}` : ""}
                        </p>
                    )}

                    <div>
                        <p>שם: {details.name}</p>
                        <p>מזהה: {details.id}</p>
                        <p>חברה: {details.companyId ?? "לא משויך"}</p>
                        <p>נוצר בתאריך: {details.createdAt}</p>
                        <p>תפקיד: {details.role}</p>
                        <p>טלפון: {details.phone ?? "לא צוין"}</p>
                        <p>אימייל: {details.email}</p>
                        <p>{details.isBlocked ? "חסום" : "פעיל"}</p>
                    </div>
                </div>
            )}
            {!isBlocked && (
                <button
                    type="button"
                    onClick={() => setIsBlockDialogOpen(true)}
                    disabled={mutation.isPending}
                >
                    חסימת עובד
                </button>
            )}

            {mutation.isError && (
                <p role="alert">חסימת העובד נכשלה: {mutation.error.message}</p>
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

export default Employee;