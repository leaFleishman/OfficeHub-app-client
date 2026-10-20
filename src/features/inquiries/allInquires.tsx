import { getAllInquiries } from "../../api/inquiries"
import InqueryCard from "../../components/InqueryCard"
import Message from "../../components/message"
import { useApiQuery } from "../../hooks/useApiQuery"
import type { Inquiry } from "../../types/domain"

const AllInquiries = () => {
    const {
        isError,
        error,
        isLoading,
        data: inquiries = [],
    } = useApiQuery<Inquiry[]>(["inquiries"], getAllInquiries)

    if (isError) {
        return <Message message={`שגיאה בטעינת הפניות: ${error.message}`} />
    }

    if (isLoading) {
        return <Message message="טוען פניות..." />
    }

    return (
        <main>
            <h1>כל הפניות</h1>
            {inquiries.map((inquiry) => (
                <InqueryCard key={inquiry.id} inquery={inquiry} />
            ))}
        </main>
    )
}

export default AllInquiries