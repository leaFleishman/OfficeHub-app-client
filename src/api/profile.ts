
import { api } from "./client"
import type {  User } from "../types/domain"

export const getProfile = async () => { const res = await api.get("profile"); return res.data }

export const updateProfile = async (name: string, email: string, phone: string | null, address: string | null): Promise<User> => {
    const res = await api.put("profile",{name,phone,email,address})
    return res.data
}



export const changePassword = async (  currentPassword: string,
    newPassword: string) => {
    const res = await api.put("profile/password",{currentPassword,newPassword})
    return res.data
}