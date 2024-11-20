import { RiMapPin2Line } from "react-icons/ri";

const AddressDetail = ({ address }: { address: any }) => (
       <div className="bg-white rounded-xl p-6 shadow-sm text-gray-700">
          <div className="flex flex-row items-center gap-2 mb-4 text-xl font-semibold">
            <RiMapPin2Line />
            <span>Địa chỉ nhận hàng</span>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <strong>Người nhận:</strong> {address.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {address.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {address.street}
            </p>
          </div>
        </div>
);

export default AddressDetail;
