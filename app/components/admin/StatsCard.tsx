
import React from 'react'
import { IconType } from 'react-icons';
interface StatsCardProps {
    icon?: IconType;
    title: string,
    value: number| string;
}
const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, title, value }) => {
    return (
        <div>
            <div className=" flex flex-row items-center p-6 bg-white rounded-lg shadow-lg gap-4 text-slate-700">
                <div>
                    {Icon && <Icon className='rounded-full ' size="34" />}
                </div>

                <div className='flex flex-col items-start gap-2 '>
                    <span className='text-xl '>{title}</span>
                    <span className='text-3xl font-medium'>{value}</span>
                </div>
            </div>
        </div>  
    )
}

export default StatsCard
