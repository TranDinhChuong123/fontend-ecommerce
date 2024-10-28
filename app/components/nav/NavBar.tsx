import Link from 'next/link'
import Container from '../Container'
import React from 'react'
import { Redressed } from "next/font/google"
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import getCurrentUser from '@/actions/getCurrentUser';
const redressed = Redressed({ subsets: ["latin"], weight: ['400'] });
import { FcShop } from "react-icons/fc";
import RenderIf from '@/utils/RenderIf';
import { CiSearch } from "react-icons/ci";
interface Props {
  label?: string;
  sticky?: boolean;
  notIsCart?: boolean
}
const NavBar: React.FC<Props> = async ({ label, sticky = false, notIsCart = false }) => {

  const currentUser = await getCurrentUser()

  return (
    <div className={` top-0 w-full z-30 shadow-sm text-slate-700 ${sticky ? 'sticky' : null}`}>
      <div className='py-5 border-b-[1px]'>
        <div
          className={` max-w-[1920px] 
            px-0
            mx-auto 
            xl:px-20
            md:px-0
            `}
        >
          <div className='flex items-center justify-between gap-3 md:gap-0'>

            <div className='flex flex-row gap-5 items-center'>
              <Link className={`${redressed.className} font-bold text-2xl flex flex-row gap-2 items-center`} href="/">
                <FcShop className='text-sky-500' size={44} />
                EconoMart
              </Link>
              <div className='text-xl border-l-[1px] border-slate-500 px-5'>{label}</div>
            </div>

            <div className=' flex flex-row items-center gap-1 border rounded-full pl-2'>
              <CiSearch size={24}/>
              <input type="text" className='focus:outline-none w-[300px] rounded-full px-4 py-2' />
              <button className='bg-teal-700 text-white px-3 py-2 rounded-r-full font-light'>

                Tìm kiếm
              </button>
            </div>
            <div className='flex items-center gap-8 md:gap-12'>
              <RenderIf isTrue={!notIsCart}>
                <CartCount />
              </RenderIf>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NavBar
