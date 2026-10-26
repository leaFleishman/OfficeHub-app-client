
// getEmployeeDashboard, getCompanyDashboard, getBuildingDashboard

import { api } from "./client"

export const getEmployeeDashboard = async() => { const res=await api.get("/dashboard/employee"); return res.data }
export const getCompanyDashboard = async() => { const res=await api.get("/dashboard/company"); return res.data }
export const getBuildingDashboard = async () => { const res = await api.get("/dashboard/building"); return res.data }