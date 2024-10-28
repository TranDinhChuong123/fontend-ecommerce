import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {

  if (src) {
    return (
      <Image src={src} alt="Avatar"
        className="rounded-full"
        width="30" height="30"
      />
    )

  }else{
    return <FaUserCircle size={28} className="text-slate-500"/>
  };


}

export default Avatar
