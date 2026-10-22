import { getAllInquiries } from "../../api/inquiries"
import InqueryCard from "../../components/InqueryCard"
import Message from "../../components/message"
import QueryMessage from "../../components/QueryMessage "
import { useApiQuery } from "../../hooks/useApiQuery"
import type { Inquiry } from "../../types/domain"

const AllInquiries = () => {
    const {
        isError,
        isPending,
        data: inquiries = [],
    } = useApiQuery<Inquiry[]>(["inquiries"], getAllInquiries)

   const queryMessage =(<QueryMessage errorMessage="טעינת הפניות נכשלה" loadingMessage="טוען פניות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage
    if (inquiries.length === 0) {
        return <Message message="לא נמצאו פניות." />;
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