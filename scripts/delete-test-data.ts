import { prisma } from '../lib/db';

async function deleteTestData() {
  // Find test users (created by automated tests)
  const testUsers = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: '@example.com' } },
        { name: 'Test User' }
      ]
    },
    include: {
      memberships: {
        include: {
          company: true
        }
      }
    }
  });

  console.log(`Found ${testUsers.length} test users to delete`);

  // Collect unique company IDs from test users
  const companyIdsToDelete = new Set<string>();
  for (const user of testUsers) {
    for (const membership of user.memberships) {
      companyIdsToDelete.add(membership.companyId);
    }
  }

  console.log(`Found ${companyIdsToDelete.size} companies to delete`);

  // Delete each company and its related data
  for (const companyId of companyIdsToDelete) {
    try {
      await prisma.$transaction(async (tx) => {
        // Delete PDF export jobs
        await tx.pdfExportJob.deleteMany({ where: { companyId } });
        
        // Get BOQ IDs
        const boqIds = (await tx.boq.findMany({ 
          where: { companyId }, 
          select: { id: true } 
        })).map(b => b.id);
        
        if (boqIds.length > 0) {
          await tx.boqItem.deleteMany({ where: { category: { boqId: { in: boqIds } } } });
          await tx.boqCategory.deleteMany({ where: { boqId: { in: boqIds } } });
        }
        
        await tx.boq.deleteMany({ where: { companyId } });
        await tx.boqCreationEvent.deleteMany({ where: { companyId } });
        await tx.customer.deleteMany({ where: { companyId } });
        await tx.pdfCoverTemplate.deleteMany({ where: { companyId } });
        await tx.pdfTheme.deleteMany({ where: { companyId } });
        
        const billing = await tx.companyBilling.findUnique({ where: { companyId } });
        if (billing) {
          await tx.billingInvoice.deleteMany({ where: { companyBillingId: billing.id } });
          await tx.couponRedemption.deleteMany({ where: { companyBillingId: billing.id } });
          await tx.companyBilling.delete({ where: { companyId } });
        }
        
        await tx.companyAccessGrant.deleteMany({ where: { companyId } });
        await tx.companyMembership.deleteMany({ where: { companyId } });
        await tx.company.delete({ where: { id: companyId } });
      });
      console.log('Deleted company:', companyId);
    } catch (err) {
      console.error('Failed to delete company', companyId, err);
    }
  }

  // Delete orphaned test users
  for (const user of testUsers) {
    try {
      const remainingMemberships = await prisma.companyMembership.count({
        where: { userId: user.id }
      });
      
      if (remainingMemberships === 0) {
        await prisma.user.delete({ where: { id: user.id } });
        console.log('Deleted user:', user.email);
      }
    } catch (err) {
      console.error('Failed to delete user', user.email, err);
    }
  }

  console.log('Done!');
  await prisma.$disconnect();
}

deleteTestData().catch(console.error);
