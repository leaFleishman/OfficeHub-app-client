// login (POST /auth/login), getMe (GET /auth/me)

import type { loginModel, LoginResponse, User } from "../types/domain";
import { api } from "./client";


export const login = async ({ email, password }: loginModel): Promise<LoginResponse> => {
    const res = await api.post("/auth/login", { email, password })

    return res.data

}

export const getMe = async ():Promise<User> => {
    const res = await api.get("auth/me")
    return res.data
}