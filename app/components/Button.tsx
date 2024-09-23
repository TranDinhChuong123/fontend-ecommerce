'use client'


import { IconType } from "react-icons";
import Image, { StaticImageData } from 'next/image';

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  rounded?: boolean;
  icon?: IconType;
  imageIcon?: { src: StaticImageData | string, alt: string };
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  styleIcon?: string,
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  rounded,
  icon: Icon,
  imageIcon,
  onClick,
  styleIcon = "text-slate-700"

}) => {


  return (
    <button onClick={onClick} disabled={disabled} className={`
      disabled:opacity-70 disabled:cursor-not-allowed 
      ${custom ? custom : "bg-teal-600"}
      hover:cursor-pointer hover:opacity-90 transition w-full border-slate-700
      flex items-center justify-center gap-2 
      ${outline ? "bg-white border-[1px]" : ""}
      ${outline ? "text-slate-700" : "text-white"}
      ${small ? "text-md font-medium" : "text-sm font-bold"}
      ${small ? "py-[5px] px-[5px] border-[1px]" : "py-3 px-4"}
      ${rounded ? " rounded-full" : " rounded-md"}
      ${!disabled ? "hover:cursor-pointer" : ""}
      
      `
    }>
      {Icon && <Icon className={styleIcon} size="24" />}
      {imageIcon && !Icon && (
        <Image

          src={imageIcon.src}
          alt={imageIcon.alt}
          width={22}    // Đặt kích thước cho hình ảnh
          height={22}   // Đặt kích thước cho hình ảnh
          className={`${styleIcon} object-contain`}
        />
      )}
      {label}

    </button>
  )
}

export default Button
