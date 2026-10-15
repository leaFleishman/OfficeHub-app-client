import type { Room } from "../types/domain"
import { api } from "./client"

// , , , , , , 
export const getRooms = async () => {
    const res = await api.get("rooms")
    return res.data
}

export const getAvailableRooms = async (start: string, end: string, minCopacity: number, page: number, pageSize: number) => {
    const res = await api.get("rooms/available", { params: { start, end, minCopacity, page, pageSize } })
    return res.data
}
export const getRoom = async (id: number) => {
    const res = await api.get(`rooms/${id}`)
    return res.data
}
export const getRoomBookings = async (id: number) => {
    const res = await api.get(`rooms/${id}/bookings`)
    return res.data
}

export const createRoom = async (name: string, copacity: number, floor: number, equipment: []) => {
    const res = await api.post(`rooms`, { name, copacity, floor, equipment })
    return res.data
}

export const updateRoom = async (id: number) => {
    const res = await api.put(`rooms/${id}`)
    return res.data
}
export const deleteRoom = async (id: number) => {
    const res = await api.delete(`rooms/${id}`)
    return res.data
}


