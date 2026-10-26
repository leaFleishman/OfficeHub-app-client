import { getMyCompany } from "../api/companies";
import { useAuth } from "../auth/useAuth";
import { useApiQuery } from "../hooks/useApiQuery";
import CompanyForm from "./CompanyForm";
import QueryMessage from "./QueryMessage ";
import { useState } from "react";
import Company from "./Company";
import { CompanyBookings } from "../features/bookings/CompanyBookings";

const MyCompany = () => {
    const { user } = useAuth()
    const companyId = user?.companyId
    const [editMode, setEditMode] = useState(false)
    const { isError: companyIsError, isPending: companyIsPending, data: myCompany } = useApiQuery(["companies", companyId], () => getMyCompany());
    

    if (companyIsPending) {
        return (
            <QueryMessage errorMessage="טעינת החברה נכשלה" loadingMessage="טוען חברה..." isError={companyIsError} isPending={companyIsPending} />
        );
    }

    if (companyIsError || !myCompany) {
        return (
            <QueryMessage errorMessage="טעינת החברה נכשלה" loadingMessage="טוען חברה..." isError={true} isPending={false} />
        );
    }

   

    return (
        <div dir="rtl" className="stack-y">
            <h2 className="section-title">החברה שלי</h2>
            <div className="stack-y">
                <Company company={myCompany} />
                <div className="row-actions">
                    <button type="button" className="btn btn-primary" onClick={() => setEditMode((current) => !current)}>{editMode ? "סגירת עריכה" : "עריכת פרטי החברה"}</button>
                </div>
                {editMode && <CompanyForm company={myCompany} />}
            </div>

            {user?.companyId!=null && <CompanyBookings compId={user?.companyId} ></CompanyBookings>}
          
        </div>
    );
};

export default MyCompany;