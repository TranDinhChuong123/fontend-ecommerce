import { useEffect, useState } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import { Stats, TotalOrderByStatus, RevenueDataMonth, RevenueDataDay } from "@/types/dashboard";

export const useDashboardData = (yearY: string, yearD: string, month: string) => {
    const axios = useAxiosAuth();
    const [stats, setStats] = useState<Stats | null>(null);
    const [revenueByYear, setRevenueByYear] = useState<RevenueDataMonth[]>([]);
    const [revenueByMonth, setRevenueByMonth] = useState<RevenueDataDay[]>([]);
    const [totalOrderByStatus, setTotalOrderByStatus] = useState<TotalOrderByStatus | null>(null);


    const fetchStats = async () => {
        const res = await handleApiCall(axios.get('/statistics'));
        setStats(res?.data || null);
    };

    const fetchRevenueByYear = async () => {
        const res = await handleApiCall(axios.get(`/order/revenue/${yearY}`));

        setRevenueByYear(res?.data || []);
    };

    const fetchRevenueByDayInMonth = async () => {
        const res = await handleApiCall(axios.get(`/order/revenue/${month}/${yearD}`));
        console.log("112121121",month, yearD);
        
        console.log("res", res);
        setRevenueByMonth(res?.data || []);
    };

    const fetchStatisticsOrderByStatus = async () => {
        const res = await handleApiCall(axios.get('/statistics/orders-status'));
        setTotalOrderByStatus(res?.data || null);
    };

    useEffect(() => {
        fetchStats();
        fetchStatisticsOrderByStatus();
    }, [axios]);


    useEffect(() => {
        fetchRevenueByYear();
    }, [axios, yearY]);

    useEffect(() => {
        fetchRevenueByDayInMonth();
    }, [axios, yearD, month]);


    return { stats, revenueByYear, totalOrderByStatus, revenueByMonth };
};
