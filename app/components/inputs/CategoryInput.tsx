
import Image from "next/image";
import { IconType } from "react-icons";

interface CategoryInputProps {
    selected?: boolean;
    label: string;
    imageUrl: string;
    onClick: (value: string) => void;
    slug: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    selected,
    label,
    imageUrl,
    onClick,
    slug
}) => {
    return (
        <div
            className={`flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-105 
                        border-2 rounded-lg p-4 space-y-2 text-center 
                        ${selected ? 'bg-blue-100 border-blue-500' : 'bg-white border-slate-300'}
                        shadow-lg hover:shadow-xl`}
            onClick={() => onClick(slug)}
        >
            <div className={`transition-all ${selected ? 'text-blue-500' : 'text-slate-600'}`}>
                <Image src={imageUrl || ''} alt={label} width={50} height={50}  />
            </div>
            <div className={`font-semibold text-sm ${selected ? 'text-blue-500' : 'text-slate-600'}`}>
                {label}
            </div>
        </div>
    );
};

export default CategoryInput;

