import RenderIf from "@/utils/RenderIf";
import BackDrop from "@/app/components/nav/BackDrop";
import ListReason from "@/app/user/purchase/order/ListReason";

const CancelButton = ({
  status,
  isOpen,
  toggleOpen,
  orderId,
  cancelReason,
}: {
  status: string;
  isOpen: boolean;
  toggleOpen: () => void;
  orderId: string;
  cancelReason?: string;
}) => {
  return (
    <div className="flex flex-col px-6 py-5 bg-white rounded-xl shadow-md w-full">
      {/* Display cancel reason if the order is canceled */}
      <RenderIf isTrue={status === "CANCELED"}>
        <div className="flex flex-row justify-start w-full bg-red-50 p-3 rounded-lg">
          <p className="text-red-600 font-semibold mr-2">Lý do Hủy đơn hàng:</p>
          <p className="text-gray-700">{cancelReason}</p>
        </div>
      </RenderIf>

      {/* Show the cancel button if the order is pending */}
      <RenderIf isTrue={status === "PENDING"}>
        <button
          className="w-full py-3 px-6 mt-4 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300"
          onClick={toggleOpen}
        >
          Hủy đơn hàng
        </button>
      </RenderIf>

      {/* Show the ListReason component and backdrop when modal is open */}
      <RenderIf isTrue={isOpen}>
        <ListReason orderId={orderId} onClose={toggleOpen} />
        <BackDrop onClick={toggleOpen} />
      </RenderIf>
    </div>
  );
};

export default CancelButton;

