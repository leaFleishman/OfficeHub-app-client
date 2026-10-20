// הפניות שלי - GET /inquiries/mine

import { getMyInquiries } from "../../api/inquiries";
import InquiryCard from "../../components/InqueryCard";
import Message from "../../components/message";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { Inquiry } from "../../types/domain";

const MyInquiries = () => {
  const {
    data: inquiries = [],
    error,
    isError,
    isLoading,
  } = useApiQuery<Inquiry[]>(
    ["inquiries"],
    () => getMyInquiries("All", 1, 20)
  );

  if (isLoading) {
    return <Message message="טוען פניות..." />;
  }

  if (isError) {
    return (
      <Message message={`טעינת פניות נכשלה: ${error.message}`} />
    );
  }

  if (inquiries.length === 0) {
    return <Message message="לא נמצאו פניות." />;
  }

  return (
    <main dir="rtl">
      <h1>הפניות שלי</h1>


      <div>
        {inquiries.map((i: Inquiry) => (
          <InquiryCard key={i.id} inquery={i} />

        ))}</div>
    </main>
  );
};

export default MyInquiries;