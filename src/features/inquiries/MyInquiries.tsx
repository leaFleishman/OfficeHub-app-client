// הפניות שלי - GET /inquiries/mine

import { getMyInquiries } from "../../api/inquiries";
import InquiryCard from "./InqueryCard";
import Message from "../../components/message";
import QueryMessage from "../../components/QueryMessage ";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { Inquiry } from "../../types/domain";

const MyInquiries = () => {
  const {
    data: inquiries = [],
    isError,
    isPending,
  } = useApiQuery<Inquiry[]>(
    ["inquiries"],
    () => getMyInquiries("All", 1, 20)
  );
const queryMessage =(<QueryMessage errorMessage="טעינת פניות נכשלה" loadingMessage="טוען פניות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage
  if (inquiries.length === 0) {
    return <Message message="לא נמצאו פניות." />;
  }

  return (
    <main dir="rtl" className="stack-y">
      <div className="page-head">
        <span className="eyebrow">INQUIRIES</span>
        <h1 className="page-title">הפניות שלי</h1>
      </div>


      <div className="card-grid">
        {inquiries.map((i: Inquiry) => (
          <InquiryCard key={i.id} inquery={i} />

        ))}</div>
    </main>
  );
};

export default MyInquiries;