import { z } from "zod";

export const bookingFormSchema = z
    .object({
        roomId: z.number().int().positive("יש לבחור חדר"),
        selectedSchedule: z.string(),
        subject: z
            .string()
            .trim()
            .min(3, "נושא הפגישה חייב להכיל לפחות 3 תווים")
            .max(100, "נושא הפגישה לא יכול להכיל יותר מ-100 תווים"),
        date: z.iso.date("יש לבחור תאריך תקין"),
        startTime: z
            .string()
            .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "יש לבחור שעת התחלה תקינה"),
        endTime: z
            .string()
            .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "יש לבחור שעת סיום תקינה"),
        participantIds: z
            .array(z.number().int().positive())
            .refine(
                (ids) => new Set(ids).size === ids.length,
                "לא ניתן לבחור את אותו משתתף יותר מפעם אחת"
            ),
    })
    .refine((booking) => booking.endTime > booking.startTime, {
        path: ["endTime"],
        message: "שעת הסיום חייבת להיות אחרי שעת ההתחלה",
    });

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
