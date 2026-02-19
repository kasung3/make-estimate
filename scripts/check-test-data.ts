import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  
  const testUsers = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: '@example.com' } },
        { name: { contains: 'Test User' } }
      ]
    },
    select: { id: true, email: true, name: true }
  });
  
  console.log('Remaining test users:', testUsers.length);
  if (testUsers.length > 0) {
    testUsers.forEach(u => console.log('  -', u.email, u.name));
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);
