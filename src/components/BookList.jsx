'use client';

import React, { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import BookDetail from '@/components/BookDetail';
import { Loader2Icon } from 'lucide-react';
import AuthorDetail from '@/components/AuthorDetail';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2Icon className="animate-spin" />
        </div>
      </>
    );
  }

  if (selectedBook) {
    return (
      // <>BookDetail</>
      <BookDetail id={selectedBook} onBack={() => setSelectedBook(null)} />
    );
  }

  if (selectedAuthor) {
    return (
      // <>{console.log(selectedAuthor.author.id)} Author</>
      <AuthorDetail
        id={selectedAuthor.author.id}
        onBack={() => setSelectedAuthor(null)}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClickAuthor={() => setSelectedAuthor(book)}
            onClickDetail={() => setSelectedBook(book.id)}
          />
        ))}
      </div>
    </>
  );
}
