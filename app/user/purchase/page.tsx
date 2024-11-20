

import NavBar from '@/app/components/nav/NavBar'
import UserOrder from './UserOrder'
import getCurrentUser from '@/actions/getCurrentUser';

interface Props {
  searchParams?: { status?: string };
}

const PurchasePage: React.FC<Props> = async ({ searchParams }) => {
  const currentUser = await getCurrentUser();
  return (
    <div>
    
      <UserOrder currentUser={currentUser?.username} status={searchParams?.status} />
    </div>
  )
}

export default PurchasePage
