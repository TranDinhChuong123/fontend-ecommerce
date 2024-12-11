import decodeToken from "@/utils/decodeToken";
import { useSession } from "next-auth/react";

const useCurrentUser = () => {
    const { data: session, status } = useSession();

    // Kiểm tra nếu session và accessToken tồn tại
    if (session?.user?.accessToken) {
        const decoded = decodeToken(session.user.accessToken);
        return decoded?.sub || null;  // Trả về sub hoặc null nếu không có sub
    }
    
    return null;  // Nếu không có accessToken, trả về null
};
export default useCurrentUser;
