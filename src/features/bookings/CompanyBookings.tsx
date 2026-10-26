import { getAllCompanyBookings } from "../../api/bookings";
import QueryMessage from "../../components/QueryMessage ";
import { useApiQuery } from "../../hooks/useApiQuery";
import type { Booking } from "../../types/domain";
import Bookings from "./bookings";

type CompanyBookingsProps = {
    compId: number;
   
};

type CompanyBookingsResponse = {
    items: Booking[];
};

export const CompanyBookings = ({
    compId,
   
}: CompanyBookingsProps) => {
    const {
        data,
        isError,
        isPending,
    } = useApiQuery<CompanyBookingsResponse>(
        ["company-bookings", compId],
        () => getAllCompanyBookings(compId)
    );
    const queryMessage = (<QueryMessage errorMessage="טעינת ההזמנות נכשלה" loadingMessage="טוען הזמנות..." isError={isError} isPending={isPending}></QueryMessage>)

    if (isPending || isError)
        return queryMessage

    if(!data) return null

    return <Bookings bookings={data.items} title="הזמנות החברה" />;
};
