// ניהול עובדים - רשימה, הוספה, חסימה / ביטול חסימה

import { getEmployees } from "../../api/employees";
import EmployeeCard from "../../components/EmployeeCard";
import Message from "../../components/message";
import type { User } from "../../types/domain";
import { useApiQuery } from "../../hooks/useApiQuery";
import QueryMessage from "../../components/QueryMessage ";

const EmployeeManagement = () => {
    const {
        data: employees = [],
        isError,
        isPending,
    } = useApiQuery<User[]>(["employees"], getEmployees);

   const queryMessage =(<QueryMessage errorMessage="טעינת עובדים נכשלה" loadingMessage="טוען הזמנות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage

  

    return (
        <main dir="rtl" className="stack-y">
            <div className="page-head">
                <span className="eyebrow">TEAM</span>
                <h1 className="page-title">ניהול עובדים</h1>
            </div>
            {employees.length === 0 ? (
                <Message message="לא נמצאו עובדים." />
            ) : (
                <div className="card-grid">
                    {employees.map((employee: User) => (
                        <EmployeeCard key={employee.id} {...employee} />
                    ))}
                </div>
            )}
        </main>
    );

};

export default EmployeeManagement;
