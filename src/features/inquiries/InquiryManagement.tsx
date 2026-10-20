import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Inquiry } from "../../types/domain";
import { getInquiriesById, updateInquiry } from "../../api/inquiries";
import { useApiMutation } from "../../hooks/useApiMutation";
import { useApiQuery } from "../../hooks/useApiQuery";
import Message from "../../components/message";

type InquiryEditorProps = {
    inquiry: Inquiry;
};

const InquiryEditor = ({ inquiry }: InquiryEditorProps) => {
    const [reply, setReply] = useState(inquiry.reply ?? "");

    const updateInquiryMutation = useApiMutation(
        ({ id, status, reply }: { id: number; status: string; reply: string }) =>
            updateInquiry(id, status, reply),
        [["inquiries"]]
    );

    return (
        <>
            <label htmlFor="reply">הוסף תגובה</label>

            <textarea
                name="reply"
                id="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
            />
            <button
                type="button"
                onClick={() =>{
                    updateInquiryMutation.mutate({
                        id: inquiry.id,
                        status: inquiry.status === "Open" ? "InProgress" : "Closed",
                        reply,
                    }) 
                    navigation.navigate("/home") }
                }
                disabled={updateInquiryMutation.isPending}
            >
                עדכון פנייה
            </button>
        </>
    );
};

export const InquiryManagement = () => {
    const { id } = useParams<{ id: string }>();
    const inquiryId = Number(id);
    const hasValidId = Number.isInteger(inquiryId) && inquiryId > 0;
    const {
        data: inquiry,
        isLoading,
        isError,
        error,
    } = useApiQuery<Inquiry>(
        ["inquiries", inquiryId],
        () => getInquiriesById(inquiryId),
        { enabled: hasValidId }
    );

    if (!hasValidId) {
        return <Message message="מזהה הפנייה אינו תקין." />;
    }

    if (isLoading) {
        return <Message message="טוען את הפנייה..." />;
    }

    if (isError) {
        return <Message message={`טעינת הפנייה נכשלה: ${error.message}`} />;
    }

    if (!inquiry) {
        return <Message message="הפנייה לא נמצאה." />;
    }

    return <InquiryEditor inquiry={inquiry} />;
};