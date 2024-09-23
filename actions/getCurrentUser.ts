import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { assert } from "console"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"



export async function getSession() {
    return await getServerSession(authOptions)
}

const getCurrentUser = async () => {
    // const { data: session } = useSession();
    try {
        const session = await getSession()

        if (!session?.user) {
            return null
        }

        const currentUser = session?.user

        if (!currentUser) {
            return null
        }

        return currentUser

    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser
