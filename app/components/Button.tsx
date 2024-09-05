'use client'


import { IconType } from "react-icons";
import Image, { StaticImageData } from 'next/image';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  imageIcon?: { src: StaticImageData, alt: string };
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  colorIcon?: string
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  imageIcon,
  onClick,
  colorIcon = "text-slate-700"

}) => {


  return (
    <button onClick={onClick} disabled={disabled} className={`
      disabled:opacity-70 disabled: cursor-not-allowed 
      rounded-md hover:opacity-80 transition w-full border-slate-700
      flex items-center justify-center gap-2 
      ${outline ? "bg-white" : "bg-slate-700"}
      ${outline ? "text-slate-900" : "text-white"}
      ${small ? "text-md font-normal" : "text-sm font-bold"}
      ${small ? "py-2 px-2 border-[1px]" : "py-3 px-4 border-2"}
      ${custom ? custom : ""}
      ${!disabled ? "hover:cursor-pointer" : ""}
      `
    }>
      {Icon && <Icon className={colorIcon} size="24" />}
      {imageIcon && !Icon && (
        <Image
          src={imageIcon.src}
          alt={imageIcon.alt}
          width={22}    // Đặt kích thước cho hình ảnh
          height={22}   // Đặt kích thước cho hình ảnh
          className={colorIcon}
        />
      )}
      {label}

    </button>
  )
}

export default Button
