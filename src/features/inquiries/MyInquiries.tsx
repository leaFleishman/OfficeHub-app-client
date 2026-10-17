// הפניות שלי - GET /inquiries/mine

import { useQuery } from "@tanstack/react-query"
import { getMyOpenInquiries } from "../../api/inquiries"
import { useAuth } from "../../auth/useAuth"
import type { Inquiry } from "../../types/domain"

const MyInquiries = () => {
const {data}=useQuery({})
    const inquiries = getMyOpenInquiries("Open", 1, 10)
    return (
        <>
            {inquiries.map((i: Inquiry) => (
               
            ))}
        </>
    )
}

export default MyInquiries