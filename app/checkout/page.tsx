import NavBar from "../components/nav/NavBar"
import CheckoutClient from "./CheckoutClient"

interface Props {
    searchParams: { method?: string };
}
const CheckOutPage: React.FC<Props> = ({ searchParams }) => {

    return (
        <div>
            <NavBar label="Thanh toán" />
            <div className="pt-4 bg-slate-50 p-6">
                <CheckoutClient method={searchParams.method || ''} />
            </div>
        </div>
    )
}

export default CheckOutPage
{/* Container with the checkout form and order summary */ }
