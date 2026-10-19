// ניהול עובדים - רשימה, הוספה, חסימה / ביטול חסימה

import { getEmployees } from "../../api/employees";
import EmployeeCard from "../../components/EmployeeCard";
import Message from "../../components/message";
import type { User } from "../../types/domain";
import { useApiQuery } from "../../hooks/useApiQuery";

const EmployeeManagement = () => {
    const {
        data: employees = [],
        isError,
        isLoading,
        error,
    } = useApiQuery<User[]>(["employees"], getEmployees);

    if (isLoading) {
        return <Message message="טוען עובדים..." />;
    }

    if (isError) {
        return <Message message={`טעינת העובדים נכשלה: ${error.message}`} />;
    }

    const addEmp = () => {

    }

    return (
        <main dir="rtl" className="mx-auto w-full max-w-6xl p-4">
            <h1>ניהול עובדים</h1>
            <button onClick={addEmp}>הוסף עובד</button>
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
