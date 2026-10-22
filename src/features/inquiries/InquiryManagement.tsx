import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Inquiry } from "../../types/domain";
import { getInquiriesById, updateInquiry } from "../../api/inquiries";
import { useApiMutation } from "../../hooks/useApiMutation";
import { useApiQuery } from "../../hooks/useApiQuery";
import Message from "../../components/message";
import { useAuth } from "../../auth/useAuth";
import QueryMessage from "../../components/QueryMessage ";

type InquiryEditorProps = {
    inquiry: Inquiry;
};

const InquiryEditor = ({ inquiry }: InquiryEditorProps) => {
    const [reply, setReply] = useState(inquiry.reply ?? "");
    const navigate = useNavigate();

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
                onClick={() => {
                    updateInquiryMutation.mutate({
                        id: inquiry.id,
                        status: inquiry.status === "Open" ? "InProgress" : "Closed",
                        reply,
                    }, {
                        onSuccess: () => navigate("/home"),
                    });
                }}
                disabled={updateInquiryMutation.isPending}
            >
                עדכון פנייה
            </button>
        </>
    );
};

export const InquiryManagement = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth()
    const navigate = useNavigate()
    const inquiryId = Number(id);
    const hasValidId = Number.isInteger(inquiryId) && inquiryId > 0;
    const {
        data: inquiry,
        isPending,
        isError,
    } = useApiQuery<Inquiry>(
        ["inquiries", inquiryId],
        () => getInquiriesById(inquiryId),
        { enabled: hasValidId }
    );

    if (user?.role !== "Admin" && user?.id !== inquiry?.userId) {
        setTimeout(() => {
            navigate("/home");
        }, 2000);

        return <Message message="אין לך הרשאה!" />;

    }

    if (!hasValidId) {
        return <Message message="מזהה הפנייה אינו תקין." />;
    }

    const queryMessage =(<QueryMessage errorMessage="טעינת הפניות נכשלה" loadingMessage="טוען פניות..."  isError={isError} isPending={isPending}></QueryMessage>)

   if (isPending || isError)
    return queryMessage

    if (!inquiry) {
        return <Message message="הפנייה לא נמצאה." />;
    }

    return <InquiryEditor inquiry={inquiry} />;
};