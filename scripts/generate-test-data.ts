/**
 * Test Data Generator for Load Testing
 * 
 * Creates realistic test data for load testing scenarios.
 * 
 * Usage:
 *   npx tsx scripts/generate-test-data.ts [options]
 * 
 * Options:
 *   --companies=N     Number of test companies (default: 10)
 *   --boqs=N          BOQs per company (default: 20)
 *   --categories=N    Categories per BOQ (default: 5)
 *   --items=N         Items per category (default: 10)
 *   --clean           Remove existing test data first
 * 
 * Example:
 *   npx tsx scripts/generate-test-data.ts --companies=50 --boqs=100
 */

import { prisma } from '../lib/db';
import bcrypt from 'bcryptjs';

const TEST_PREFIX = 'loadtest_';

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  
  const getArg = (name: string, defaultVal: number) => {
    const arg = args.find(a => a.startsWith(`--${name}=`));
    return arg ? parseInt(arg.split('=')[1]) : defaultVal;
  };
  
  return {
    companies: getArg('companies', 10),
    boqsPerCompany: getArg('boqs', 20),
    categoriesPerBoq: getArg('categories', 5),
    itemsPerCategory: getArg('items', 10),
    clean: args.includes('--clean'),
  };
}

// Sample data for realistic BOQs
const CATEGORY_NAMES = [
  'Preliminaries',
  'Earthworks',
  'Concrete Works',
  'Masonry',
  'Structural Steel',
  'Roofing',
  'Plumbing',
  'Electrical',
  'HVAC',
  'Finishes',
  'Painting',
  'Flooring',
  'Windows & Doors',
  'External Works',
  'Landscaping',
];

const ITEM_DESCRIPTIONS = [
  'Supply and install steel reinforcement bars',
  'Excavation in earth for foundations',
  'Portland cement concrete Grade 30',
  'Brick masonry in cement mortar 1:4',
  'Steel structural columns',
  'Roof sheeting installation',
  'UPVC water supply pipes',
  'Electrical conduit and wiring',
  'Air conditioning ducting',
  'Ceramic tile flooring',
  'Interior emulsion paint',
  'Aluminum window frames',
  'Hardwood door with frame',
  'Paving blocks for driveway',
  'Turfing and planting',
];

const UNITS = ['sqm', 'cum', 'kg', 'nos', 'rm', 'lm', 'set', 'lot'];

const PROJECT_NAMES = [
  'Villa Construction Project',
  'Commercial Building Phase',
  'Warehouse Development',
  'Residential Complex',
  'Office Tower Extension',
  'School Building',
  'Hospital Wing',
  'Shopping Mall',
  'Factory Building',
  'Hotel Renovation',
];

// Clean existing test data
async function cleanTestData() {
  console.log('🧹 Cleaning existing test data...');
  
  // Find test companies
  const testCompanies = await prisma.company.findMany({
    where: { name: { startsWith: TEST_PREFIX } },
    select: { id: true },
  });
  
  const companyIds = testCompanies.map(c => c.id);
  
  if (companyIds.length > 0) {
    // Delete in order due to foreign key constraints
    await prisma.boqCreationEvent.deleteMany({ where: { companyId: { in: companyIds } } });
    await prisma.pdfExportJob.deleteMany({ where: { companyId: { in: companyIds } } });
    await prisma.boqItem.deleteMany({ where: { category: { boq: { companyId: { in: companyIds } } } } });
    await prisma.boqCategory.deleteMany({ where: { boq: { companyId: { in: companyIds } } } });
    await prisma.boq.deleteMany({ where: { companyId: { in: companyIds } } });
    await prisma.customer.deleteMany({ where: { companyId: { in: companyIds } } });
    await prisma.companyBilling.deleteMany({ where: { companyId: { in: companyIds } } });
    await prisma.companyMembership.deleteMany({ where: { companyId: { in: companyIds } } });
    await prisma.company.deleteMany({ where: { id: { in: companyIds } } });
    
    // Delete test users
    await prisma.user.deleteMany({ where: { email: { startsWith: TEST_PREFIX } } });
    
    console.log(`  Deleted ${companyIds.length} test companies and related data`);
  } else {
    console.log('  No existing test data found');
  }
}

