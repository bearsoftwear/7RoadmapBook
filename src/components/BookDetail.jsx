'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tEvBHHvUg7y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import Image from "next/image"
import {ArrowLeft, Calendar, User, Tag} from "lucide-react"


export default function BookDetail({book, onBack}) {
    return (
        <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={onBack} className="mb-6 hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Back to Books
            </Button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 p-6">
                        <div className="aspect-[3/4] relative bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`}
                                alt={`Cover of ${book.title}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    </div>

                    <div className="md:w-2/3 p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>

                        {book.author_name && book.author_name.length > 0 && (
                            <div className="flex items-center mb-3">
                                <User className="w-5 h-5 text-gray-400 mr-2"/>
                                <span className="text-lg text-gray-700">by {book.author_name.join(", ")}</span>
                            </div>
                        )}

                        {book.first_publish_year && (
                            <div className="flex items-center mb-4">
                                <Calendar className="w-5 h-5 text-gray-400 mr-2"/>
                                <span className="text-gray-600">First published: {book.first_publish_year}</span>
                            </div>
                        )}

                        {book.subject && book.subject.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center mb-2">
                                    <Tag className="w-5 h-5 text-gray-400 mr-2"/>
                                    <span className="text-gray-700 font-medium">Subjects</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {book.subject.map((subject, index) => (
                                        <Badge key={index} variant="secondary">
                                            {subject}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">Description</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {book.description || "No description available for this book."}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button className="flex-1">Read Online</Button>
                            <Button variant="outline" className="flex-1">
                                Add to My Books
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
