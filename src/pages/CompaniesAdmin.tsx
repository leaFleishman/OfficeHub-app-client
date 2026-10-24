import { useNavigate } from "react-router-dom"
import { AllCompanies } from "../components/Company"

const CompaniesAdmin = () => {
    const navigate = useNavigate()
    return (<>
        <div className="page-head">
            <span className="eyebrow">COMPANIES</span>
            <h1 className="page-title">ניהול חברות</h1>
        </div>
        <div className="row-actions">
        <button type="button" className="btn btn-primary" onClick={() => navigate("/CompanyForm")}>
            הוסף חברה
        </button>
        </div>
        <AllCompanies></AllCompanies>
    </>)
}

export default CompaniesAdmin