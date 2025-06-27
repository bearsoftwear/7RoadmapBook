import Link from "next/link";
import BookGrid from "@/components/BookGrid";
import BookList from "@/components/BookList";

export default function Home() {
    return (
        <>
            <div className="p-4">
                <BookList/>
                {/*<BookGrid/>*/}
            </div>
        </>
    );
}
// TODO buat seperti ini https://v0.dev/chat/openlibrary-book-list-8DSeHid6yGG