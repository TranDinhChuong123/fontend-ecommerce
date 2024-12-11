import React from 'react'
import Container from '../common/Container'
import FooterList from './FooterList'
import Link from 'next/link'
import { MdFacebook } from 'react-icons/md'
import { AiFillInstagram, AiFillTwitch, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'

const Footer = () => {
    return (
        <footer className='bg-slate-700 text-slate-200 text-sm'>
            <Container>

                <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
                    <FooterList>
                        <h3 className='text-base font-bold mb-2'>
                            Danh mục cửa hàng</h3>
                        <Link href='/category?q=dien-thoai-smartphone'>Điện thoại</Link>
                        <Link href='/category?q=thoi-trang-nam'>Áo Thời trang</Link>
                        <Link href='/category?q=dien-gia-dung'>Điện gia dụng</Link>
                        <Link href='/category?q=giay-the-thao'>Giày thể thao</Link>

                    </FooterList>
                    <FooterList>
                        <h3 className='text-base font-bold mb-2'>Dịch vụ khách hàng</h3>
                        <Link href='#'>Liên hệ với chúng tôi</Link>
                        <Link href='#'>Chính sách vận chuyển</Link>
                        <Link href='#'>Chính sách đổi trả</Link>
                        <Link href='#'>Câu hỏi thường gặp (FAQs)</Link>
                    </FooterList>
                    <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                        <h3 className='text-base font-bold mb-2'>Về chúng tôi</h3>

                        <p className='mb-2'>Tại cửa hàng điện tử của chúng tôi, chúng tôi cam kết cung cấp các thiết bị và phụ kiện mới nhất và tốt nhất cho khách hàng. Với một bộ sưu tập đa dạng các sản phẩm như điện thoại, TV, laptop, đồng hồ và phụ kiện.</p>
                        <p>&copy; {new Date().getFullYear()} E-shop. Tất cả quyền được bảo lưu</p>
                    </div>

                    <FooterList>
                        <h3 className='text-base font-bold mb-2'>Flow Us</h3>
                        <div className='flex gap-2'>
                            <Link href='#'><MdFacebook size={24} /></Link>
                            <Link href='#'><AiFillTwitterCircle size={24} /></Link>
                            <Link href='#'><AiFillInstagram size={24} /></Link>
                            <Link href='https://www.youtube.com/'><AiFillYoutube size={24} /></Link>
                        </div>
                    </FooterList>
                </div>
            </Container>

        </footer>
    )
}

export default Footer
