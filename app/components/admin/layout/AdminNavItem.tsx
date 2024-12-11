
import { IconType } from "react-icons"

interface AdminNavItemProps {
    selected?: boolean,
    icon: IconType,
    label: string,
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
    selected,
    icon: Icon,
    label,
}) => {
    return (
        <div className={`flex items-center justify-center gap-1 text-center 
        p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
        ${selected
                ? 'text-slate-800 border-slate-800'
                : 'border-transparent text-slate-600'} `}>
            <Icon className="text-red-600" size={20} />
            <div className="font-medium text-center text-sm break-normal">{label}</div>
        </div>
    )
}

export default AdminNavItem
