import type { CreateEmployeeInput, Role } from "../types/domain";
import { api } from "./client";

export const getEmployees = async () => {
    const res = await api.get("employees")
    return res.data.items
}

export const getEmployeeById = async (id: number) => {
    const res = await api.get(`employees/${id}`)
    return res.data
}

export const createEmployee = async (emp: CreateEmployeeInput) => {
    const res = await api.post("employees", emp)
    return res.data
}

export const updateEmployee = async (id: number,name:string,email:string,phone:string) => {
    const res = api.put(`employees/${id}`,{name,phone,email})
    return (await res).data
}

export const blockUser = async (id: number) => {
    const res = await api.patch(`employees/${id}/block`)
    return res.data
}

export const UnblockUser = async (id: number) => {
    const res = await api.patch(`employees/${id}/unblock`)
    return res.data
}
export const changeRole = async (id: number,r:Role) => {
    const res = await api.patch(`employees/${id}/role`,r)
    return res.data
}

export const changePassword=async(currentPassword:string,newPassword:string)=>{
    const res =await  api.put("",{currentPassword,newPassword})
    return res.data
}
 


