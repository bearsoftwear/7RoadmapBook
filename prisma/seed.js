import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Add these inside your main() function, after your existing books or as a replacement

  const books2010s = await prisma.book.createMany({
    data: [
      {
        title: 'The Fault in Our Stars',
        ISBN: '9780525478812',
        description: 'A touching love story between two teenagers with cancer.',
        publishedAt: new Date('2012-01-10'),
        author: 'John Green',
      },
      {
        title: 'Gone Girl',
        ISBN: '9780307588371',
        description: 'A psychological thriller about a marriage gone wrong.',
        publishedAt: new Date('2012-06-05'),
        author: 'Gillian Flynn',
      },
      {
        title: 'The Martian',
        ISBN: '9780804139021',
        description: 'An astronaut stranded on Mars fights for survival.',
        publishedAt: new Date('2014-02-11'),
        author: 'Andy Weir',
      },
      {
        title: 'The Goldfinch',
        ISBN: '9780316055437',
        description:
          'A young boy’s life is changed by a tragic event and a famous painting.',
        publishedAt: new Date('2013-10-22'),
        author: 'Donna Tartt',
      },
      {
        title: 'Ready Player One',
        ISBN: '9780307887443',
        description: 'A dystopian adventure set in a virtual reality world.',
        publishedAt: new Date('2011-08-16'),
        author: 'Ernest Cline',
      },
      {
        title: 'The Girl on the Train',
        ISBN: '9781594634024',
        description: 'A psychological thriller with unreliable narrators.',
        publishedAt: new Date('2015-01-13'),
        author: 'Paula Hawkins',
      },
      {
        title: 'Where the Crawdads Sing',
        ISBN: '9780735219090',
        description:
          'A coming-of-age mystery set in the marshes of North Carolina.',
        publishedAt: new Date('2018-08-14'),
        author: 'Delia Owens',
      },
      {
        title: 'Educated',
        ISBN: '9780399590504',
        description:
          'A memoir about growing up in a strict and abusive household in rural Idaho.',
        publishedAt: new Date('2018-02-20'),
        author: 'Tara Westover',
      },
      {
        title: 'Circe',
        ISBN: '9780316556347',
        description:
          'A retelling of the story of Circe, the witch from The Odyssey.',
        publishedAt: new Date('2018-04-10'),
        author: 'Madeline Miller',
      },
      {
        title: 'The Silent Patient',
        ISBN: '9781250301697',
        description:
          'A psychological thriller about a woman who stops speaking after a violent act.',
        publishedAt: new Date('2019-02-05'),
        author: 'Alex Michaelides',
      },
    ],
  });

  const reviews2010s = await prisma.review.createMany({
    data: [
      {
        bookId: 1, // The Fault in Our Stars
        rating: 5,
        comment:
          'An emotional rollercoaster that beautifully captures young love.',
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
