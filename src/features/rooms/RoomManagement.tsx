import { useNavigate } from "react-router-dom"
import RoomsList from "./RoomsList"

// ניהול חדרים (אדמין) - הוספה / עריכה / מחיקה
const RoomManagement = () => {

    const navigate=useNavigate()


    return (<>
        <button type="button" onClick={() => navigate("/createRoom")}>הוסף חדר</button>
        <RoomsList></RoomsList>
    </>)
}

export default RoomManagement