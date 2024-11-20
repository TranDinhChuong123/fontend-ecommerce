import decodeToken from "@/utils/decodeToken";
import { useSession } from "next-auth/react";

const useCurrentUser = () => {
    const { data: session, status } = useSession();
    return decodeToken(session?.user?.accessToken || " ").sub || null;
};

export default useCurrentUser;
