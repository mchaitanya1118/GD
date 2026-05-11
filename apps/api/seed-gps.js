const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const riders = [
  "cmp19u8nh0003sso7o6chdzhs",
  "cmp19u8or0005sso77fdhudke",
  "cmp19u8pg0007sso7iimri28l",
  "cmp19u8pq0009sso7a4kig5iv",
  "cmp19u8q4000bsso7d8w3b0uh",
  "cmp19u8qh000dsso713bkcapy",
  "cmp19u8qy000fsso7za3gtarp",
  "cmp19u8re000hsso7spqys91u",
  "cmp19u8rs000jsso76safd05p",
  "cmp19u8s1000lsso7n2kijfba"
];

const BASE_LAT = 24.7136;
const BASE_LNG = 46.6753;

async function main() {
  console.log('Seeding initial GPS data for Riyadh area...');
  for (const id of riders) {
    const lat = BASE_LAT + (Math.random() - 0.5) * 0.2;
    const lng = BASE_LNG + (Math.random() - 0.5) * 0.2;
    
    try {
      await prisma.rider.update({
        where: { id },
        data: {
          lastLat: lat,
          lastLng: lng,
          lastLocationUpdate: new Date()
        }
      });
      
      await prisma.riderLocation.create({
        data: {
          riderId: id,
          lat,
          lng,
          timestamp: new Date()
        }
      });
      console.log(`Seeded GPS for rider: ${id}`);
    } catch (e) {
      console.error(`Failed to seed ${id}:`, e.message);
    }
  }
  console.log('Seed complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
