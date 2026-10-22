import type { Room } from "../types/domain"
import { api } from "./client"

export type RoomInput = Pick<Room, "name" | "capacity" | "floor" | "equipment">

export const getRooms = async () => {
    const res = await api.get("rooms")
    return res.data.items
}

export const getAvailableRooms = async (start: string, end: string, minCapacity: number, page: number, pageSize: number) => {
    const res = await api.get("rooms/available", { params: { start, end, minCapacity, page, pageSize } })
    return res.data.items
}
export const getRoom = async (id: number) => {
    const res = await api.get(`rooms/${id}`)
    return res.data
}
export const getRoomBookings = async (id: number) => {
    const res = await api.get(`rooms/${id}/bookings`)
    return res.data
}

export const createRoom = async (room: RoomInput) => {
    const res = await api.post("rooms", room);

    return res.data;
};
export const updateRoom = async (id: number, room: RoomInput) => {
    const res = await api.put(`rooms/${id}`,room)
    return res.data
}
export const deleteRoom = async (id: number) => {
    const res = await api.delete(`rooms/${id}`)
    return res.data
}
