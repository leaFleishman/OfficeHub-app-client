import { useAuth } from "../auth/useAuth"
import AllInquiries from "../features/inquiries/allInquires"
import MyInquiries from "../features/inquiries/MyInquiries"
import NewInquiryForm from "../features/inquiries/NewInquiryForm"

const InquiriesPage = () => {
    const { user } = useAuth()

    return (<>
        {user?.role !== "Admin" && (<>
            <NewInquiryForm></NewInquiryForm>
            <MyInquiries></MyInquiries></>
        )}
        {user?.role === "Admin" && (<AllInquiries></AllInquiries>)}


    </>)
}
export default InquiriesPage