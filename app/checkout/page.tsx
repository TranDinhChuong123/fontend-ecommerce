import useCart from "@/hooks/useCart"
import Container from "../components/Container"
import CartClient from "./CheckoutClient"
import getCurrentUser from "@/actions/getCurrentUser"
import NavBar from "../components/nav/NavBar"


const CheckOutPage = async () => {
    const currentUser = await getCurrentUser()
    return (
        <div>
            <NavBar label="Thanh toán"  />
            <div className="pt-4 bg-slate-50 p-6">
                <CartClient currentUser={currentUser} />
            </div>
        </div>
    )
}

export default CheckOutPage
