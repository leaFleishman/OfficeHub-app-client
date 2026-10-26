import { useState } from "react";
import { getAllBookings } from "../../api/bookings";
import Message from "../../components/message";
import Bookings from "./bookings";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { Booking, Page } from "../../types/domain";
import QueryMessage from "../../components/QueryMessage ";

const AllBookings = () => {
    const [page, setPage] = useState<number>(1);
    const { isError, isPending, data } = useApiQuery<Page<Booking>>(
        ["bookings", "all", page],
        () => getAllBookings(page)
    );
    const queryMessage = (<QueryMessage errorMessage="טעינת הזמנות נכשלה" loadingMessage="טוען הזמנות..." isError={isError} isPending={isPending} ></QueryMessage>)

    if (isPending || isError)
        return queryMessage

    if (!data) {
        return <Message message="לא התקבלו נתוני הזמנות." />;
    }

    const pageCount = Math.ceil(data.total / data.pageSize);

    return (
        <main dir="rtl">
            <p className="chart-sub" style={{ marginBottom: "1rem" }}>סה״כ {data.total} הזמנות</p>
            <Bookings bookings={data.items} title="כל ההזמנות" />
            {pageCount > 1 && (
                <nav
                    aria-label="דפדוף בין עמודי ההזמנות"
                    className="pager"
                >
                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => currentPage - 1)}
                        disabled={page <= 1}
                    >
                        הקודם
                    </button>
                    <span>
                        עמוד {data.page} מתוך {pageCount}
                    </span>
                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => currentPage + 1)}
                        disabled={page >= pageCount}
                    >
                        הבא
                    </button>
                </nav>
            )}
        </main>
    );
};

export default AllBookings;
