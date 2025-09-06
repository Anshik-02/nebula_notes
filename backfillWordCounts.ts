import { db } from "@/lib/db"; // adjust the path to your Prisma client

async function backfillWordCounts() {
  const notes = await db.note.findMany({
    include: { Block: true },
  });

  for (const note of notes) {
    const totalWords = note.Block.reduce(
      (sum, block) =>
        sum + block.content.split(/\s+/).filter(Boolean).length,
      0
    );

    await db.note.update({
      where: { id: note.id },
      data: { wordCount: totalWords },
    });
  }
}

backfillWordCounts()
  .then(() => console.log("✅ Word counts updated"))
  .catch(console.error)
  .finally(() => db.$disconnect());
