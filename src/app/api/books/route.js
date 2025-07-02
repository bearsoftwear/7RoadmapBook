import prisma from '@/lib/prisma';
import {NextResponse} from 'next/server';
import {cookies} from "next/headers";

export async function GET() {
    try {
        const books = await prisma.book.findMany({
            select: {
                id: true,
                title: true,
                ISBN: true,
                description: true,
                publishedAt: true,
                author: true,
                reviews: {select: {id: true, rating: true, comment: true, createdAt: true}},
            },
        });

        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch books'},
            {status: 500}
        );
    }
}

export async function POST(request) {
    try {
        const {bookId, rating, comment} = await request.json();
        if (!bookId) {
            return NextResponse.json({error: 'Book is required'}, {status: 400});
        }
        const review = await prisma.review.create({
            data: {bookId, rating, comment},
        });
        return NextResponse.json(review, {status: 201});
    } catch (error) {
        return NextResponse.json({error: 'Failed to create review'}, {status: 500})
    }
}

export async function PUT(request) {
    try {
        const {id, rating, comment} = await request.json();
        if (!id) {
            return NextResponse.json({error: "ID is required"}, {status: 400});
        }
        const review = await prisma.review.update({
            where: {id: parseInt(id)},
            data: {rating, comment},
        });
    } catch (error) {
        return NextResponse.json({error: "Failed to update review"}, {status: 500});
    }
}
