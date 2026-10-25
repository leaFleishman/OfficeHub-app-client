import { useState } from "react";
import { getCompanies } from "../api/companies";
import { useApiQuery } from "../hooks/useApiQuery";
import type { Company as CompanyData } from "../types/domain";
import ConfirmDialog from "./ConfirmDialog";
import QueryMessage from "./QueryMessage ";
import { deleteCompany } from "../api/companies";
import { useApiMutation } from "../hooks/useApiMutation";
import { useNavigate } from "react-router-dom";

interface CompanyProps {
    company: CompanyData
}

const Company = ({ company }: CompanyProps) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const navigate=useNavigate()

    const mutate=useApiMutation((id:number)=>deleteCompany(id),[["companies"]])

return (
    <>
        <div
            dir="rtl"
            className="card card-hover"
        >
            <div className="card-title-row">
                <div className="card-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 21h16.5M4.5 21V5.25A2.25 2.25 0 0 1 6.75 3h10.5A2.25 2.25 0 0 1 19.5 5.25V21M9 7.5h.008v.008H9V7.5Zm0 3h.008v.008H9V10.5Zm0 3h.008v.008H9v-.008Zm6-6h.008v.008H15V7.5Zm0 3h.008v.008H15V10.5Zm0 3h.008v.008H15v-.008ZM9 21v-3.75h6V21"
                        />
                    </svg>
                </div>

                <div>
                    <h2 className="card-heading">
                        {company.name}
                    </h2>
                    <p className="card-caption">
                        פרטי החברה
                    </p>
                </div>
            </div>

            <div className="stack-y" style={{ gap: "0.75rem" }}>
                <div className="info-tile">
                    <p className="info-label">
                        תאריך הקמה
                    </p>
                    <p className="info-value">
                        {company.createdAt}
                    </p>
                </div>

                <div className="info-tile">
                    <p className="info-label">
                        טלפון מנהל
                    </p>
                    <p className="info-value">
                        {company.phone}
                    </p>
                </div>

                <div className="info-tile info-tile--accent">
                    <p className="info-label">
                        קומה
                    </p>
                    <p className="info-value info-value--big">
                        {company.floor}
                    </p>
                </div>
            </div>
            <div className="row-actions divider">
                <button
                    type="button"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="btn btn-danger btn-sm"
                >
                    מחיקת החברה
                </button>
            </div>
        </div>
        <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            title="מחיקת חברה"
            message={`האם אתה בטוח שברצונך למחוק את החברה ${company.name}?`}
            onConfirm={() =>
                mutate.mutate(company.id, {
                    onSuccess: () => {
                        setIsDeleteDialogOpen(false);
                        navigate("/CompaniesAdmin");
                    },
                })
            }
            onCancel={() => setIsDeleteDialogOpen(false)}
        />
    </>
);



}
export default Company


export const AllCompanies=()=>{

    const{isError,isPending,data}=useApiQuery(["companies"],getCompanies)
    
   
const queryMessage =(<QueryMessage errorMessage="טעינת חברות נכשלה" loadingMessage="טוען חברות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage
    return (
        
        <div className="card-grid">
            {data.map((company: CompanyData) => (
                <div key={company.id}>
                    <Company company={company} />
                </div>
            ))}
        </div>
    );
}