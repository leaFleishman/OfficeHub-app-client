import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoAnimation from "../components/LogoAnimation";

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
    <div dir="rtl" className="auth-page">
      <aside className="auth-aside">
        <LogoAnimation />
        <span className="orb orb-1"></span>
        <span className="orb orb-2"></span>
        <div className="skyline">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
      </aside>

      <div className="auth-main">
      <div className="auth-card">
        {/* כותרת */}
        <div className="mb-8 text-center">
          <h1 className="page-title">
            ברוכים הבאים
          </h1>

          <p className="page-sub mt-2">
            התחברי לחשבון שלך כדי להמשיך
          </p>
        </div>

        {/* טופס */}
        <form onSubmit={handleSubmit(onSubmit)} className="form-stack">
          <div className="field">
            <label
              htmlFor="email"
              className="field-label"
            >
              כתובת מייל
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              {...register("email")}
              className={`input ${errors.email ? "input-error" : ""}`}
            />

            {errors.email && (
              <p className="field-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="field">
            <label
              htmlFor="password"
              className="field-label"
            >
              סיסמה
            </label>

            <input
              id="password"
              type="password"
              placeholder="הזיני את הסיסמה שלך"
              autoComplete="current-password"
              {...register("password")}
              className={`input ${errors.password ? "input-error" : ""}`}
            />

            {errors.password && (
              <p className="field-error">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* שגיאת התחברות */}
          {isError && (
            <div
              role="alert"
              className="alert-error"
            >
              ההתחברות נכשלה. בדקי את כתובת המייל והסיסמה ונסי שוב.
            </div>
          )}

          {/* כפתור */}
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
          >
            התחברות
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
