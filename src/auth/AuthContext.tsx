// Context שמחזיק את user, ופונקציות login / logout (הטוקן נשמר ב-localStorage)

import { createContext, useEffect, useState, type ReactNode } from "react";
import type { loginModel, User, UserContextType } from "../types/domain";
import { getMe, login } from "../api/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext<UserContextType | null>(null);



export const AuthProvider = ({

    children,
}: {
    children: ReactNode;
}) => {

        const navigate = useNavigate()

    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const logout = (): void => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoading(false);
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false)
            return;
        }

        let isCurrent = true;
        getMe()
            .then((data) => {
                if (isCurrent && localStorage.getItem("token") === token) {
                    setUser(data);
                }
            })
            .catch(() => {
                if (isCurrent && localStorage.getItem("token") === token) {
                    logout();
                }
            })
            .finally(() => {
                if (isCurrent) {
                    setIsLoading(false);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    const userLogin = async (user: loginModel) => {
        const res = await login(user)
        const tokenRes: string = res.token
        if (tokenRes) {
            localStorage.setItem('token', tokenRes)
            setUser(res.user)
        }
    }


    return (
        <AuthContext.Provider value={{ user, userLogin, logout, updateUser: setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
