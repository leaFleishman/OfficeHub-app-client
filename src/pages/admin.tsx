import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import EmployeeManagement from "../features/employees/EmployeeManagement"

const Admin=()=>{

    const{user}=useAuth()
    const navigate=useNavigate()

return(<>
<p>admin</p>
{user?.role==="Manager"&&(<EmployeeManagement></EmployeeManagement>)}
{user?.role==="Admin"&&(<button onClick={()=>navigate("/CompanyForm")}>הוסף חברה</button>)}
{user?.role==="Manager"&&(
    <button type="button" onClick={() => navigate("/employees/new")}>
        הוסף עובד
    </button>
)}




</>)
}
export default Admin