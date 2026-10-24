// רשימת חדרים - GET /rooms

import { useState } from "react"
import { getRooms } from "../../api/rooms"
import Message from "../../components/message"
import QueryMessage from "../../components/QueryMessage "
import RoomCard from "../../components/RoomCard"
import { useApiQuery } from "../../hooks/useApiQuery"
import type { Room } from "../../types/domain"
import Search from "../../components/search"

const RoomsList = () => {
    const { isError, isPending, data = [] } = useApiQuery<Room[]>(["rooms"], getRooms)
    const [search, setSearch] = useState("")
    const queryMessage = (<QueryMessage errorMessage="טעינת החדרים נכשלה" loadingMessage="טוען חדרים..." isError={isError} isPending={isPending}></QueryMessage>)

    if (isPending || isError)
        return queryMessage

    if (data.length === 0) {
        return <Message message="אין חדרים"></Message>
    }

    return (
        <>
            <p>חיפוד לפי קומה</p>
            <Search search={search} onSearchChange={setSearch}></Search>
            <div className="card-grid">{data.filter(r => {

                const searchText = search.trim().toLowerCase();

                return String(r.floor).includes(searchText)
            }).map((room: Room) => <RoomCard room={room} key={room.id} />)}</div>
        </>)



}
export default RoomsList
