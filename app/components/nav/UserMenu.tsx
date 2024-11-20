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
import { truncateText } from '@/utils/util'
import AuthForm from '@/app/components/auth/AuthForm'

interface UserMenuProps {
  currentUser: any | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(true)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const toggleOpenModal = useCallback(() => {
    setIsOpenModal((prev) => !prev)
  }, [])

  console.log("currentUser", currentUser);

  return (
    <div className='relative z-30'>
      <div onClick={toggleOpen}
        className='p-2 border-slate-400 flex
        flex-row items-center gap-1
        rounded-full cursor-pointer hover:shadow-md
        transition text-slate-700 border-[1px] h-10'
      >
        <Avatar />
        <p className='text-sm'>{truncateText(currentUser || '', 10)}</p>
        <AiFillCaretDown size={10} />
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
                  Tài khoản của tôi
                </MenuItem>
              </Link>
              <Link href="/user/purchase">
                <MenuItem onClick={toggleOpen}>
                  Đơn hàng
                </MenuItem>
              </Link>

              <MenuItem onClick={() => {
                signOut({ callbackUrl: '/auth/login' });
              }}>
                Đăng xuất
              </MenuItem>
            </div>
          ) : (
            <div>
              <Link href="auth/login">
                <MenuItem onClick={toggleOpen}>
                  Đăng nhập
                </MenuItem>
              </Link>
              <Link href="auth/register">
                <MenuItem onClick={toggleOpen}>
                  Đăng ký
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
