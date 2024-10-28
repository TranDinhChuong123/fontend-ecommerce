'use client'

import React, { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { AiFillCaretDown } from 'react-icons/ai'
import MenuItem from './MenuItem'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import BackDrop from './BackDrop'
import { useRouter } from 'next/navigation'
import RenderIf from '@/utils/RenderIf'

interface UserMenuProps {
  currentUser: any | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <div className='relative z-30'>
      <div onClick={toggleOpen}
        className='p-2 border-slate-400 flex
        flex-row items-center gap-1
        rounded-full cursor-pointer hover:shadow-md
        transition text-slate-700 border-[1px]'
      >
        {/* Lỗi chưa xử lý ở đây */}
        <Avatar />
        <p className='text-sm'>{currentUser?.name || currentUser?.email}</p>
        <AiFillCaretDown />
      </div>

      {/* {isOpen && (
        <div className='absolute
          right-0 top-12 overflow-hidden
          w-48 bg-white
          rounded-md shadow-md  text-sm
          p-2 flex flex-col cursor-pointer z-50'>
          {currentUser ? (
            <div>

              <Link href="orders">
                <MenuItem onClick={toggleOpen}>
                  Your Orders
                </MenuItem>
              </Link>
              <Link href="/admin">
                <MenuItem onClick={toggleOpen}>
                  Admin Dashboard
                </MenuItem>
              </Link>

              <MenuItem onClick={() => {
                toggleOpen();
                signOut({ callbackUrl: '/auth/login' });
              }}>
                Logout
              </MenuItem>
            </div>
          ) : (
            <div>
              <Link href="auth/login">
                <MenuItem onClick={toggleOpen}>
                  Login
                </MenuItem>
              </Link>
              <Link href="auth/register">
                <MenuItem onClick={toggleOpen}>
                  Register
                </MenuItem>
              </Link>
            </div>
          )}




        </div>
      )} */}

      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
      <RenderIf isTrue={isOpen}>
        <div className='absolute
          right-0 top-12 overflow-hidden
          w-48 bg-white
          rounded-md shadow-md  text-sm
          p-2 flex flex-col cursor-pointer z-50'>
          <RenderIf isTrue={currentUser}>
            <div>

              <Link href="orders">
                <MenuItem onClick={toggleOpen}>
                  Tài khoản của tôi
                </MenuItem>
              </Link>
              <Link href="/user/purchase">
                <MenuItem onClick={toggleOpen}>
                  Đơn hàng
                </MenuItem>
              </Link>

              <MenuItem onClick={() => {
                toggleOpen();
                signOut({ callbackUrl: '/auth/login' });
              }}>
                Đăng xuất
              </MenuItem>
            </div>
          </RenderIf>
          <RenderIf isTrue={!currentUser}>
            <div>
              <Link href="auth/login">
                <MenuItem onClick={toggleOpen}>
                  Đăng nhập
                </MenuItem>
              </Link>
              <Link href="auth/register">
                <MenuItem onClick={toggleOpen}>
                  Register
                </MenuItem>
              </Link>
            </div>
          </RenderIf>
        </div>
        <BackDrop onClick={toggleOpen} />
      </RenderIf>

    </div>
  )
}

export default UserMenu
