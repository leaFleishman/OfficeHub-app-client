// , ,  (אדמין), , 


import { useAuth } from "../auth/useAuth";
import { api } from "./client";

const { user } = useAuth()

export const getAllInquiries = async () => {
    const res = await api.get("inquiries");
    return res.data
}

export const getMyInquiries = async () => {
    const res = await api.get("inquiries/min");
    return res.data
}

export const getInquiriesById = async () => {

    const res = await api.get(`inquiries/${user?.id}`);
    return res.data
}

export const AddInquiries = async (sub:string,con:string) => {
   const res=await api.post("inquiries",{sub,con})
   return res.data
}

export const updateInquiry=async(id:number,status:string,reply:string)=>{
    const res=await api.put(`inquiries/${id}`,{status,reply})
    return res.data
}