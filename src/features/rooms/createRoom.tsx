import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoom, getRoom, updateRoom, type RoomInput } from "../../api/rooms";
import { useApiMutation } from "../../hooks/useApiMutation";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useApiQuery } from "../../hooks/useApiQuery";
import Message from "../../components/message";
import type { Room } from "../../types/domain";
import QueryMessage from "../../components/QueryMessage ";

const schema = z.object({
  name: z.string().trim().min(3, "השם חייב להכיל לפחות 3 תווים"),
  capacity: z.number().int().positive("יש להזין מספר מקומות חיובי"),
  floor: z.number().int().min(0, "הקומה לא יכולה להיות שלילית"),
  equipment: z.array(z.string()).min(1, "יש לבחור לפחות פריט אחד"),
});

type RoomFormData = z.infer<typeof schema>;

const RoomForm = ({ room }: { room?: Room }) => {
  const navigate = useNavigate();
  const roomMutation = useApiMutation(
    (data: RoomInput) =>
      room ? updateRoom(room.id, data) : createRoom(data),
    [["rooms"]]
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      capacity: 1,
      floor: 0,
      equipment: [],
    },
  });

  useEffect(() => {
    if (room) {
      reset({
        name: room.name,
        capacity: room.capacity,
        floor: room.floor,
        equipment: room.equipment,
      });
    }
  }, [room, reset]);

  const onSubmit = (data: RoomFormData) => {
    roomMutation.mutate(data, {
      onSuccess: () => navigate("/RoomManagement"),
    });
  };

  return (
    <div className="card form-card">
    <div className="page-head" style={{ marginBottom: "1.5rem" }}>
      <span className="eyebrow">{room ? "EDIT ROOM" : "NEW ROOM"}</span>
      <h1 className="page-title">{room ? "עריכת חדר" : "יצירת חדר"}</h1>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} dir="rtl" className="form-stack">
      <div className="field">
      <label htmlFor="name" className="field-label">שם החדר</label>
      <input id="name" {...register("name")} />
      {errors.name && <p className="field-error">{errors.name.message}</p>}
      </div>

      <div className="field">
      <label htmlFor="capacity" className="field-label">מספר מקומות</label>
      <input
        id="capacity"
        type="number"
        {...register("capacity", { valueAsNumber: true })}
      />
      {errors.capacity && <p className="field-error">{errors.capacity.message}</p>}
      </div>

      <div className="field">
      <label htmlFor="floor" className="field-label">קומה</label>
      <input
        id="floor"
        type="number"
        {...register("floor", { valueAsNumber: true })}
      />
      {errors.floor && <p className="field-error">{errors.floor.message}</p>}
      </div>

      <fieldset>
        <legend className="field-label">ציוד</legend>

        <div className="check-group">
        <label className="check-pill">
          <input
            type="checkbox"
            value="Projector"
            {...register("equipment")}
          />
          מקרן
        </label>

        <label className="check-pill">
          <input
            type="checkbox"
            value="Whiteboard"
            {...register("equipment")}
          />
          לוח
        </label>

        <label className="check-pill">
          <input
            type="checkbox"
            value="VideoConference"
            {...register("equipment")}
          />
          ציוד לשיחות וידאו
        </label>
        </div>

        {errors.equipment && <p className="field-error">{errors.equipment.message}</p>}
      </fieldset>

      <button type="submit" disabled={roomMutation.isPending} className="btn btn-primary btn-lg btn-block">
        {roomMutation.isPending
          ? room ? "מעדכן חדר..." : "יוצר חדר..."
          : room ? "שמירת שינויים" : "יצירת חדר"}
      </button>

      {roomMutation.isError && (
        <p role="alert" className="alert-error">שמירת החדר נכשלה: {roomMutation.error.message}</p>
      )}

      {roomMutation.isSuccess && (
        <p role="status" className="alert-success">{room ? "החדר עודכן בהצלחה!" : "החדר נוצר בהצלחה!"}</p>
      )}
    </form>
    </div>
  );
};

export const CreateRoom = () => <RoomForm />;


export const EditRoom = () => {
  const { id } = useParams();
  const roomId = Number(id);
  const isValidRoomId = Number.isInteger(roomId) && roomId > 0;
  const {
    data: room,
    isError,
    isPending,
    
  } = useApiQuery<Room>(
    ["rooms", roomId],
    () => getRoom(roomId),
    { enabled: isValidRoomId }
  );

  if (!isValidRoomId) {
    return <Message message="מזהה החדר אינו תקין" />;
  }
 const queryMessage =(<QueryMessage errorMessage="טעינת החדר נכשלה" loadingMessage="טוען חדר..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage
  if (!room) {
    return <Message message="לא נמצאו פרטי חדר לעריכה" />;
  }

  return <RoomForm room={room} />;
};