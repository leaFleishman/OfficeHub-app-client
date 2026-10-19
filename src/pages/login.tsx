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

    const [isError, setIsError] = useState<boolean>(false);

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="מייל" {...register("email")} />
            <p>{errors.email?.message}</p>

            <input
                type="password"
                placeholder="סיסמה"
                {...register("password")}
            />
            <p>{errors.password?.message}</p>

            <button type="submit" className="">התחברות</button>
            {isError && (<div><div>ההתחברות נכשלה. בדקי את כתובת המייל והסיסמה ונסי שוב.</div></div>)}
        </form>
    );
}