'use client'

import Link from 'next/link'
import Container from '../Container'
import React, { useState } from 'react'
import { Redressed } from "next/font/google"
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import getCurrentUser from '@/actions/getCurrentUser';
const redressed = Redressed({ subsets: ["latin"], weight: ['400'] });
import { FcShop } from "react-icons/fc";
import RenderIf from '@/utils/RenderIf';
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from 'next-auth/react'
import handleApiCall from '@/services/handleApiCall'

import axios from '@/services/axios/publicAxios';
import { useRouter } from 'next/navigation'
import decodeToken from '@/utils/decodeToken'

interface Props {
  isPageHome?: boolean
  label?: string;
  sticky?: boolean;
  notIsCart?: boolean
  query?: string
  onSearch?: (searchQuery: string) => void
  valueSearch?: string
}
const NavBar: React.FC<Props> = ({ label, sticky = false, notIsCart = false, query, onSearch, isPageHome, valueSearch = '' }) => {


  const { data: session } = useSession();
  console.log("session", session);
  let decode;
  if (session?.user?.accessToken) {
    decode = decodeToken(session?.user?.accessToken || " ")
    console.log("decode", decode);
  }



  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>(valueSearch || '');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue)
    }
  }


  return (
    <div className={` top-0 w-full z-30 shadow-sm text-slate-700 ${sticky ? 'sticky' : null}`}>
      <div className='py-4 border-b-[1px] pt-8'>
        <div
          className={` max-w-[1920px] 
            px-0
            mx-auto 
            xl:px-20
            md:px-0
            `}
        >
          <div className='flex items-start justify-between gap-3 md:gap-0'>
            <div className='flex flex-row gap-5 items-center'>
              <Link className={`${redressed.className} font-bold text-2xl flex flex-row gap-2 items-center`} href="/">
                <FcShop className='text-sky-500' size={44} />
                EconoMart
              </Link>
              <div className='text-xl border-l-[1px] border-slate-500 px-5'>{label}</div>
            </div>

            <div>
              <div className=' flex flex-row items-center gap-1 border rounded-full pl-2 mx-32'>
                <CiSearch size={24} />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className='focus:outline-none w-full rounded-full px-4 py-2' />
                <RenderIf isTrue={isPageHome || false}>
                  <button
                    onClick={() => inputValue ? router.push('/search?keyword=' + inputValue) : {}}
                    className='bg-teal-700 text-white px-3 py-2 rounded-r-full font-light w-[170px]'>
                    Tìm kiếm
                  </button>
                </RenderIf>



                <RenderIf isTrue={!isPageHome}>
                  <button
                    onClick={inputValue ? handleSearch : () => { }}
                    className='bg-teal-700 text-white px-3 py-2 rounded-r-full font-light w-[170px]'>
                    Tìm kiếm
                  </button>
                </RenderIf>

              </div>
              {/* <div className='flex flex-row items-center gap-8 mt-5 text-slate-500 '>
                <Link className={`${query === 'san-pham-moi' ? ' text-slate-700 underline' : null}`} href='/collections?q=san-pham-moi'>
                  SẢN PHẨM MỚI
                </Link>
                <Link className={`${query === 'san-pham-sale' ? ' text-slate-700 underline' : null}`} href='/collections?q=san-pham-sale'>
                  SẢN PHẨM SALE
                </Link>
                <Link className={`${query === 'san-pham-ban-chay' ? ' text-slate-700 underline' : null}`} href='/collections?q=san-pham-ban-chay'>
                  SẢN PHẨM BÁN CHẠY
                </Link>

                <Link className={`${query === 'san-pham-gia-tot' ? ' text-slate-700 underline' : null}`} href='/collections?q=san-pham-gia-tot'>
                  SẢN PHẨM GIÁ TỐT
                </Link>

              </div> */}
              <div className="flex flex-wrap items-center gap-6 mt-5 text-slate-500">
                <Link
                  className={`${query === 'san-pham-moi' ? 'text-slate-700 underline font-semibold' : 'hover:text-teal-700'
                    } transition-all duration-300 ease-in-out`}
                  href="/collections?q=san-pham-moi"
                >
                  SẢN PHẨM MỚI
                </Link>
                <Link
                  className={`${query === 'san-pham-sale' ? 'text-slate-700 underline font-semibold' : 'hover:text-teal-700'
                    } transition-all duration-300 ease-in-out`}
                  href="/collections?q=san-pham-sale"
                >
                  SẢN PHẨM SALE
                </Link>
                <Link
                  className={`${query === 'san-pham-ban-chay' ? 'text-slate-700 underline font-semibold' : 'hover:text-teal-700'
                    } transition-all duration-300 ease-in-out`}
                  href="/collections?q=san-pham-ban-chay"
                >
                  SẢN PHẨM BÁN CHẠY
                </Link>
                <Link
                  className={`${query === 'san-pham-gia-tot' ? 'text-slate-700 underline font-semibold' : 'hover:text-teal-700'
                    } transition-all duration-300 ease-in-out`}
                  href="/collections?q=san-pham-gia-tot"
                >
                  SẢN PHẨM GIÁ TỐT
                </Link>
              </div>

            </div>
            <div className='flex items-center gap-3 md:gap-12'>
              <RenderIf isTrue={!notIsCart}>
                <CartCount />
              </RenderIf>
              <UserMenu currentUser={session?.user.name || decode?.sub} />
            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default NavBar
