"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar, Star} from "lucide-react"
import Image from "next/image";

export default function BookCard({book, onBookClick, formatDate, getAverageRating}) {
    const averageRating = getAverageRating(book.reviews)

    return (
        <Card className="hover:shadow-lg transition-shadow cursor-pointer py-0 gap-1" onClick={onBookClick}>
            <CardHeader className="relative p-0">
                <div className="aspect-[2/3] w-full mb-4 bg-gray-100 rounded-lg overflow-hidden relative">
                    <Image
                        src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`}
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover"
                        width='200'
                        height='300'
                        priority={true}
                        onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=300&width=200"
                        }}
                    />
                    {book.reviews?.length > 0 && (
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/>
                            <span className="text-xs font-medium">{averageRating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
                <div className="px-6 pb-2">
                    <CardTitle className="text-lg leading-tight mb-1">{book.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">by {book.author}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{book.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3"/>
                    {formatDate(book.publishedAt)}
                </div>
                <div className="flex items-center justify-center pt-2">
                    <Badge variant="secondary" className="text-xs">
                        {book.reviews.length} review{book.reviews.length !== 1 ? "s" : ""}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
