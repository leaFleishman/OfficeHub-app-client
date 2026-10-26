// getMyBookings, createBooking, cancelBooking, getBookings (מנהל/אדמין)

import type { Booking, CreateBookingInput } from "../types/domain"
import { api } from "./client"

export const getMyBookings = async () => { const res = await api.get("bookings/mine"); return res.data.items }

export const getCompanyBookings = async (empId: number, roomIs: number, compId: number, from: string, to: string, page = 1, pageSize = 20) => {
    const res = await api.get("bookings", {
        params: { empId, roomIs, compId, from, to, page, pageSize },
    })
    return res.data
}

export const getAllCompanyBookings = async ( compId: number, page = 1, pageSize = 20) => {
    const res = await api.get("bookings/company", {
        params: { compId,  page, pageSize },
    })
    return res.data
}

export const cancelBooking = async (booking: Booking) => { const res = await api.delete(`bookings/${booking.id}`); return res.data }


export const getBookingsForRoom = async (id: number) => { const res = await api.get(`rooms/${id}/bookings`); return res.data }

export const createBookings = async (booking: CreateBookingInput) => { const res = await api.post("bookings", booking); return res.data }

export const getAllBookings = async ( page = 1, pageSize = 20) => {
    const res = await api.get("bookings", {
        params: {page, pageSize },
    })
    return res.data
}
