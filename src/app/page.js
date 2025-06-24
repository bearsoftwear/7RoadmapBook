import Link from "next/link";
import BookGrid from "@/components/BookGrid";

export default function Home() {
    return (
        <>
            <Link href="/book">Book</Link>
            <Link href="/author">Author</Link>
            <Link href="/genre">Genre</Link>
            <Link href="/user">User</Link>
            <BookGrid/>
        </>
    );
}
