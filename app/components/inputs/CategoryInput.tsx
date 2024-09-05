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
        <div className={`flex flex-col gap-2 items-center cursor-pointer
                border-2 rounded-xl p-4 transition hover:border-slate-500
                ${selected ? 'border-slate-500' : 'border-slate-200'}
            `}
            onClick={() => onClick(label)}
        >

            <Icon size={30} />
            <div className="font-normal">
                {label}
            </div>
        </div>
    )
}

export default CategoryInput
