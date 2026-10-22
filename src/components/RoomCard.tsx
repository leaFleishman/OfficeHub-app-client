
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
                className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
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
                        <h3 className="text-lg font-bold text-gray-900">
                            {room.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            קומה {room.floor}
                        </p>
                    </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                        <p className="mb-1 text-sm text-gray-500">
                            קומה
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            {room.floor}
                        </p>
                    </div>

                    <div className="rounded-xl bg-indigo-50 p-3">
                        <p className="mb-1 text-sm text-indigo-600">
                            כמות מושבים
                        </p>
                        <p className="text-lg font-semibold text-indigo-700">
                            {room.capacity}
                        </p>
                    </div>
                </div>

                <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                        <span className="h-5 w-1 rounded-full bg-indigo-500" />
                        ציוד בחדר
                    </h4>

                    <div className="flex flex-wrap gap-2">
                        {room.equipment.map((equipment) => (
                            <p
                                key={equipment}
                                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                            >
                                {equipmentLabels[equipment] ?? equipment}
                            </p>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            type="button"
                            onClick={() => navigate(`/EditRoom/${room.id}`)}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            ערוך חדר
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowDeleteDialog(true)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            מחק חדר
                        </button>
                    </div>

                    {showDeleteDialog && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div
                                dir="rtl"
                                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                            >
                                <h2 className="mb-3 text-xl font-bold text-gray-900">
                                    אישור מחיקת חדר
                                </h2>

                                <p className="mb-6 text-gray-600">
                                    האם את בטוחה שברצונך למחוק את החדר {room.name}?
                                    פעולה זו אינה ניתנת לביטול.
                                </p>

                                {mutation.isError && (
                                    <p className="mb-4 text-sm text-red-600">
                                        אירעה שגיאה במחיקת החדר. נסי שוב.
                                    </p>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteDialog(false)}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        ביטול
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={mutation.isPending}
                                        className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
