import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

async function fetchSolutions(page_size: string, page_index: string): Promise<Array<{ id: number, solution: string }> | string> {
  const min_index = (Number(page_index) - 1) * Number(page_size) + 1;
  const max_index = (Number(page_index)) * Number(page_size);
  try {
    const solutions = await prisma.Solutions.findMany({
      where: {
        id: {
          gte: min_index,
          lte: max_index,
        },
      },
    });
    return solutions;
  } catch (error) {
    return 'Failed to fetch solutions';
  }
}

export default async function Page({ params }: { params: { page_size: string, page_index: string } }) {
  const { page_size, page_index } = params;

  const solutions = await fetchSolutions(page_size, page_index);

  // error handling
  if (typeof solutions == "string") {
    return (
      <div>
        <h1>Didn't achieve to retrive the datas you were looking for :(</h1>
        <p>Either come back to the previous url or go to <Link href="/" >Home</Link></p>
      </div >
    );
  }
  if (!solutions || solutions.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1>Solutions for page {Number(page_index)}</h1>
      <ul>
        {solutions.map((solution) => (
          <li key={solution.id}>{solution.solution}</li>
        ))}
      </ul>
    </div>
  );
}
