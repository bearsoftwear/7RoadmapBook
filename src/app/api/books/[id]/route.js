import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        title: true,
        ISBN: true,
        description: true,
        publishedAt: true,
        author: { select: { name: true } },
        reviews: { select: { rating: true } },
      },
    });
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch book details' },
      { status: 500 }
    );
  }
}
