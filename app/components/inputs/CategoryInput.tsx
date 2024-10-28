import { IconType } from "react-icons";

interface CategoryInputProps {
    selected?: boolean;
    label: string,
    icon: IconType,
    onClick: (value: string) => void;

}

const CategoryInput: React.FC<CategoryInputProps> = ({
    selected,
    label,
    icon: Icon,
    onClick,

}) => {
    return (
        <div className={`flex flex-col gap-1 items-center cursor-pointer h-[70px] w-[100px]
                border-2 rounded-xl p-2 transition hover:border-slate-500
                ${selected ? 'border-slate-500' : 'border-slate-200'}
            `}
            onClick={() => onClick(label)}
        >

            <Icon size={20} />
            <div className="font-normal">
                {label}
            </div>
        </div>
    )
}

export default CategoryInput
