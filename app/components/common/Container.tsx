

interface ContainerProps {
    children: React.ReactNode
    styleCustom?: string
}
const Container: React.FC<ContainerProps> = ({ children, styleCustom }) => {
    return (
        <div
            className={` max-w-[1920px] ${styleCustom} 
            px-4
            mx-auto 
            xl:px-20
            md:px-2
            `}

        >
            {children}
        </div>
    )
}

export default Container
