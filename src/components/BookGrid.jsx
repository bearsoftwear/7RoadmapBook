// 'use client';
//
// import React, { useEffect, useState } from 'react';
// import BookCard from '@/components/BookCard';
//
// export default function BookGrid() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     fetch('api/books')
//       .then((res) => res.json())
//       .then((data) => {
//         setBooks(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);
//
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//       {books.map((book) => (
//         <BookCard key={book.id} book={book} />
//       ))}
//     </div>
//   );
// }
