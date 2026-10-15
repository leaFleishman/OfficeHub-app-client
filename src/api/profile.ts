
import { api } from "./client"

export const getProfile = async () => {
    const res = await api.get("profile")
    return res.data
}

export const updateProfile = async (name: string, email: string, phone: string) => {
    const res = await api.put("profile",{name,phone,email})
    return res.data
}

export const changePassword = async (cur: string,newPass: string) => {
    const res = await api.put("profile/password",{cur,newPass})
    return res.data
}