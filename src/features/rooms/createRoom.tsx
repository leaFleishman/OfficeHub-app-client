import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createRoom } from "../../api/rooms";
import { useApiMutation } from "../../hooks/useApiMutation";

const schema = z.object({
  name: z.string().trim().min(3, "השם חייב להכיל לפחות 3 תווים"),
  capacity: z.number().int().positive("יש להזין מספר מקומות חיובי"),
  floor: z.number().int().min(0, "הקומה לא יכולה להיות שלילית"),
  equipment: z.array(z.string()).min(1, "יש לבחור לפחות פריט אחד"),
});

type RoomFormData = z.infer<typeof schema>;

export const CreateRoom = () => {
  const createRoomMutation = useApiMutation(
    (data: RoomFormData) =>
      createRoom(
        data.name,
        data.capacity,
        data.floor,
        data.equipment
      ),
    [["rooms"]]
  );

  const {
    register,
    handleSubmit,
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

  const onSubmit = (data: RoomFormData) => {
    createRoomMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">שם החדר</label>
      <input id="name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="capacity">מספר מקומות</label>
      <input
        id="capacity"
        type="number"
        {...register("capacity", { valueAsNumber: true })}
      />
      {errors.capacity && <p>{errors.capacity.message}</p>}

      <label htmlFor="floor">קומה</label>
      <input
        id="floor"
        type="number"
        {...register("floor", { valueAsNumber: true })}
      />
      {errors.floor && <p>{errors.floor.message}</p>}

      <fieldset>
        <legend>ציוד</legend>

        <label>
          <input
            type="checkbox"
            value="Projector"
            {...register("equipment")}
          />
          מקרן
        </label>

        <label>
          <input
            type="checkbox"
            value="Whiteboard"
            {...register("equipment")}
          />
          לוח
        </label>

        <label>
          <input
            type="checkbox"
            value="VideoConference"
            {...register("equipment")}
          />
          ציוד לשיחות וידאו
        </label>

        {errors.equipment && <p>{errors.equipment.message}</p>}
      </fieldset>

      <button type="submit" disabled={createRoomMutation.isPending}>
        {createRoomMutation.isPending ? "יוצר חדר..." : "יצירת חדר"}
      </button>

      {createRoomMutation.isError && (
        <p>שגיאה: {createRoomMutation.error.message}</p>
      )}

      {createRoomMutation.isSuccess && (
        <p>החדר נוצר בהצלחה!</p>
      )}
    </form>
  );
};