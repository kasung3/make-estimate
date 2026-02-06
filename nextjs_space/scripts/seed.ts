import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create test user with company
  const hashedPassword = await bcrypt.hash('johndoe123', 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: 'john@doe.com' },
  });

  if (existingUser) {
    console.log('Test user already exists, skipping seed.');
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  });

  const company = await prisma.company.create({
    data: {
      name: 'Demo Construction Ltd',
      currencySymbol: 'Rs.',
      currencyPosition: 'left',
    },
  });

  await prisma.companyMembership.create({
    data: {
      userId: user.id,
      companyId: company.id,
      role: 'ADMIN',
    },
  });

  // Create sample customers
  const customer1 = await prisma.customer.create({
    data: {
      companyId: company.id,
      name: 'ABC Developments',
      email: 'info@abcdev.com',
      phone: '+94 77 123 4567',
      address: '123 Main Street, Colombo',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      companyId: company.id,
      name: 'XYZ Properties',
      email: 'contact@xyzprop.com',
      phone: '+94 77 987 6543',
      address: '456 High Street, Kandy',
    },
  });

  // Create sample BOQ
  const boq = await prisma.boq.create({
    data: {
      companyId: company.id,
      customerId: customer1.id,
      projectName: 'New Office Building - Phase 1',
      discountType: 'percent',
      discountValue: 5,
      vatEnabled: true,
      vatPercent: 15,
      status: 'draft',
    },
  });

  // Create categories with items
  const category1 = await prisma.boqCategory.create({
    data: {
      boqId: boq.id,
      name: 'Foundation Works',
      sortOrder: 0,
    },
  });

  await prisma.boqItem.createMany({
    data: [
      {
        categoryId: category1.id,
        description: 'Site Clearing',
        unit: 'm²',
        unitCost: 150,
        markupPct: 15,
        quantity: 500,
        sortOrder: 0,
      },
      {
        categoryId: category1.id,
        description: 'Excavation',
        unit: 'm³',
        unitCost: 800,
        markupPct: 20,
        quantity: 200,
        sortOrder: 1,
      },
      {
        categoryId: category1.id,
        description: 'Concrete (Grade 25)',
        unit: 'm³',
        unitCost: 18000,
        markupPct: 15,
        quantity: 50,
        sortOrder: 2,
      },
    ],
  });

  const category2 = await prisma.boqCategory.create({
    data: {
      boqId: boq.id,
      name: 'Structural Works',
      sortOrder: 1,
    },
  });

  await prisma.boqItem.createMany({
    data: [
      {
        categoryId: category2.id,
        description: 'Reinforcement Steel',
        unit: 'kg',
        unitCost: 280,
        markupPct: 12,
        quantity: 5000,
        sortOrder: 0,
      },
      {
        categoryId: category2.id,
        description: 'Column Formwork',
        unit: 'm²',
        unitCost: 950,
        markupPct: 18,
        quantity: 300,
        sortOrder: 1,
      },
      {
        categoryId: category2.id,
        description: 'Beam Formwork',
        unit: 'm²',
        unitCost: 850,
        markupPct: 18,
        quantity: 400,
        sortOrder: 2,
      },
    ],
  });

  const category3 = await prisma.boqCategory.create({
    data: {
      boqId: boq.id,
      name: 'Masonry Works',
      sortOrder: 2,
    },
  });

  await prisma.boqItem.createMany({
    data: [
      {
        categoryId: category3.id,
        description: 'Brick Work (225mm)',
        unit: 'm²',
        unitCost: 3500,
        markupPct: 15,
        quantity: 800,
        sortOrder: 0,
      },
      {
        categoryId: category3.id,
        description: 'Brick Work (112mm)',
        unit: 'm²',
        unitCost: 2200,
        markupPct: 15,
        quantity: 500,
        sortOrder: 1,
      },
    ],
  });

  console.log('Seed completed successfully!');
  console.log('Test account: john@doe.com / johndoe123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
