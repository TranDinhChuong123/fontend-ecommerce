
interface FooterListProps {
    children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
    // gap-2 đặt khoảng cách giữa các phần tử con thành 0.5rem (hoặc 8px).
    return (
        <div className='flex flex-col gap-2 w-full mb-6 
        sm:w-1/2 
        md:w-1/4 
        lg:w-1/6 
        '>
            {children}
        </div>
    )
}

export default FooterList
