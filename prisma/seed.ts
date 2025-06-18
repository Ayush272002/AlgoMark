import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function seed() {
  console.log('control here');

  const dataDir = path.join(__dirname, '../data');
  const files = fs.readdirSync(dataDir).filter((file) => file.endsWith('.csv'));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const companyName = path.basename(file, '.csv');

    let company = await prisma.company.findFirst({
      where: { name: companyName },
    });
    if (!company) {
      company = await prisma.company.create({ data: { name: companyName } });
    }

    const problems: any[] = [];
    const seenIds = new Set<number>();

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const {
            ID,
            Title,
            Acceptance,
            Difficulty,
            Frequency,
            'Leetcode Question Link': Link,
          } = row;

          const parsedId = parseInt(ID);
          if (!parsedId || seenIds.has(parsedId) || !Title || !Link) return;

          seenIds.add(parsedId);

          problems.push({
            leetcodeId: parsedId,
            title: Title.trim(),
            acceptance: Acceptance.trim(),
            difficulty: Difficulty.trim(),
            frequency: parseFloat(Frequency),
            link: Link.trim(),
            companyId: company.id,
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    for (const problem of problems) {
      try {
        await prisma.problem.create({ data: problem });
      } catch (e: any) {
        if (e.code === 'P2002') continue;
        console.error(`❌ Failed on ${problem.leetcodeId} from ${file}`, e);
      }
    }

    console.log(`✅ Seeded: ${file}`);
  }

  console.log('🎉 All problems seeded successfully.');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
