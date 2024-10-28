

import useCart from "@/hooks/useCart"
import Container from "../components/Container"
import CartClient from "./CartClient"
import getCurrentUser from "@/actions/getCurrentUser"
import NavBar from "../components/nav/NavBar"


const Cart = async () => {
    const currentUser = await getCurrentUser()
    return (
        <div>
            <NavBar label="Giỏ hàng"  notIsCart/>
            <div className="pt-4">
                <Container>
                    <CartClient currentUser={currentUser} />
                </Container>
            </div>
        </div>

    )
}

export default Cart
