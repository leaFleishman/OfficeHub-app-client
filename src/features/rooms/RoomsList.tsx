// רשימת חדרים - GET /rooms

import { getRooms } from "../../api/rooms"
import Message from "../../components/message"
import QueryMessage from "../../components/QueryMessage "
import RoomCard from "../../components/RoomCard"
import { useApiQuery } from "../../hooks/useApiQuery"
import type { Room } from "../../types/domain"

const RoomsList = () => {
    const { isError, isPending, data = [] } = useApiQuery<Room[]>(["rooms"], getRooms)

    const queryMessage =(<QueryMessage errorMessage="טעינת החדרים נכשלה" loadingMessage="טוען חדרים..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage

    if (data.length === 0) {
        return <Message message="אין חדרים"></Message>
    }

    return (
        <>
            <div>{data.map((room: Room) => <RoomCard room={room} key={room.id} />)}</div>
        </>)



}
export default RoomsList
