import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  
  const testUser = await prisma.user.findFirst({
    where: { email: { contains: '@example.com' } },
    include: { memberships: { include: { company: true } } }
  });
  
  if (!testUser) {
    console.log('No test users found');
    await prisma.$disconnect();
    return;
  }
  
  console.log('Deleting test user:', testUser.email);
  
  // Delete their companies first
  for (const membership of testUser.memberships) {
    if (membership.company) {
      console.log('  Deleting company:', membership.company.name);
      try {
        await prisma.company.delete({ where: { id: membership.company.id } });
      } catch (e: any) {
        console.log('  Error deleting company:', e.message);
      }
    }
  }
  
  // Delete the user
  try {
    await prisma.user.delete({ where: { id: testUser.id } });
    console.log('User deleted successfully');
  } catch (e: any) {
    console.log('Error deleting user:', e.message);
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);
