
import { fetchRefreshTokenAPI } from '@/services/authService'
import { useSession } from 'next-auth/react'

const useRefreshToken = () => {
    const { data: session } = useSession()


    const refreshToken = async () => {
        if (session?.user.refreshToken && session.user) {
            const resData = await fetchRefreshTokenAPI(session.user.refreshToken)
            session.user.accessToken = resData.accessToken
            session.user.refreshToken = resData.refreshToken
            console.log("session.user", session.user);
            
            
        }
    }
    return refreshToken
}

export default useRefreshToken
