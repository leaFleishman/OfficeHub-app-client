import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import type { Inquiry } from "../../types/domain";

type InquiryCardProps = {
    inquery: Inquiry;
};

const InquiryCard = ({ inquery }: InquiryCardProps) => {
    const { user } = useAuth();

    return (
        <div className="card card-hover inquiry-card">
            <p className="inquiry-by">הפנייה נוצרה ע"י <strong>{inquery.userName}</strong> בתאריך {inquery.createdAt}</p>

            <div className="stack-y">
                <div>
                    <h2 className="inquiry-subject">נושא הפנייה: {inquery.subject}</h2>
                    <p className="inquiry-body">{inquery.content}</p>
                  {inquery.reply&&(<p className="inquiry-note">הערות:{inquery.reply}</p>)}
                </div>

                <div className="row-actions">
                    <span className="info-label">סטטוס:</span>

                    <span className={`badge ${inquery.status === "Open" ? "badge-warn" : inquery.status === "InProgress" ? "badge-info" : "badge-ok"}`}>
                        <span className="badge-dot" />
                        {inquery.status === "Open" ? "פתוח" : inquery.status === "InProgress" ? "בתהליך" : "סגור"}
                    </span>
                </div>

                {inquery.status === "Closed" && (
                    <p className="inquiry-footer">טופל על ידי <strong>{inquery.handledBy}</strong> בתאריך {inquery.updatedAt}</p>
                )}

                {user?.role === "Admin" && inquery.status !== "Closed" && (
                    <Link className="btn btn-primary" to={`/InquiryManagement/${inquery.id}`}>
                        {inquery.status === "Open" ? "טיפול בפנייה" : "סגירת הפנייה"}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default InquiryCard;
