'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tEvBHHvUg7y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function BookDetail({ id, onBack }) {
  const [book, setBook] = useState({});

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Assuming book is an object with properties like title, author, etc.
        // You can set the book state here if needed
        setBook(data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, []);

  return (
    <>
      {console.log(book)}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-0 hover:bg-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Books
      </Button>
      <main className="flex flex-col lg:flex-row gap-6 m-4">
        <div className="w-full lg:w-1/2">
          <Image
            src={`https://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`}
            alt={`Cover of ${book.title}`}
            className="object-cover w-full rounded-lg"
            width="500"
            height="500"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <h3 className="text-lg text-gray-600 mb-2">
                {/* by {book.author.name} */}
              </h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    // Fill primary if i < avgRating, else muted
                    fill={
                      i < Math.round(book.avgRating || 0)
                        ? 'currentColor'
                        : 'none'
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
              <p className="text-gray-700 mb-4">{book.description}</p>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="variant"
                >
                  Choose a variant:
                </label>
                <select
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="variant"
                >
                  <option>Variant 1</option>
                  <option>Variant 2</option>
                  <option>Variant 3</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <img
                  className="object-cover w-full h-16 rounded-lg"
                  src="/placeholder.svg"
                  alt="Variant 1 Preview"
                  width="64"
                  height="64"
                  style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                />
                <img
                  className="object-cover w-full h-16 rounded-lg"
                  src="/placeholder.svg"
                  alt="Variant 2 Preview"
                  width="64"
                  height="64"
                  style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                />
                <img
                  className="object-cover w-full h-16 rounded-lg"
                  src="/placeholder.svg"
                  alt="Variant 3 Preview"
                  width="64"
                  height="64"
                  style={{ aspectRatio: '64/64', objectFit: 'cover' }}
                />
              </div>
              <p className="text-lg font-bold mb-4">$99.99</p>
              <Button>Add to Cart</Button>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-2">Technical Details</h2>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr>
                    <td className="px-4 py-2">Material</td>
                    <td className="px-4 py-2">High-quality material</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Technology</td>
                    <td className="px-4 py-2">Advanced technology</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-2">Shipment Details</h2>
              <p className="text-gray-700 mb-4">
                Your product will be shipped within 3-5 business days after
                purchase. Please ensure your shipping details are correct at
                checkout.
              </p>
              <PlaneIcon className="w-4 h-4 mb-4" />
              <p className="text-gray-700 mb-4">
                Estimated delivery: 7-10 business days
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>

              {/* {book.author_name && book.author_name.length > 0 && (
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-lg text-gray-700">
                    by {book.author_name.join(', ')}
                  </span>
                </div>
              )} */}

              {book.first_publish_year && (
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    First published: {book.first_publish_year}
                  </span>
                </div>
              )}

              {book.subject && book.subject.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Tag className="w-5 h-5 text-gray-400 mr-2" />
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
                  {book.description ||
                    'No description available for this book.'}
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
    </>
  );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
