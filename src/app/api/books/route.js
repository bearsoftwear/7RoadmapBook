import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        ISBN: true,
        // description: true,
        publishedAt: true,
        author: { select: { id: true, name: true } },
        reviews: { select: { rating: true } },
      },
    });

    const booksWithAvgRating = books.map((book) => ({
      id: book.id,
      title: book.title,
      ISBN: book.ISBN,
      description: book.description,
      publishedAt: book.publishedAt,
      author: book.author,
      avgRating:
        book.reviews.length > 0
          ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
            book.reviews.length
          : null,
    }));

    return NextResponse.json(booksWithAvgRating);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
