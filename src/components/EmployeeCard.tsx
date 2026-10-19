import { useState } from "react";

import { getEmployeeById } from "../api/employees";
import { useApiQuery } from "../hooks/useApiQuery";
import type { User } from "../types/domain";

const Employee = (user: User) => {
    const { id, isBlocked, phone, email } = user;
    const [showDetails, setShowDetails] = useState(false);

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
        </div>
    );
};

export default Employee;