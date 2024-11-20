// import { RiMapPin2Line } from "react-icons/ri";
// import RenderIf from '@/utils/RenderIf';

// interface AddressInfoProps {
//     address: any | null;
//     onChangeAddress: () => void;
// }

// const AddressInfo: React.FC<AddressInfoProps> = ({ address, onChangeAddress }) => (
//     <div className="bg-white rounded-md px-8 py-4 shadow-md">
//         <div className="flex flex-row gap-2 text-xl items-center">
//             <RiMapPin2Line />
//             <p>Địa chỉ nhận hàng</p>
//         </div>
//         <div className="flex flex-row gap-5 items-center justify-between">
//             <RenderIf isTrue={address !== null}>
//                 <div className="flex flex-row gap-5">
//                     <p>{address?.name}</p>
//                     <p>{address?.phoneNumber}</p>
//                     <p>{address?.street}</p>
//                 </div>
//             </RenderIf>
//             <button className="flex flex-row h-10 items-center gap-2 justify-center text-blue-500" onClick={onChangeAddress}>
//                 <p>Thay đổi</p>
//             </button>
//         </div>
//     </div>
// );

// export default AddressInfo;
import { RiMapPin2Line } from "react-icons/ri";
import RenderIf from '@/utils/RenderIf';

interface AddressInfoProps {
    address: any | null;
    onChangeAddress: () => void;
}

const AddressInfo: React.FC<AddressInfoProps> = ({ address, onChangeAddress }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
            <RiMapPin2Line size={24} className="text-blue-500" />
            <p>Địa chỉ nhận hàng</p>
        </div>
        <div className="flex items-center justify-between mt-4">
            <RenderIf isTrue={address !== null}>
                <div className="flex flex-col gap-2 text-gray-700">
                    <p className="text-lg font-medium">{address?.name}</p>
                    <p className="text-sm">{address?.phoneNumber}</p>
                    <p className="text-sm">{address?.street}</p>
                </div>
            </RenderIf>
            <button
                className="px-4 py-2 text-sm font-semibold text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors duration-200"
                onClick={onChangeAddress}
            >
                Thay đổi
            </button>
        </div>
    </div>
);

export default AddressInfo;

