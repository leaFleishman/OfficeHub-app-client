
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRoom } from "../api/rooms";
import { useApiMutation } from "../hooks/useApiMutation";
import type { Room } from "../types/domain";

const equipmentLabels: Record<string, string> = {
    Projector: "מקרן",
    Whiteboard: "לוח",
    VideoConference: "ציוד לשיחות וידאו",
};

type RoomCardProps = {
    room: Room;
};

const RoomCard = ({ room }: RoomCardProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const navigate = useNavigate();

    const mutation = useApiMutation(deleteRoom, [["rooms"]])
    const handleDelete = () => {
        mutation.mutate(room.id);
        setShowDeleteDialog(false);
    };
    return (
        <>
            <div
                dir="rtl"
                className="card card-hover"
            >
                <div className="card-title-row">
                    <div className="card-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 21h16.5M4.5 21V5.25A2.25 2.25 0 0 1 6.75 3h10.5A2.25 2.25 0 0 1 19.5 5.25V21M9 7.5h.008v.008H9V7.5Zm0 3h.008v.008H9V10.5Zm0 3h.008v.008H9v-.008Zm6-6h.008v.008H15V7.5Zm0 3h.008v.008H15V10.5Zm0 3h.008v.008H15v-.008ZM9 21v-3.75h6V21"
                            />
                        </svg>
                    </div>

                    <div>
                        <h3 className="card-heading">
                            {room.name}
                        </h3>
                        <p className="card-caption">
                            קומה {room.floor}
                        </p>
                    </div>
                </div>

                <div className="info-grid mb-5">
                    <div className="info-tile">
                        <p className="info-label">
                            קומה
                        </p>
                        <p className="info-value info-value--big">
                            {room.floor}
                        </p>
                    </div>

                    <div className="info-tile info-tile--accent">
                        <p className="info-label">
                            כמות מושבים
                        </p>
                        <p className="info-value info-value--big">
                            {room.capacity}
                        </p>
                        <div className="cap-meter" aria-hidden="true">
                            <span style={{ width: `${Math.min(100, (room.capacity / 30) * 100)}%` }}></span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="equip-title">
                        ציוד בחדר
                    </h4>

                    <div className="flex flex-wrap gap-2">
                        {room.equipment.map((equipment) => (
                            <p
                                key={equipment}
                                className="tag"
                            >
                                {equipmentLabels[equipment] ?? equipment}
                            </p>
                        ))}
                    </div>

                    <div className="row-actions divider">
                        <button
                            type="button"
                            onClick={() => navigate(`/EditRoom/${room.id}`)}
                            className="btn btn-primary btn-sm"
                        >
                            ערוך חדר
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowDeleteDialog(true)}
                            className="btn btn-danger btn-sm"
                        >
                            מחק חדר
                        </button>
                    </div>

                    {showDeleteDialog && (
                        <div className="modal-backdrop">
                            <div
                                dir="rtl"
                                className="modal"
                            >
                                <h2 className="modal-title">
                                    אישור מחיקת חדר
                                </h2>

                                <p className="modal-text">
                                    האם את בטוחה שברצונך למחוק את החדר {room.name}?
                                    פעולה זו אינה ניתנת לביטול.
                                </p>

                                {mutation.isError && (
                                    <p className="alert-error mt-4">
                                        אירעה שגיאה במחיקת החדר. נסי שוב.
                                    </p>
                                )}

                                <div className="modal-actions modal-actions--split">
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteDialog(false)}
                                        className="btn btn-ghost"
                                    >
                                        ביטול
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={mutation.isPending}
                                        className="btn btn-danger"
                                    >
                                        {mutation.isPending ? "מוחק..." : "כן, מחק"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RoomCard;
