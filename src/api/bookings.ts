// getMyBookings, createBooking, cancelBooking, getBookings (מנהל/אדמין)

import type { Booking } from "../types/domain"
import { api } from "./client"

export const getMyBookings = async () => {
    const res = await api.get("bookings/mine")
    return res.data.items
}

export const getCompanyBookings = async () => {
    const res = await api.get("bookings")
    return res.data
}

export const cancelBooking = async (booking: Booking) => {

    const res = await api.delete(`bookings/${booking.id}`)
    return res.data
}


export const getBookingsForRoom = async (id: number) => {
    const res = await api.get(`rooms/${id}/bookings`)
    return res.data
}

export const createBookings = async (booking: Booking) => {
    const res = await api.post("bookings", booking)
    return res.data
}

