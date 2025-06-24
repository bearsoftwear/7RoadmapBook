import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Reader',
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Bibliophile',
    },
  });

  // Create Authors
  const orwell = await prisma.author.create({
    data: { name: 'George Orwell' },
  });
  const rowling = await prisma.author.create({
    data: { name: 'J.K. Rowling' },
  });
  const king = await prisma.author.create({ data: { name: 'Stephen King' } });
  const austen = await prisma.author.create({ data: { name: 'Jane Austen' } });
  const asimov = await prisma.author.create({ data: { name: 'Isaac Asimov' } });
  const gladwell = await prisma.author.create({
    data: { name: 'Malcolm Gladwell' },
  });
  const atwood = await prisma.author.create({
    data: { name: 'Margaret Atwood' },
  });

  // Create Genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });
  const fantasy = await prisma.genre.upsert({
    where: { name: 'Fantasy' },
    update: {},
    create: { name: 'Fantasy' },
  });
  const dystopian = await prisma.genre.upsert({
    where: { name: 'Dystopian' },
    update: {},
    create: { name: 'Dystopian' },
  });
  const sciFi = await prisma.genre.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction' },
  });
  const horror = await prisma.genre.upsert({
    where: { name: 'Horror' },
    update: {},
    create: { name: 'Horror' },
  });
  const romance = await prisma.genre.upsert({
    where: { name: 'Romance' },
    update: {},
    create: { name: 'Romance' },
  });
  const nonFiction = await prisma.genre.upsert({
    where: { name: 'Non-Fiction' },
    update: {},
    create: { name: 'Non-Fiction' },
  });

  // Create Books
  const books = await prisma.book.createMany({
    data: [
      {
        title: '1984',
        ISBN: '9780451524935',
        description: 'A dystopian novel about totalitarianism.',
        publishedAt: new Date('1949-06-08'),
        authorId: orwell.id,
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        ISBN: '9780747532699',
        description: 'A young boy discovers his magical heritage.',
        publishedAt: new Date('1997-06-26'),
        authorId: rowling.id,
      },
      {
        title: 'The Shining',
        ISBN: '9780385121675',
        description:
          'A family faces supernatural horrors in an isolated hotel.',
        publishedAt: new Date('1977-01-28'),
        authorId: king.id,
      },
      {
        title: 'Pride and Prejudice',
        ISBN: '9780141439518',
        description: 'A romantic tale of love and societal expectations.',
        publishedAt: new Date('1813-01-28'),
        authorId: austen.id,
      },
      {
        title: 'Foundation',
        ISBN: '9780553293357',
        description: 'A saga of a galactic empire’s decline.',
        publishedAt: new Date('1951-06-01'),
        authorId: asimov.id,
      },
      {
        title: 'Outliers',
        ISBN: '9780316017923',
        description: 'Explores the factors behind extraordinary success.',
        publishedAt: new Date('2008-11-18'),
        authorId: gladwell.id,
      },
      {
        title: 'The Handmaid’s Tale',
        ISBN: '9780385490818',
        description: 'A dystopian tale of oppression and resistance.',
        publishedAt: new Date('1985-06-01'),
        authorId: atwood.id,
      },
      {
        title: 'Animal Farm',
        ISBN: '9780451526342',
        description: 'A satirical allegory of political corruption.',
        publishedAt: new Date('1945-08-17'),
        authorId: orwell.id,
      },
      {
        title: 'It',
        ISBN: '9780670813025',
        description: 'A group of friends confront a shape-shifting evil.',
        publishedAt: new Date('1986-09-15'),
        authorId: king.id,
      },
      {
        title: 'Sense and Sensibility',
        ISBN: '9780141439662',
        description: 'Two sisters navigate love and hardship.',
        publishedAt: new Date('1811-10-30'),
        authorId: austen.id,
      },
      {
        title: 'I, Robot',
        ISBN: '9780553294385',
        description: 'A collection of robot-themed sci-fi stories.',
        publishedAt: new Date('1950-12-02'),
        authorId: asimov.id,
      },
      {
        title: 'Blink',
        ISBN: '9780316010665',
        description: 'The power of intuitive decision-making.',
        publishedAt: new Date('2005-01-11'),
        authorId: gladwell.id,
      },
      {
        title: 'Harry Potter and the Chamber of Secrets',
        ISBN: '9780747538493',
        description: 'Harry faces new dangers at Hogwarts.',
        publishedAt: new Date('1998-07-02'),
        authorId: rowling.id,
      },
      {
        title: 'Carrie',
        ISBN: '9780385086950',
        description: 'A bullied teen unleashes telekinetic powers.',
        publishedAt: new Date('1974-04-05'),
        authorId: king.id,
      },
      {
        title: 'Emma',
        ISBN: '9780141439587',
        description: 'A young woman meddles in others’ love lives.',
        publishedAt: new Date('1815-12-23'),
        authorId: austen.id,
      },
      {
        title: 'The Caves of Steel',
        ISBN: '9780553293401',
        description: 'A detective solves a murder in a futuristic world.',
        publishedAt: new Date('1954-02-01'),
        authorId: asimov.id,
      },
      {
        title: 'The Tipping Point',
        ISBN: '9780316346627',
        description: 'How small changes spark big trends.',
        publishedAt: new Date('2000-03-01'),
        authorId: gladwell.id,
      },
      {
        title: 'Alias Grace',
        ISBN: '9780385490443',
        description: 'A fictionalized account of a notorious murderess.',
        publishedAt: new Date('1996-09-01'),
        authorId: atwood.id,
      },
      {
        title: 'Harry Potter and the Prisoner of Azkaban',
        ISBN: '9780747542155',
        description: 'Harry uncovers secrets about his past.',
        publishedAt: new Date('1999-07-08'),
        authorId: rowling.id,
      },
      {
        title: 'Homage to Catalonia',
        ISBN: '9780156421171',
        description: 'Orwell’s memoir of the Spanish Civil War.',
        publishedAt: new Date('1938-04-25'),
        authorId: orwell.id,
      },
    ],
  });

  // Connect Books to Genres
  await prisma.bookGenre.createMany({
    data: [
      {
        bookId: (await prisma.book.findFirst({ where: { title: '1984' } })).id,
        genreId: dystopian.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: "Harry Potter and the Philosopher's Stone" },
          })
        ).id,
        genreId: fantasy.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'The Shining' } })
        ).id,
        genreId: horror.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'Pride and Prejudice' },
          })
        ).id,
        genreId: romance.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'Foundation' } })
        ).id,
        genreId: sciFi.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'Outliers' } })
        ).id,
        genreId: nonFiction.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'The Handmaid’s Tale' },
          })
        ).id,
        genreId: dystopian.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'Animal Farm' } })
        ).id,
        genreId: fiction.id,
      },
      {
        bookId: (await prisma.book.findFirst({ where: { title: 'It' } })).id,
        genreId: horror.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'Sense and Sensibility' },
          })
        ).id,
        genreId: romance.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'I, Robot' } })
        ).id,
        genreId: sciFi.id,
      },
      {
        bookId: (await prisma.book.findFirst({ where: { title: 'Blink' } })).id,
        genreId: nonFiction.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'Harry Potter and the Chamber of Secrets' },
          })
        ).id,
        genreId: fantasy.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'Carrie' } })
        ).id,
        genreId: horror.id,
      },
      {
        bookId: (await prisma.book.findFirst({ where: { title: 'Emma' } })).id,
        genreId: romance.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'The Caves of Steel' },
          })
        ).id,
        genreId: sciFi.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'The Tipping Point' } })
        ).id,
        genreId: nonFiction.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({ where: { title: 'Alias Grace' } })
        ).id,
        genreId: fiction.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'Harry Potter and the Prisoner of Azkaban' },
          })
        ).id,
        genreId: fantasy.id,
      },
      {
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'Homage to Catalonia' },
          })
        ).id,
        genreId: nonFiction.id,
      },
    ],
  });

  // Create Book Logs
  await prisma.bookLog.createMany({
    data: [
      {
        userId: alice.id,
        bookId: (await prisma.book.findFirst({ where: { title: '1984' } })).id,
        status: 'COMPLETED',
        startedAt: new Date('2022-01-01'),
        finishedAt: new Date('2022-01-15'),
        notes: 'Chilling and thought-provoking.',
      },
      {
        userId: bob.id,
        bookId: (
          await prisma.book.findFirst({
            where: { title: "Harry Potter and the Philosopher's Stone" },
          })
        ).id,
        status: 'READING',
        startedAt: new Date('2025-06-01'),
        notes: 'Enjoying the magical world so far.',
      },
      {
        userId: alice.id,
        bookId: (
          await prisma.book.findFirst({ where: { title: 'The Shining' } })
        ).id,
        status: 'COMPLETED',
        startedAt: new Date('2023-03-01'),
        finishedAt: new Date('2023-03-20'),
        notes: 'Terrifying but gripping.',
      },
      {
        userId: bob.id,
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'Pride and Prejudice' },
          })
        ).id,
        status: 'READING',
        startedAt: new Date('2025-05-01'),
        notes: 'Charming and witty so far.',
      },
    ],
  });

  // Create Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: alice.id,
        bookId: (await prisma.book.findFirst({ where: { title: '1984' } })).id,
        rating: 5,
        comment: 'A must-read classic.',
      },
      {
        userId: bob.id,
        bookId: (
          await prisma.book.findFirst({
            where: { title: "Harry Potter and the Philosopher's Stone" },
          })
        ).id,
        rating: 4,
        comment: 'Exciting and nostalgic.',
      },
      {
        userId: alice.id,
        bookId: (
          await prisma.book.findFirst({ where: { title: 'The Shining' } })
        ).id,
        rating: 4,
        comment: 'Scary but well-written.',
      },
      {
        userId: bob.id,
        bookId: (
          await prisma.book.findFirst({
            where: { title: 'Pride and Prejudice' },
          })
        ).id,
        rating: 5,
        comment: 'A delightful romance.',
      },
    ],
  });
}

main()
  .then(() => {
    console.log('🌱 Seeded successfully!');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
