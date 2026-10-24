// getCompanies, getMyCompany, createCompany, updateCompany

import { api } from "./client"

export const getCompanies = async () => {
    const res = await api.get("/companies")
    return res.data.items
}

export const getMyCompany = async () => {
    const res = await api.get("/companies/mine")
    return res.data
}

export const createCompany = async (name:string,floor:number,phone:string) => {
    const res = await api.post("/companies",{name,floor,phone})
    return res.data
}


export const updateCompany = async (name: string, floor: number, phone: string) => {
    const res = await api.put("/companies/mine", { name, floor, phone })
    return res.data
}

export const deleteCompany=async(id:number)=>{
 const res = await api.delete(`/companies/${id}`)
    return res.data
}
