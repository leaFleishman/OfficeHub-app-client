// ניהול עובדים - רשימה, הוספה, חסימה / ביטול חסימה

import { useState } from "react";
import { getEmployees } from "../../api/employees";
import EmployeeCard from "../../components/EmployeeCard";
import Message from "../../components/message";
import type { User } from "../../types/domain";
import { useApiQuery } from "../../hooks/useApiQuery";
import QueryMessage from "../../components/QueryMessage ";
import Search from "../../components/search";

const EmployeeManagement = () => {
    const {
        data: employees = [],
        isError,
        isPending,
    } = useApiQuery<User[]>(["employees"], getEmployees);

    const [search, setSearch] = useState("");

    const queryMessage = (
        <QueryMessage
            errorMessage="טעינת עובדים נכשלה"
            loadingMessage="טוען עובדים..."
            isError={isError}
            isPending={isPending}
        />
    );

    if (isPending || isError||!employees) {
        return queryMessage;
    }

    const filteredEmployees = employees.filter((employee) => {
        return String(employee.id).includes(search.trim());
    });

    return (
        <main dir="rtl" className="stack-y">
            <div className="page-head">
                <span className="eyebrow">TEAM</span>
                <h1 className="page-title">ניהול עובדים</h1>
            </div>

            {employees.length === 0 ? (
                <Message message="לא נמצאו עובדים." />
            ) : (
                <>
                <p>חיפוש לפי מזהה עובד</p>
                    <Search
                        search={search}
                        onSearchChange={setSearch}
                    />

                    {filteredEmployees.length === 0 ? (
                        <Message message="לא נמצאו עובדים התואמים לחיפוש." />
                    ) : (
                        <div className="card-grid">
                            {filteredEmployees.map((employee: User) => (
                                <EmployeeCard
                                    key={employee.id}
                                    {...employee}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default EmployeeManagement;