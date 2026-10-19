// הפניות שלי - GET /inquiries/mine

import { getMyInquiries } from "../../api/inquiries";
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

      <ul>
        {inquiries.map((inquiry) => (
          <li key={inquiry.id}>
            <p>נושא הפנייה: {inquiry.subject}</p>
            <p>תוכן הפנייה: {inquiry.content}</p>
            <p>סטטוס: {inquiry.status}</p>

            <details name="inquiries">
              <summary>פרטים נוספים</summary>

              <p>נוצרה בתאריך: {inquiry.createdAt}</p>

              <p>
                תגובת המערכת: {inquiry.reply ?? "אין תגובה"}
              </p>

              {inquiry.status === "Closed" && (
                <p>
                  טופלה על ידי: {inquiry.handledBy ?? "לא צוין"}
                </p>
              )}
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MyInquiries;