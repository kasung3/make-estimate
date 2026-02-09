/**
 * Backfill script to create BoqCreationEvent records for existing BOQs
 * that were created before the event tracking system was introduced.
 * 
 * Run with: yarn tsx --require dotenv/config scripts/backfill-boq-events.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function backfillBoqEvents() {
  console.log('Starting BOQ creation events backfill...');
  
  // Get all BOQs that don't have a corresponding BoqCreationEvent
  const boqsWithoutEvents = await prisma.$queryRaw<Array<{ id: string; companyId: string; createdAt: Date }>>`
    SELECT b.id, b."companyId", b."createdAt"
    FROM "Boq" b
    LEFT JOIN "BoqCreationEvent" e ON e."boqId" = b.id
    WHERE e.id IS NULL
  `;
  
  console.log(`Found ${boqsWithoutEvents.length} BOQs without creation events`);
  
  if (boqsWithoutEvents.length === 0) {
    console.log('No backfill needed. All BOQs have creation events.');
    return;
  }
  
  // Create events for each BOQ, using the BOQ's createdAt timestamp
  let created = 0;
  for (const boq of boqsWithoutEvents) {
    try {
      await prisma.boqCreationEvent.create({
        data: {
          companyId: boq.companyId,
          boqId: boq.id,
          createdAt: boq.createdAt, // Use original BOQ creation time
        },
      });
      created++;
      console.log(`Created event for BOQ ${boq.id} (company: ${boq.companyId})`);
    } catch (error) {
      console.error(`Failed to create event for BOQ ${boq.id}:`, error);
    }
  }
  
  console.log(`\nBackfill complete! Created ${created} events.`);
}

backfillBoqEvents()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
