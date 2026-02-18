import { prisma } from '../lib/db';

async function main() {
  await prisma.billingPlan.update({
    where: { planKey: 'starter' },
    data: {
      stripePriceIdMonthly: 'price_1T1sb9AYEuDHpMaBXJZIeTix',
      stripePriceIdAnnual: 'price_1T1sbAAYEuDHpMaBybo9u4Kz',
    }
  });
  console.log('✅ Updated starter plan');
  
  await prisma.billingPlan.update({
    where: { planKey: 'advance' },
    data: {
      stripePriceIdMonthly: 'price_1T1sbIAYEuDHpMaBNrJQL4Kt',
      stripePriceIdAnnual: 'price_1T1sbJAYEuDHpMaB9dcTNkfB',
    }
  });
  console.log('✅ Updated advance plan');
  
  await prisma.billingPlan.update({
    where: { planKey: 'business' },
    data: {
      stripePriceIdMonthly: 'price_1T1sbSAYEuDHpMaBTRLRYwTX',
      stripePriceIdAnnual: 'price_1T1sbSAYEuDHpMaBTQevSABy',
    }
  });
  console.log('✅ Updated business plan');
  
  const plans = await prisma.billingPlan.findMany({
    select: { planKey: true, stripePriceIdMonthly: true, stripePriceIdAnnual: true }
  });
  console.log('Current plans:', JSON.stringify(plans, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
