// getCompanies, getMyCompany, createCompany, updateCompany

import type { Company } from "../types/domain"
import { api } from "./client"

export const getCompanies = async () => {
    const res = await api.get("/companies")
    return res.data
}

export const getMyCompany = async () => {
    const res = await api.get("/companies/mine")
    return res.data
}

export const createCompany = async (name:string,floor:number,phone:string) => {
    const res = await api.post("/companies",{name,floor,phone})
    return res.data
}


export const updateCompany = async (id: number) => {
    const res = await api.put(`/companies/${id}`,{id})
    return res.data
}
