'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function AuthorDetail({ id, onBack }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch(`/api/author/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Assuming book is an object with properties like title, author, etc.
        // You can set the book state here if needed
        setAuthor(data);
      })
      .catch((error) => {
        console.error('Error fetching author details:', error);
      });
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-0 hover:bg-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Books
      </Button>
      <div className="max-w-2xl mx-auto mt-8">
        {author ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{author.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <section>
                <h3 className="text-lg font-semibold mb-2">Books</h3>
                <ul className="space-y-4">
                  {author.books && author.books.length > 0 ? (
                    author.books.map((book) => (
                      <li
                        key={book.id}
                        className="border-b pb-2 flex gap-4 items-start"
                      >
                        <Image
                          src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-M.jpg`}
                          alt="Book Cover"
                          width="60"
                          height="60"
                          className="rounded shadow"
                        />
                        <div>
                          <strong>{book.title}</strong> (
                          {new Date(book.publishedAt).getFullYear()})<br />
                          <span className="text-sm text-muted-foreground">
                            ISBN: {book.ISBN}
                          </span>
                          <br />
                          <span>{book.description}</span>
                          <br />
                          {book.avgRating !== null && (
                            <span className="text-yellow-600">
                              Average Rating: {book.avgRating}
                            </span>
                          )}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No books found.</li>
                  )}
                </ul>
              </section>
            </CardContent>
          </Card>
        ) : (
          <div>Loading author details...</div>
        )}
      </div>
    </>
  );
}
