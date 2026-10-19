// Context שמחזיק את user, ופונקציות login / logout (הטוקן נשמר ב-localStorage)

import { createContext, useEffect, useState, type ReactNode } from "react";
import type { loginModel, User, UserContextType } from "../types/domain";
import { getMe, login } from "../api/auth";
export const AuthContext = createContext<UserContextType | null>(null);




export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {


    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsLoading(false)
            return;
        }
        getMe()
            .then((data) => setUser(data))
            .catch(() => logout())
            .finally(() => setIsLoading(false))
    }, [])

    const userLogin = async (user: loginModel) => {
        const res = await login(user)
        const tokenRes: string = res.token
        if (tokenRes) {
            localStorage.setItem('token', tokenRes)
            setUser(res.user)
        }
    }

    const logout = (): void => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, userLogin, logout, updateUser: setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