// Generate test data
async function generateTestData() {
  const config = parseArgs();
  
  console.log('\n🏗️  MakeEstimate Test Data Generator');
  console.log('='.repeat(50));
  console.log(`Companies:        ${config.companies}`);
  console.log(`BOQs/Company:     ${config.boqsPerCompany}`);
  console.log(`Categories/BOQ:   ${config.categoriesPerBoq}`);
  console.log(`Items/Category:   ${config.itemsPerCategory}`);
  console.log('='.repeat(50));
  
  const totalBoqs = config.companies * config.boqsPerCompany;
  const totalCategories = totalBoqs * config.categoriesPerBoq;
  const totalItems = totalCategories * config.itemsPerCategory;
  
  console.log(`\nWill create:`);
  console.log(`  ${config.companies} companies`);
  console.log(`  ${totalBoqs} BOQs`);
  console.log(`  ${totalCategories} categories`);
  console.log(`  ${totalItems} items`);
  
  if (config.clean) {
    await cleanTestData();
  }
  
  const hashedPassword = await bcrypt.hash('loadtest123', 10);
  
  console.log('\n📝 Creating test data...');
  
  for (let c = 0; c < config.companies; c++) {
    process.stdout.write(`\r  Company ${c + 1}/${config.companies}`);
    
    // Create company
    const company = await prisma.company.create({
      data: {
        name: `${TEST_PREFIX}company_${c + 1}`,
        defaultVatPercent: 18,
      },
    });
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: `${TEST_PREFIX}user${c + 1}@test.com`,
        name: `Test User ${c + 1}`,
        firstName: 'Test',
        lastName: `User${c + 1}`,
        password: hashedPassword,
      },
    });
    
    // Create membership
    await prisma.companyMembership.create({
      data: {
        userId: user.id,
        companyId: company.id,
        role: 'ADMIN',
      },
    });
    
    // Create billing record (active subscription)
    await prisma.companyBilling.create({
      data: {
        companyId: company.id,
        planKey: 'business',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
    
    // Create customers
    const customers = await Promise.all(
      Array.from({ length: 5 }, (_, i) =>
        prisma.customer.create({
          data: {
            companyId: company.id,
            name: `Test Customer ${i + 1}`,
            email: `customer${i + 1}@${TEST_PREFIX}company${c + 1}.com`,
            phone: `555-${String(c).padStart(2, '0')}${String(i).padStart(2, '0')}`,
          },
        })
      )
    );
    
    // Create BOQs with categories and items
    for (let b = 0; b < config.boqsPerCompany; b++) {
      const boq = await prisma.boq.create({
        data: {
          companyId: company.id,
          customerId: customers[b % customers.length].id,
          projectName: `${PROJECT_NAMES[b % PROJECT_NAMES.length]} #${c * config.boqsPerCompany + b + 1}`,
          vatPercent: 18,
          status: b % 5 === 0 ? 'FINALIZED' : 'DRAFT',
        },
      });
      
      // Create categories with items
      for (let cat = 0; cat < config.categoriesPerBoq; cat++) {
        const category = await prisma.boqCategory.create({
          data: {
            boqId: boq.id,
            name: CATEGORY_NAMES[cat % CATEGORY_NAMES.length],
            sortOrder: cat,
          },
        });
        
        // Create items
        const itemsData = Array.from({ length: config.itemsPerCategory }, (_, i) => ({
          categoryId: category.id,
          description: ITEM_DESCRIPTIONS[(cat + i) % ITEM_DESCRIPTIONS.length],
          unit: UNITS[i % UNITS.length],
          unitCost: Math.floor(Math.random() * 50000) + 1000,
          markupPct: Math.floor(Math.random() * 30),
          quantity: Math.floor(Math.random() * 100) + 1,
          sortOrder: i,
        }));
        
        await prisma.boqItem.createMany({ data: itemsData });
      }
    }
  }
  
  console.log('\n\n✅ Test data generation complete!');
  console.log('\nTest credentials:');
  console.log(`  Email pattern: ${TEST_PREFIX}user{N}@test.com`);
  console.log(`  Password: loadtest123`);
  console.log(`  Example: ${TEST_PREFIX}user1@test.com`);
  
  await prisma.$disconnect();
}

// Run
generateTestData().catch(console.error);
