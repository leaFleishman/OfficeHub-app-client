import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("מייל לא תקין"),
  password: z.string().min(4, "לפחות 4 תווים"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { userLogin } = useAuth();

  const onSubmit = async (data: FormData) => {
    setIsError(false);

    try {
      await userLogin(data);
      navigate("/home");
    } catch {
      setIsError(true);
    }
  };

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
        {/* כותרת */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
            O
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            ברוכים הבאים
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            התחברי לחשבון שלך כדי להמשיך
          </p>
        </div>

        {/* טופס */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              כתובת מייל
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              {...register("email")}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              סיסמה
            </label>

            <input
              id="password"
              type="password"
              placeholder="הזיני את הסיסמה שלך"
              autoComplete="current-password"
              {...register("password")}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* שגיאת התחברות */}
          {isError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              ההתחברות נכשלה. בדקי את כתובת המייל והסיסמה ונסי שוב.
            </div>
          )}

          {/* כפתור */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99]"
          >
            התחברות
          </button>
        </form>
      </div>
    </div>
  );
}
