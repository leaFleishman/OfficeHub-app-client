import { getMyCompany } from "../api/companies";
import { getEmployeeById, getEmployees } from "../api/employees";
import { useAuth } from "../auth/useAuth";
import { useApiQuery } from "../hooks/useApiQuery";
import type { User } from "../types/domain";
import Company from "./Company";
import CompanyForm from "./CompanyForm";
import EmployeeCard from "./EmployeeCard";
import QueryMessage from "./QueryMessage ";
import { useState } from "react";
import { useApiMutation } from "../hooks/useApiMutation";
import Search from "./search";

const MyCompany = () => {
    const { user } = useAuth()
    const companyId = user?.companyId
    const [editMode, setEditMode] = useState(false)
    const [search, setSearh] = useState("")

    const {
        isError: companyIsError,
        isPending: companyIsPending,
        data: myCompany,
    } = useApiQuery(
        ["companies", companyId],
        () => getMyCompany()
    );
    const {
        data: employees = [],
        isError: employeesIsError,
        isPending: employeesIsPending,
    } = useApiQuery<User[]>(["employees"], getEmployees);

    if (companyIsPending) {
        return (
            <QueryMessage
                errorMessage="טעינת החברה נכשלה"
                loadingMessage="טוען חברה..."
                isError={companyIsError}
                isPending={companyIsPending}
            />
        );
    }

    if (companyIsError || !myCompany) {
        return (
            <QueryMessage
                errorMessage="טעינת החברה נכשלה"
                loadingMessage="טוען חברה..."
                isError={true}
                isPending={false}
            />
        );
    }

    if (employeesIsPending) {
        return (
            <QueryMessage
                errorMessage="טעינת עובדים נכשלה"
                loadingMessage="טוען עובדים..."
                isError={employeesIsError}
                isPending={employeesIsPending}
            />
        );
    }

    if (employeesIsError) {
        return (
            <QueryMessage
                errorMessage="טעינת עובדים נכשלה"
                loadingMessage="טוען עובדים..."
                isError={true}
                isPending={false}
            />
        );
    }
    return (
        <div dir="rtl" className="stack-y">
            <h2 className="section-title">החברה שלי</h2>
            <div>
                <Company company={myCompany} />
                <button onClick={() => setEditMode(true)}>ערכת פרטי החברה</button>
                {editMode && (<CompanyForm company={myCompany}></CompanyForm>)}
            </div>
            <h2 className="section-title">העובדים שלנו</h2>
            <p>חיפוד לפי מזהה</p>
            <Search search={search} onSearchChange={setSearh}></Search>
            <div className="card-grid">
                {
                    employees
                        .filter((employee) => {
                            const searchText = search.trim().toLowerCase();

                            return (
                                String(employee.id).includes(searchText)

                            );
                        }).map((employee: User) => (
                            <EmployeeCard
                                key={employee.id}
                                {...employee}
                            />
                        ))
                }
            </div>
        </div>
    );
};

export default MyCompany;