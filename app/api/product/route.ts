import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'

// Bước 2: Xử lý yêu cầu đăng ký người dùng tại API

export const POST = async (req: Request) => {
    const currentUer = await getCurrentUser();

    if (!currentUer || currentUer?.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 })
    }


    const {
        name,
        description,
        brand,
        category,
        price,
        images,
        inStock
    } = await req.json()


    const product = await prisma.product.create({
        data: {
            name,
            description,
            brand,
            category,
            inStock,
            images,
            price: parseFloat(price)
        },
    })

    return NextResponse.json(product)


}