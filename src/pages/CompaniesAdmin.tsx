import { useNavigate } from "react-router-dom"
import { AllCompanies } from "../components/Company"

const CompaniesAdmin = () => {
    const navigate = useNavigate()
    return (<>
        <button type="button" onClick={() => navigate("/CompanyForm")}>
            הוסף חברה
        </button>
        <AllCompanies></AllCompanies>
    </>)
}

export default CompaniesAdmin