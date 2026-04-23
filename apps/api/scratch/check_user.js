const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@neqtra.com' }
  });
  console.log('USER_CHECK:', user ? 'EXISTS' : 'NOT_FOUND');
  if (user) {
    console.log('USER_DETAILS:', JSON.stringify({ email: user.email, role: user.role }));
  }
}

check().finally(() => prisma.$disconnect());
