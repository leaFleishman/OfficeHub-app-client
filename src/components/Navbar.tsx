import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (<>
        <section className="stack-y">
        <h2 className="section-title">קיצורי דרך</h2>
        <div className="quick-actions">
           
            {user?.role==="Manager"&&(
               <div> <button className="action-tile" onClick={()=>navigate("/MyCompany")}>החברה שלי</button></div>
            )}

            <div> <button className="action-tile" onClick={() => navigate("/profile")}>עריכת פרופיל</button></div>
            {user?.role !== "Employee" && <div><button className="action-tile" onClick={() => navigate("/admin")}>ניהול</button></div>}
            {user?.role === "Admin" && (<div> <button className="action-tile" onClick={() => navigate("/allInquires")}> טיפול פניות</button></div>)}

        </div>
        </section>

    </>)
}
export default Navbar
