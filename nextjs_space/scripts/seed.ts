import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create test user with company
  const hashedPassword = await bcrypt.hash('johndoe123', 10);

  // Always seed billing plans first (they should exist regardless of user state)
  console.log('Seeding billing plans (4-plan model: free + 3 paid with monthly+annual)...');
  
  // Plan 0: Free Forever - $0 (no Stripe)
  const freePlan = await prisma.billingPlan.upsert({
    where: { planKey: 'free' },
    update: {
      name: 'Free Forever',
      priceMonthlyUsdCents: 0,
      priceAnnualUsdCents: 0,
      seatModel: 'single',
      boqLimitPerPeriod: null,       // Unlimited BOQs
      boqItemsLimit: 15,             // Max 15 items per BOQ
      boqTemplatesLimit: 1,          // 1 BOQ theme
      coverTemplatesLimit: 1,        // 1 cover template
      boqPresetsLimit: 1,            // 1 BOQ preset
      logoUploadAllowed: false,      // No logo upload
      sharingAllowed: false,
      watermarkEnabled: true,        // Watermark on PDFs
      watermarkText: 'BOQ generated with MakeEstimate.com',
      maxActiveMembers: 1,
      features: [
        'Unlimited BOQ creations',
        '15 items per BOQ',
        'Single user',
        '1 BOQ theme',
        '1 cover page template',
        '1 BOQ preset',
        'PDF exports with watermark',
        'Customer management',
      ],
      isMostPopular: false,
      sortOrder: 0,
      active: true,
      // No Stripe fields for free plan
      stripeProductId: null,
      stripePriceIdMonthly: null,
      stripePriceIdAnnual: null,
    },
    create: {
      planKey: 'free',
      name: 'Free Forever',
      priceMonthlyUsdCents: 0,
      priceAnnualUsdCents: 0,
      seatModel: 'single',
      boqLimitPerPeriod: null,
      boqItemsLimit: 15,
      boqTemplatesLimit: 1,
      coverTemplatesLimit: 1,
      boqPresetsLimit: 1,
      logoUploadAllowed: false,
      sharingAllowed: false,
      watermarkEnabled: true,
      watermarkText: 'BOQ generated with MakeEstimate.com',
      maxActiveMembers: 1,
      features: [
        'Unlimited BOQ creations',
        '15 items per BOQ',
        'Single user',
        '1 BOQ theme',
        '1 cover page template',
        '1 BOQ preset',
        'PDF exports with watermark',
        'Customer management',
      ],
      isMostPopular: false,
      sortOrder: 0,
      active: true,
    },
  });
  console.log(`  Created/updated Free Forever plan: ${freePlan.id}`);

  // Plan 1: Starter - $19/month, $199/year
  const starterPlan = await prisma.billingPlan.upsert({
    where: { planKey: 'starter' },
    update: {
      name: 'Starter',
      priceMonthlyUsdCents: 1900,    // $19/month
      priceAnnualUsdCents: 19900,    // $199/year (saves $29)
      seatModel: 'single',
      boqLimitPerPeriod: 10,         // 10 BOQs per month
      boqItemsLimit: null,           // Unlimited items per BOQ
      boqTemplatesLimit: 2,          // 2 BOQ themes
      coverTemplatesLimit: 2,        // 2 cover templates
      boqPresetsLimit: null,         // Unlimited presets
      logoUploadAllowed: true,
      sharingAllowed: false,
      watermarkEnabled: false,       // No watermark
      watermarkText: null,
      maxActiveMembers: 1,
      features: [
        '10 BOQ creations per month',
        'Single user',
        '2 BOQ themes',
        '2 cover page templates',
        'Unlimited BOQ presets',
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
      boqLimitPerPeriod: 10,
      boqItemsLimit: null,
      boqTemplatesLimit: 2,
      coverTemplatesLimit: 2,
      boqPresetsLimit: null,
      logoUploadAllowed: true,
      sharingAllowed: false,
      watermarkEnabled: false,
      watermarkText: null,
      maxActiveMembers: 1,
      features: [
        '10 BOQ creations per month',
        'Single user',
        '2 BOQ themes',
        '2 cover page templates',
        'Unlimited BOQ presets',
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
      boqItemsLimit: null,           // Unlimited items per BOQ
      boqTemplatesLimit: 10,         // 10 BOQ themes
      coverTemplatesLimit: 10,       // 10 cover templates
      boqPresetsLimit: null,         // Unlimited presets
      logoUploadAllowed: true,
      sharingAllowed: false,
      watermarkEnabled: false,
      watermarkText: null,
      maxActiveMembers: 1,
      features: [
        'Unlimited BOQ creations',
        'Single user',
        '10 BOQ themes',
        '10 cover page templates',
        'Unlimited BOQ presets',
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
      boqItemsLimit: null,
      boqTemplatesLimit: 10,
      coverTemplatesLimit: 10,
      boqPresetsLimit: null,
      logoUploadAllowed: true,
      sharingAllowed: false,
      watermarkEnabled: false,
      watermarkText: null,
      maxActiveMembers: 1,
      features: [
        'Unlimited BOQ creations',
        'Single user',
        '10 BOQ themes',
        '10 cover page templates',
        'Unlimited BOQ presets',
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
      boqItemsLimit: null,           // Unlimited items per BOQ
      boqTemplatesLimit: null,       // Unlimited themes
      coverTemplatesLimit: null,     // Unlimited cover templates
      boqPresetsLimit: null,         // Unlimited presets
      logoUploadAllowed: true,
      sharingAllowed: true,          // Only Business has sharing
      watermarkEnabled: false,
      watermarkText: null,
      maxActiveMembers: 999,         // Effectively unlimited
      features: [
        'Unlimited BOQ creations',
        'Unlimited team members',
        'Unlimited BOQ themes',
        'Unlimited cover templates',
        'Unlimited BOQ presets',
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
      boqItemsLimit: null,
      boqTemplatesLimit: null,
      coverTemplatesLimit: null,
      boqPresetsLimit: null,
      logoUploadAllowed: true,
      sharingAllowed: true,
      watermarkEnabled: false,
      watermarkText: null,
      maxActiveMembers: 999,
      features: [
        'Unlimited BOQ creations',
        'Unlimited team members',
        'Unlimited BOQ themes',
        'Unlimited cover templates',
        'Unlimited BOQ presets',
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
