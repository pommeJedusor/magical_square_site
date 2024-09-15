import MagicalSquareGrid from '@/app/magicalSquareGrid';
import NavLayout from '@/app/nav';
import Pagination from '@/app/pagination';
import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';


const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Solutions",
  description: "Page where you can see all the solutions I have currently found (there is a lot of them)",
};

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

function getGridFromSolution(solution: string): Array<Array<number>> {
  let grid = Array.from({ length: 10 }, () => Array(10).fill(-1))
  for (let i = 0; i < 100; i++) {
    const index = Number(solution.slice(i * 2, i * 2 + 2));
    const y = Math.floor(index / 10)
    const x = index % 10
    grid[y][x] = i + 1;
  }
  return grid;
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
      <NavLayout />
      <h1 className='text-center text-2xl mt-5'>Solutions for page {Number(page_index)}</h1>
      <Pagination page_size={Number(page_size)} page_index={Number(page_index)} />
      <div className='w-[97vw] flex flex-row flex-wrap justify-around my-5'>
        {solutions.map((solution, index) => (
          <div key={index} className='w-[34vw] h-[34vw] my-5'>
            <h3 className='mt-5 text-xl'>{(Number(page_index) - 1) * Number(page_size) + index + 1}.</h3>
            <MagicalSquareGrid key={solution.solution} input_depth={2} input_grid={getGridFromSolution(solution.solution)} input_x={5} input_y={5} />
          </div>
        ))}
      </div>
    </div>
  );
}
