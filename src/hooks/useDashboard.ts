import { useQuery } from "@tanstack/react-query";
import {
    getBuildingDashboard,
    getCompanyDashboard,
    getEmployeeDashboard,
} from "../api/dashboard";


type DashboardType = "employee" | "company" | "building";

const useDashboardQuery = <T,>(
    type: DashboardType,
    queryFn: () => Promise<T>
) => {
    return useQuery({
        queryKey: ["dashboard", type],
        queryFn,
        staleTime: 60_000,

    });
};


export const useEmployeeDashboard = () =>
    useDashboardQuery("employee", getEmployeeDashboard);

export const useCompanyDashboard = () =>
    useDashboardQuery("company", getCompanyDashboard);

export const useBuildingDashboard = () =>
    useDashboardQuery("building", getBuildingDashboard);
