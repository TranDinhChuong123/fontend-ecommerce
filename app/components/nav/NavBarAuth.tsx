'use client'

import Link from 'next/link'
import Container from '../Container'
import React from 'react'
import { Redressed } from "next/font/google"
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import Button from '../Button';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaShop } from "react-icons/fa6";
import RenderIf from '@/utils/RenderIf'

const redressed = Redressed({ subsets: ["latin"], weight: ['400'] });


const NavBarAuth = () => {

  return (
    <div className=' sticky top-0 w-full bg-white z-30 shadow-md h-16 flex items-center justify-between gap-3 md:gap-0 px-6'>

      <Button
        icon={IoIosArrowRoundBack}
        custom='border-0 w-[220px] h-16 '
        label='EconoMart'
        styleIcon='w-6 h-6 text-slate-700'
        outline

        onClick={() => window.history.back()}

      />





    </div>
  )
}

export default NavBarAuth
