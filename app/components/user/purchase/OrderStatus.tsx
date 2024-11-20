import { getFormattedDate } from "@/utils/util";
import RenderIf from "@/utils/RenderIf";

const OrderStatus = ({ orderDetail }: { orderDetail: any }) => (
  <div className="flex flex-row gap-1 items-center text-sm text-gray-700">
    <RenderIf isTrue={orderDetail?.orderStatus !== "CANCELED"}>
      <span>{getFormattedDate(orderDetail?.createdAt)}</span>
    </RenderIf>
    <span>MÃ ĐƠN HÀNG. {orderDetail?.id}</span>
    <span>|</span>
    <RenderIf isTrue={orderDetail?.orderStatus === "PENDING"}>
      <span>Đơn hàng chờ xác nhận</span>
    </RenderIf>
    <RenderIf isTrue={orderDetail?.orderStatus === "CANCELED"}>
      <span>Đơn hàng đã hủy</span>
      <span className="text-gray-500">({getFormattedDate(orderDetail?.cancelDate)})</span>
    </RenderIf>
    <RenderIf isTrue={orderDetail?.orderStatus === "COMPLETED"}>
      <span>Đơn hàng hoàn thành</span>
    </RenderIf>
  </div>
);

export default OrderStatus;
