import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create test user with company
  const hashedPassword = await bcrypt.hash('johndoe123', 10);

  // Always seed billing plans first (they should exist regardless of user state)
  console.log('Seeding billing plans (3-plan model with monthly+annual)...');
  
  // Plan 1: Starter - $19/month, $199/year
  const starterPlan = await prisma.billingPlan.upsert({
    where: { planKey: 'starter' },
    update: {
      name: 'Starter',
      priceMonthlyUsdCents: 1900,    // $19/month
      priceAnnualUsdCents: 19900,    // $199/year (saves $29)
      seatModel: 'single',
      boqLimitPerPeriod: 5,          // 5 BOQs per period
      boqTemplatesLimit: 2,          // 2 BOQ templates
      coverTemplatesLimit: 2,        // 2 cover templates
      logoUploadAllowed: true,
      sharingAllowed: false,
      maxActiveMembers: 1,
      features: [
        '5 BOQ creations per month',
        'Single user',
        '2 BOQ templates',
        '2 cover page templates',
        'Upload own logo',
        'PDF exports',
        'Customer management',
      ],
      isMostPopular: false,
      sortOrder: 1,
      active: true,
    },
    create: {
      planKey: 'starter',
      name: 'Starter',
      priceMonthlyUsdCents: 1900,
      priceAnnualUsdCents: 19900,
      seatModel: 'single',
      boqLimitPerPeriod: 5,
      boqTemplatesLimit: 2,
      coverTemplatesLimit: 2,
      logoUploadAllowed: true,
      sharingAllowed: false,
      maxActiveMembers: 1,
      features: [
        '5 BOQ creations per month',
        'Single user',
        '2 BOQ templates',
        '2 cover page templates',
        'Upload own logo',
        'PDF exports',
        'Customer management',
      ],
      isMostPopular: false,
      sortOrder: 1,
      active: true,
    },
  });
  console.log(`  Created/updated Starter plan: ${starterPlan.id}`);

  // Plan 2: Advance - $39/month, $419/year (Most Popular)
  const advancePlan = await prisma.billingPlan.upsert({
    where: { planKey: 'advance' },
    update: {
      name: 'Advance',
      priceMonthlyUsdCents: 3900,    // $39/month
      priceAnnualUsdCents: 41900,    // $419/year (saves $49)
      seatModel: 'single',
      boqLimitPerPeriod: null,       // Unlimited BOQs
      boqTemplatesLimit: 10,         // 10 BOQ templates
      coverTemplatesLimit: 10,       // 10 cover templates
      logoUploadAllowed: true,
      sharingAllowed: false,
      maxActiveMembers: 1,
      features: [
        'Unlimited BOQ creations',
        'Single user',
        '10 BOQ templates',
        '10 cover page templates',
        'Upload own logo',
        'PDF exports',
        'Customer management',
        'Priority support',
      ],
      isMostPopular: true,
      sortOrder: 2,
      active: true,
    },
    create: {
      planKey: 'advance',
      name: 'Advance',
      priceMonthlyUsdCents: 3900,
      priceAnnualUsdCents: 41900,
      seatModel: 'single',
      boqLimitPerPeriod: null,
      boqTemplatesLimit: 10,
      coverTemplatesLimit: 10,
      logoUploadAllowed: true,
      sharingAllowed: false,
      maxActiveMembers: 1,
      features: [
        'Unlimited BOQ creations',
        'Single user',
        '10 BOQ templates',
        '10 cover page templates',
        'Upload own logo',
        'PDF exports',
        'Customer management',
        'Priority support',
      ],
      isMostPopular: true,
      sortOrder: 2,
      active: true,
    },
  });
  console.log(`  Created/updated Advance plan: ${advancePlan.id}`);

  // Plan 3: Business - $49/user/month, $519/user/year (per-seat)
  const businessPlan = await prisma.billingPlan.upsert({
    where: { planKey: 'business' },
    update: {
      name: 'Business',
      priceMonthlyUsdCents: 4900,    // $49/user/month
      priceAnnualUsdCents: 51900,    // $519/user/year (saves $69/user)
      seatModel: 'per_seat',
      boqLimitPerPeriod: null,       // Unlimited BOQs
      boqTemplatesLimit: null,       // Unlimited templates
      coverTemplatesLimit: null,     // Unlimited cover templates
      logoUploadAllowed: true,
      sharingAllowed: true,          // Only Business has sharing
      maxActiveMembers: 999,         // Effectively unlimited
      features: [
        'Unlimited BOQ creations',
        'Unlimited team members',
        'Unlimited BOQ templates',
        'Unlimited cover templates',
        'Upload own logo',
        'Team collaboration & sharing',
        'PDF exports',
        'Customer management',
        'Priority support',
      ],
      isMostPopular: false,
      sortOrder: 3,
      active: true,
    },
    create: {
      planKey: 'business',
      name: 'Business',
      priceMonthlyUsdCents: 4900,
      priceAnnualUsdCents: 51900,
      seatModel: 'per_seat',
      boqLimitPerPeriod: null,
      boqTemplatesLimit: null,
      coverTemplatesLimit: null,
      logoUploadAllowed: true,
      sharingAllowed: true,
      maxActiveMembers: 999,
      features: [
        'Unlimited BOQ creations',
        'Unlimited team members',
        'Unlimited BOQ templates',
        'Unlimited cover templates',
        'Upload own logo',
        'Team collaboration & sharing',
        'PDF exports',
        'Customer management',
        'Priority support',
      ],
      isMostPopular: false,
      sortOrder: 3,
      active: true,
    },
  });
  console.log(`  Created/updated Business plan: ${businessPlan.id}`);

  const existingUser = await prisma.user.findUnique({
    where: { email: 'john@doe.com' },
  });

  if (existingUser) {
    console.log('Test user already exists, skipping user seed.');
    console.log('Seed completed successfully!');
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
