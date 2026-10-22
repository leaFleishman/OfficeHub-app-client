import { getCompanies } from "../api/companies";
import { useApiQuery } from "../hooks/useApiQuery";
import type { Company } from "../types/domain";
import Message from "./message";
import QueryMessage from "./QueryMessage ";

interface CompanyProps {
    company: Company
}

const Company = ({ company }: CompanyProps) => {

return (
    <>
        <div
            dir="rtl"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
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
                    <h2 className="text-xl font-bold text-gray-900">
                        {company.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        פרטי החברה
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="mb-1 text-sm text-gray-500">
                        תאריך הקמה
                    </p>
                    <p className="font-semibold text-gray-800">
                        {company.createdAt}
                    </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="mb-1 text-sm text-gray-500">
                        טלפון מנהל
                    </p>
                    <p className="font-semibold text-gray-800">
                        {company.phone}
                    </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                    <p className="mb-1 text-sm text-gray-500">
                        קומה
                    </p>
                    <p className="font-semibold text-gray-800">
                        {company.floor}
                    </p>
                </div>
            </div>
        </div>
    </>
);



}
export default Company


export const AllCompanies=()=>{

    const{isError,isPending,data}=useApiQuery([["companies"]],getCompanies)
    
   
const queryMessage =(<QueryMessage errorMessage="טעינת חברות נכשלה" loadingMessage="טוען חברות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage
    return (
        
        <div>
            {data.map((company: Company) => (
                <div key={company.id}>
                    <Company company={company} />
                </div>
            ))}
        </div>
    );
}