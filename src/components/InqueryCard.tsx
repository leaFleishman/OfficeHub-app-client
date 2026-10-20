import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { Inquiry } from "../types/domain";

type InquiryCardProps = {
    inquery: Inquiry;
};

const InquiryCard = ({ inquery }: InquiryCardProps) => {
    const { user } = useAuth();

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <p className="mb-4 text-sm text-slate-500">
                הפנייה נוצרה ע"י{" "}
                <span className="font-semibold text-slate-700">
                    {inquery.userName}
                </span>{" "}
                בתאריך {inquery.createdAt}
            </p>

            <div className="space-y-4">
                <div>
                    <h2 className="mb-2 text-lg font-bold text-slate-800">
                        נושא הפנייה: {inquery.subject}
                    </h2>
                    <p className="whitespace-pre-wrap leading-7 text-slate-600">
                        {inquery.content}
                    </p>
                    <p>הערות:{inquery.reply}</p>

                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">
                        סטטוס:
                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${inquery.status === "Open"
                                ? "bg-amber-100 text-amber-800"
                                : inquery.status === "InProgress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-emerald-100 text-emerald-800"
                            }`}
                    >
                        {inquery.status === "Open"
                            ? "פתוח"
                            : inquery.status === "InProgress"
                                ? "בתהליך"
                                : "סגור"}
                    </span>



                </div>

                {inquery.status === "Closed" && (
                    <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                        טופל על ידי{" "}
                        <span className="font-semibold text-slate-800">
                            {inquery.handledBy}
                        </span>{" "}
                        בתאריך {inquery.updatedAt}
                    </p>
                )}

                {user?.role === "Admin" && inquery.status !== "Closed" && (
                    <Link
                        className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        to={`/InquiryManagement/${inquery.id}`}
                    >
                        {inquery.status === "Open"
                            ? "טיפול בפנייה"
                            : "סגירת הפנייה"}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default InquiryCard;
