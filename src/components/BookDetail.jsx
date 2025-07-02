'use client';

import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Calendar, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import ReviewsSection from "./ReviewsSection";
import Image from "next/image";

export default function BookDetail({book, onUpdateReviews}) {
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

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
            </div>
        )
    }

    return (
        <>
            <div className="max-w-4xl mx-auto">
                {/* Book Information */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="flex-shrink-0 w-full sm:w-48">
                                <div className="w-full sm:w-48 aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden shadow-lg mx-auto">
                                    <Image
                                        src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`}
                                        alt={`Cover of ${book.title}`}
                                        className="w-full h-full object-cover"
                                        width="240"
                                        height="360"
                                        onError={(e) => {
                                            e.currentTarget.src = "/placeholder.svg?height=360&width=240"
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 w-full">
                                <CardTitle className="text-2xl sm:text-3xl mb-3">{book.title}</CardTitle>
                                <CardDescription className="text-lg sm:text-xl mb-4">by {book.author}</CardDescription>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4"/>
                                        Published {formatDate(book.publishedAt)}
                                    </div>
                                    <Badge variant="outline" className="w-fit">
                                        ISBN: {book.ISBN}
                                    </Badge>
                                </div>
                                {book.reviews?.length > 0 && (
                                    <div className="flex items-center gap-2 mb-4">
                                        {renderStars(getAverageRating(book.reviews))}
                                        <span className="text-xl font-semibold">{getAverageRating(book.reviews).toFixed(1)}</span>
                                        <span className="text-gray-600">
                    ({book.reviews.length} review{book.reviews.length !== 1 ? "s" : ""})
                  </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">{book.description}</p>
                    </CardContent>
                </Card>

                {/* Reviews Section */}
                <ReviewsSection book={book} onUpdateReviews={onUpdateReviews}/>
            </div>
        </>
    )
}
