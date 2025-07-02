'use client';

import React, {useEffect, useState} from 'react';
import BookCard from '@/components/BookCard';
import BookDetail from '@/components/BookDetail';
import {ArrowLeft, Loader2Icon} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Skeleton} from '@/components/ui/skeleton';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    // Fetch Book
    useEffect(() => {
        fetch('api/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                setLoading(false);
                setBooksLength(data.length);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const getAverageRating = (reviews) => {
        if (reviews.length === 0) return 0
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
        return sum / reviews.length
    }

    const updateBookReviews = (bookId, reviews) => {
        setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? {...book, reviews} : book)))
        if (selectedBook && selectedBook.id === bookId) {
            setSelectedBook({...selectedBook, reviews})
        }
    }

    // if (loading) {
    //     return (
    //         <>
    //             <div className="flex items-center justify-center min-h-screen">
    //                 <Loader2Icon className="animate-spin"/>
    //             </div>
    //         </>
    //     );
    // }

    if (selectedBook) {
        return (
            // <>BookDetail</>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <Button variant="ghost" onClick={() => setSelectedBook(null)} className="mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Back to Library
                    </Button>
                    <BookDetail
                        book={selectedBook}
                        onUpdateReviews={(reviews) => updateBookReviews(selectedBook.id, reviews)}
                    />
                </div>
            </div>);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Library</h1>
                        <p className="text-gray-600">Discover and review your favorite books</p>
                    </div>

                    {error && (
                        <div className="text-center p-6 bg-red-50 text-red-600 rounded-lg mb-8">
                            Error loading books: {error}. Please try again later.
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {loading
                            ? Array(10)
                                .fill()
                                .map((_, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <Skeleton className="aspect-[2/3] w-full rounded-lg"/>
                                        <Skeleton className="h-4 w-3/4"/>
                                        <Skeleton className="h-3 w-1/2"/>
                                    </div>
                                ))
                            : books.map((book) => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onBookClick={() => setSelectedBook(book)}
                                    formatDate={formatDate}
                                    getAverageRating={getAverageRating}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}
