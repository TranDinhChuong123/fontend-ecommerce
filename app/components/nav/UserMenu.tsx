'use client'

import React, { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { AiFillCaretDown } from 'react-icons/ai'
import MenuItem from './MenuItem'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import BackDrop from './BackDrop'
import { SafeUser } from '@/types'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  currentUser: SafeUser | null
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
        <AiFillCaretDown />
      </div>
      {isOpen && (
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
                signOut({ callbackUrl: '/login' });
              }}>
                Logout
              </MenuItem>
            </div>
          ) : (
            <div>
              <Link href="/login">
                <MenuItem onClick={toggleOpen}>
                  Login
                </MenuItem>
              </Link>
              <Link href="/register">
                <MenuItem onClick={toggleOpen}>
                  Register
                </MenuItem>
              </Link>
            </div>
          )}




        </div>
      )}
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}

    </div>
  )
}

export default UserMenu
