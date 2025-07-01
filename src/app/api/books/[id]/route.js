import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
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
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        genres: {
          select: {
            genre: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        reviews: {
          select: {
            rating: true,
            comment: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        logs: {
          select: {
            status: true,
            startedAt: true,
            finishedAt: true,
            notes: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },  
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Calculate average rating
    const avgRating =
      book.reviews.length > 0
        ? book.reviews.reduce((sum, r) => sum + r.rating, 0) /
          book.reviews.length
        : null;

    const result = {
      ...book,
      avgRating,
      genres: book.genres.map((g) => g.genre),
    };

    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch book details' },
      { status: 500 }
    );
  }
}
