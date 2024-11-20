export type Stats = {
    totalCustomer: number;
    totalOrder: number;
    totalProduct: number;
    totalRevenue: number;
  };
  
  export type RevenueDataMonth = {
    month: string;
    totalRevenue: number;
  };

  export type RevenueDataDay = {
    day: number;
    totalRevenue: number;
  };
  
  export type TotalOrderByStatus = {
    totalOrderPending: number;
    totalOrderCompleted: number;
    totalOrderCanceled: number;
    totalOrderConfirmed: number;
    totalOrderShipping: number;
  };
  