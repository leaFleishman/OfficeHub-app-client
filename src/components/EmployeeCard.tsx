import { useState } from "react";
import { blockUser, getEmployeeById } from "../api/employees";
import { useApiQuery } from "../hooks/useApiQuery";
import type { User } from "../types/domain";
import { useApiMutation } from "../hooks/useApiMutation";
import ConfirmDialog from "./ConfirmDialog";

const Employee = (user: User) => {
    const { id, isBlocked, phone, email, name } = user;
    const [showDetails, setShowDetails] = useState(false);
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
    const mutation = useApiMutation(
        (employeeId: number) => blockUser(employeeId),
        [["employees"]]
    );

    const {
        isLoading,
        isError,
        data: employee,
        error,
    } = useApiQuery<User>(
        ["employees", id],
        () => getEmployeeById(id),
        { enabled: showDetails }
    );
    const details = employee ?? user;

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md" dir="rtl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                        {name?.charAt(0)}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-lg font-bold text-slate-800">
                            {name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            מזהה עובד: {id}
                        </p>
                    </div>
                </div>

                <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                        isBlocked
                            ? "bg-red-50 text-red-700"
                            : "bg-emerald-50 text-emerald-700"
                    }`}
                >
                    <span className={`h-2 w-2 rounded-full ${
                        isBlocked ? "bg-red-500" : "bg-emerald-500"
                    }`} />
                    {isBlocked ? "חסום" : "פעיל"}
                </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                    <p className="mb-1 text-xs font-medium text-slate-500">טלפון</p>
                    <p dir="ltr" className="break-words text-sm text-slate-800 text-right">
                        {phone ?? "לא צוין"}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                    <p className="mb-1 text-xs font-medium text-slate-500">אימייל</p>
                    <p dir="ltr" className="break-all text-sm text-slate-800 text-right">
                        {email}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                <button
                    type="button"
                    aria-expanded={showDetails}
                    onClick={() => setShowDetails((current) => !current)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {showDetails ? "סגירת פרטים" : "הצגת פרטים"}
                </button>

                {!isBlocked && (
                    <button
                        type="button"
                        onClick={() => setIsBlockDialogOpen(true)}
                        disabled={mutation.isPending}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {mutation.isPending ? "חוסם..." : "חסימת עובד"}
                    </button>
                )}
            </div>

            {showDetails && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                    <h4 className="mb-4 text-base font-bold text-slate-800">
                        פרטי העובד
                    </h4>

                    {isLoading && (
                        <p className="py-2 text-sm text-slate-500">
                            טוען פרטי עובד...
                        </p>
                    )}

                    {isError && (
                        <p role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                            טעינת פרטי העובד נכשלה
                            {error instanceof Error ? `: ${error.message}` : ""}
                        </p>
                    )}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-white p-3">
                            <p className="text-xs text-slate-500">שם</p>
                            <p className="mt-1 font-medium text-slate-800">{details.name}</p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                            <p className="text-xs text-slate-500">מזהה</p>
                            <p className="mt-1 font-medium text-slate-800">{details.id}</p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                            <p className="text-xs text-slate-500">חברה</p>
                            <p className="mt-1 font-medium text-slate-800">
                                {details.companyId ?? "לא משויך"}
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                            <p className="text-xs text-slate-500">תאריך יצירה</p>
                            <p className="mt-1 break-words font-medium text-slate-800">
                                {details.createdAt}
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                            <p className="text-xs text-slate-500">תפקיד</p>
                            <p className="mt-1 font-medium text-slate-800">{details.role}</p>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                            <p className="text-xs text-slate-500">טלפון</p>
                            <p dir="ltr" className="mt-1 break-words font-medium text-slate-800 text-right">
                                {details.phone ?? "לא צוין"}
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-3 sm:col-span-2">
                            <p className="text-xs text-slate-500">אימייל</p>
                            <p dir="ltr" className="mt-1 break-all font-medium text-slate-800 text-right">
                                {details.email}
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-3 sm:col-span-2">
                            <p className="text-xs text-slate-500">סטטוס</p>
                            <p className={`mt-1 font-semibold ${
                                details.isBlocked ? "text-red-600" : "text-emerald-700"
                            }`}>
                                {details.isBlocked ? "חסום" : "פעיל"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {mutation.isError && (
                <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    חסימת העובד נכשלה: {mutation.error.message}
                </p>
            )}

            <ConfirmDialog
                isOpen={isBlockDialogOpen}
                title="חסימת עובד"
                message={`האם לחסום את ${name}?`}
                confirmText="כן, לחסום"
                cancelText="ביטול"
                onConfirm={() =>
                    mutation.mutate(id, {
                        onSuccess: () => setIsBlockDialogOpen(false),
                    })
                }
                onCancel={() => setIsBlockDialogOpen(false)}
                isLoading={mutation.isPending}
            />
        </div>
    );
};

export default Employee;