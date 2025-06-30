'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ book, onClickDetail, onClickAuthor }) {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <Image
            src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-S.jpg`}
            alt="Book Cover"
            className="w-16 h-24 rounded-md mr-4"
            width="16"
            height="24"
          />
          <div>
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <Button onClick={onClickAuthor} variant="link" className="cursor-pointer text-gray-500 dark:text-gray-400 p-0">
              {book.author.name}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                // Fill primary if i < avgRating, else muted
                fill={
                  i < Math.round(book.avgRating || 0) ? 'currentColor' : 'none'
                }
                stroke={
                  i < Math.round(book.avgRating || 0)
                    ? 'var(--primary)'
                    : 'var(--muted-foreground)'
                }
                style={{
                  color:
                    i < Math.round(book.avgRating || 0)
                      ? 'var(--primary)'
                      : 'var(--muted-foreground)',
                }}
              />
            ))}
            {book.avgRating && (
              <span className="ml-1">{book.avgRating.toFixed(1)}</span>
            )}
          </div>
          <Button
            type="button"
            onClick={onClickDetail}
            className="cursor-pointer inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            Read More
          </Button>
        </div>
      </div>

      {/* <Card>
        <img
          src="/placeholder.svg"
          width={300}
          height={450}
          alt="Book Cover"
          className="rounded-t-xl"
          style={{ aspectRatio: '300/450', objectFit: 'cover' }}
        />
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">The Great Gatsby</h3>
          <p className="text-gray-500 dark:text-gray-400">
            F. Scott Fitzgerald
          </p>
        </CardContent>
      </Card> */}

      {/* <Card className="w-full max-w-sm rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="w-full h-56 bg-muted/30 overflow-hidden">
          <img
            src="/placeholder.svg"
            alt={`${book.title} cover`}
            className="w-full h-full object-cover"
          />
        </div>

        <CardHeader className="space-y-1 pb-2 gap">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {book.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {book.author?.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 pt-0">
          <div className="flex flex-wrap gap-1">
            {book.genres?.map((genre) => (
              <Badge key={genre.id} variant="outline" className="text-xs">
                {genre.name}
              </Badge>
            ))}
          </div>
          <p className="text-sm line-clamp-3">{book.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            {book.publishedAt && new Date(book.publishedAt).getFullYear()}
          </div>
          {console.log(book)}
          {book.averageRating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {book.averageRating.toFixed(1)}
            </div>
          )}
        </CardFooter>
      </Card> */}
    </>
  );
}
