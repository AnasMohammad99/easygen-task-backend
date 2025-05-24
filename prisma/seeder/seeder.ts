// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  //-----------clean data---------------
  console.log('Clearing all data...');
  await prisma.token.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.user.deleteMany({});

  const fakerRounds = 10;
  console.log('Seeding...');
  //------------Admin----------------
  await prisma.user.create({
    data: {
      username: 'ADMIN',
      role: faker.helpers.arrayElement(['ADMIN']),
      password: await bcrypt.hash('Ab#123456', 10),
      email: 'admin@admin.com',
    },
  });
  //---------- Users ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        role: faker.helpers.arrayElement(['USER']),
        password: await bcrypt.hash('Ab#123456', 10),
        email: faker.internet.email(),
      },
    });
  }

  //------------applications-----------
  const users = await prisma.user.findMany({
    where: {
      role: 'USER',
    },
  });

  for (const user of users) {
    for (let i = 0; i < 3; i++) {
      await prisma.application.create({
        data: {
          user_id: user.id,
          job_name: faker.person.jobTitle(),
          job_description: faker.lorem.sentences(3),
          status: faker.helpers.arrayElement([
            'PENDING',
            'REJECTED',
            'CANCELLED',
            'ACCEPTED',
          ]),
        },
      });
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
