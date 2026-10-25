import Message from "../../components/message";
import type { Room } from "../../types/domain";


type Props = {
    rooms: Room[];
    roomId: number;
    hasValidSchedule: boolean;
    roomsLoading: boolean;
    roomsFailed: boolean;
    onSelectRoom: (roomId: number) => void;
};

const AvailableRooms = ({
    rooms,
    roomId,
    hasValidSchedule,
    roomsLoading,
    roomsFailed,
    onSelectRoom,
}: Props) => {
    if (!hasValidSchedule) {
        return null;
    }

    return (
        <section className="stack-y" style={{ gap: "0.6rem" }}>
            {roomsLoading && (
                <p className="card-caption">
                    טוען חדרים פנויים...
                </p>
            )}

            {roomsFailed && (
                <Message message="טעינת החדרים הפנויים נכשלה." />
            )}

            {!roomsLoading &&
                !roomsFailed &&
                rooms.length === 0 && (
                    <Message message="אין חדרים פנויים המתאימים לפרטים שנבחרו." />
                )}

            {!roomsLoading &&
                !roomsFailed &&
                rooms.map((room) => (
                    <button
                        key={room.id}
                        type="button"
                        aria-pressed={roomId === room.id}
                        className="room-option"
                        onClick={() => onSelectRoom(room.id)}
                    >
                        <span>{room.name}</span>
                        <span className="badge badge-info">
                            קיבולת: {room.capacity}
                        </span>
                    </button>
                ))}
        </section>
    );
};

export default AvailableRooms;