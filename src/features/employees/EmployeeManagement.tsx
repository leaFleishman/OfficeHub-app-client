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
        error,
    } = useApiQuery<User[]>(["employees"], getEmployees);

   const queryMessage =(<QueryMessage errorMessage="טעינת עובדים נכשלה" loadingMessage="טוען הזמנות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage

  

    return (
        <main dir="rtl" className="mx-auto w-full max-w-6xl p-4">
            <h1>ניהול עובדים</h1>
            {employees.length === 0 ? (
                <Message message="לא נמצאו עובדים." />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {employees.map((employee: User) => (
                        <EmployeeCard key={employee.id} {...employee} />
                    ))}
                </div>
            )}
        </main>
    );

};

export default EmployeeManagement;
