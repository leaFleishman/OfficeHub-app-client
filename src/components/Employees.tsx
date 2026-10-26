import { useState } from "react";
import { useApiQuery } from "../hooks/useApiQuery";
import { getEmployees } from "../api/employees";
import Search from "./search";
import type { User } from "../types/domain";
import EmployeeCard from "./EmployeeCard";
import QueryMessage from "./QueryMessage ";

const Employees = () => {
    const [search, setSearch] = useState("");
    const {
        data: employees = [],
        isError: employeesIsError,
        isPending: employeesIsPending,
    } = useApiQuery<User[]>(["employees"], getEmployees);

    


    if (employeesIsPending || employeesIsError) {
        return (
            <QueryMessage errorMessage="טעינת עובדים נכשלה" loadingMessage="טוען עובדים..." isError={employeesIsError} isPending={employeesIsPending} />
        );
    }
    return (<>
        <h2 className="section-title">העובדים שלנו</h2>
        <p>חיפוש לפי מזהה עובד</p>
        <Search search={search} onSearchChange={setSearch} />
        <div className="card-grid">
            {employees
                .filter((employee) => String(employee.id).includes(search.trim()))
                .map((employee: User) => <EmployeeCard key={employee.id} {...employee} />)}
        </div>
    </>)
}
export default Employees