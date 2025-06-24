import { PrismaClient, ReadingStatus } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Create Users
    const alice = await prisma.user.create({
        data: {
            email: 'alice@example.com',
            name: 'Alice Reader'
        }
    })

    const bob = await prisma.user.create({
        data: {
            email: 'bob@example.com',
            name: 'Bob Bibliophile'
        }
    })

    // Create Authors
    const orwell = await prisma.author.create({ data: { name: 'George Orwell' } })
    const rowling = await prisma.author.create({ data: { name: 'J.K. Rowling' } })

    // Create Genres
    const fantasy = await prisma.genre.create({ data: { name: 'Fantasy' } })
    const dystopian = await prisma.genre.create({ data: { name: 'Dystopian' } })

    // Create Books
    const book1984 = await prisma.book.create({
        data: {
            title: '1984',
            description: 'A dystopian social science fiction novel.',
            publishedAt: new Date('1949-06-08'),
            authorId: orwell.id,
        }
    })

    const hp1 = await prisma.book.create({
        data: {
            title: 'Harry Potter and the Philosopher\'s Stone',
            description: 'A boy discovers he is a wizard.',
            publishedAt: new Date('1997-06-26'),
            authorId: rowling.id,
        }
    })

    // Connect Books to Genres
    await prisma.bookGenre.createMany({
        data: [
            { bookId: book1984.id, genreId: dystopian.id },
            { bookId: hp1.id, genreId: fantasy.id },
        ]
    })

    // Create Book Logs
    await prisma.bookLog.create({
        data: {
            userId: alice.id,
            bookId: book1984.id,
            status: ReadingStatus.COMPLETED,
            startedAt: new Date('2022-01-01'),
            finishedAt: new Date('2022-01-15'),
            notes: 'Chilling and thought-provoking.'
        }
    })

    await prisma.bookLog.create({
        data: {
            userId: bob.id,
            bookId: hp1.id,
            status: ReadingStatus.READING,
            startedAt: new Date('2025-06-01'),
            notes: 'Enjoying the magical world so far.'
        }
    })

    // Create Reviews
    await prisma.review.create({
        data: {
            userId: alice.id,
            bookId: book1984.id,
            rating: 5,
            comment: 'A must-read classic.'
        }
    })

    await prisma.review.create({
        data: {
            userId: bob.id,
            bookId: hp1.id,
            rating: 4,
            comment: 'Exciting and nostalgic.'
        }
    })
}

main()
    .then(() => {
        console.log('🌱 Seeded successfully!')
        return prisma.$disconnect()
    })
    .catch((e) => {
        console.error(e)
        return prisma.$disconnect().finally(() => process.exit(1))
    })
