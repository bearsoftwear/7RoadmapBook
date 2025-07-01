import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'Author ID is required' },
      { status: 400 }
    );
  }

  try {
    const author = await prisma.author.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        books: {
          select: {
            id: true,
            title: true,
            ISBN: true,
            description: true,
            publishedAt: true,
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
    });

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    const authorsBooksWithAvgRating = author.books.map((book) => ({
      id: book.id,
      title: book.title,
      ISBN: book.ISBN,
      description: book.description,
      publishedAt: book.publishedAt,
      avgRating:
        book.reviews.length > 0
          ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
            book.reviews.length
          : null,
    }));

    console.log(author.books.reviews);
    author.books = authorsBooksWithAvgRating;

    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Author details' },
      { status: 500 }
    );
  }
}
