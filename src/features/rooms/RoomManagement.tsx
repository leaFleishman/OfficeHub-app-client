import { useNavigate } from "react-router-dom"
import RoomsList from "./RoomsList"

const RoomManagement = () => {

    const navigate=useNavigate()


    return (<>
        <div className="page-head">
            <span className="eyebrow">ROOMS</span>
            <h1 className="page-title">ניהול חדרים</h1>
        </div>
        <div className="row-actions">
            <button type="button" className="btn btn-primary" onClick={() => navigate("/createRoom")}>הוסף חדר</button>
        </div>

        <RoomsList></RoomsList>
    </>)
}

export default RoomManagement