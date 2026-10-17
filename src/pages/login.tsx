import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";


const schema = z.object({
    email: z.string().email("מייל לא תקין"),
    password: z.string().min(4, "לפחות 4 תווים"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
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
        try {
            await userLogin(data);
            navigate("/home")
        }
        catch (error) {
            console.error("Login failed:", error);
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
        </form>
    );
}