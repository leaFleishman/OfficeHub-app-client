import { getMyInquiries, updateInquiry } from "../api/inquiries";
import { useAuth } from "../auth/useAuth";
import { useApiMutation } from "../hooks/useApiMutation";
import { useApiQuery } from "../hooks/useApiQuery";
import type { Inquiry } from "../types/domain";
import Message from "./message";

const Inquiries = () => {
    const { data: inquiries = [], isLoading, isError, error } = useApiQuery(
        ["inquiries"],
     ()=> getMyInquiries("All",1,10)
    );
    const cancelMutation = useApiMutation(
        ({ id, status, reply }: { id: number; status: string; reply: string }) =>
            updateInquiry(id, status, reply),
        [["inquiries"]]
    );
    const {user}=useAuth()

    if (isLoading) return <Message message="טוען פניות..." />;
    if (isError) return <Message message={`שגיאה: ${error.message}`} />;

    return (
        <div>
            <h1>הפניות שלי</h1>

            {inquiries.map((i: Inquiry) => (
                <div key={i.id}>
                    <p>
                        הפנייה נוצרה ע"י {i.userName} בתאריך {i.createdAt}
                    </p>

                    <div>
                        <h2>נושא הפנייה: {i.subject}</h2>
                        <p>{i.content}</p>
                        <p>סטטוס: {i.status}</p>

                        {i.status === "Closed" && (
                            <p>
                                טופל על ידי {i.handledBy} בתאריך {i.updatedAt}
                            </p>
                        
                        )}
                        {user?.role === "Admin" && i.status !== "Closed" && (
                            <button
                                onClick={() =>
                                    cancelMutation.mutate({
                                        id: i.id,
                                        status: "Closed",
                                        reply: i.reply ?? "",
                                    })
                                }
                                disabled={cancelMutation.isPending}
                            >
                                סגירת הפנייה
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Inquiries;