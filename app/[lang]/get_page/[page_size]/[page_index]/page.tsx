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

function format_number(number: string): string {
  if (number.length <= 3) return number;
  return format_number(number.slice(0, -3)) + " " + number.slice(-3);
}

async function fetchSolutions(page_size: string, page_index: string): Promise<Array<{ id: number, solution: string }> | string> {
  const min_index = (Number(page_index) - 1) * Number(page_size) + 1;
  const max_index = (Number(page_index)) * Number(page_size);
  try {
    const solutions = await prisma.solutions.findMany({
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
  const grid = Array.from({ length: 10 }, () => Array(10).fill(-1))
  for (let i = 0; i < 100; i++) {
    const index = Number(solution.slice(i * 2, i * 2 + 2));
    const y = Math.floor(index / 10)
    const x = index % 10
    grid[y][x] = i + 1;
  }
  return grid;
}

export default async function Page({ params }: { params: { page_size: string, page_index: string, lang: string } }) {
  const { page_size, page_index, lang } = params;

  let error_message = "";
  if (Number(page_size) > 100) {
    error_message = "You can't ask for more than a 100 solutions by page";
  }

  const solutions = error_message || await fetchSolutions(page_size, page_index);

  // error handling
  if (!error_message && typeof solutions == "string") {
    error_message = "Didn't achieve to retrive the datas you were looking for :(";
  }
  if (error_message || typeof solutions == "string") {
    return (
      <div>
        <NavLayout lang={lang} />
        <h1 className='text-light-grey text-center text-2xl mt-5'>{error_message}</h1>
        <p className='text-light-grey text-center text-2xl mt-5'>Either come back to the previous url or go to <Link href="/" >Home</Link></p>
      </div >
    );
  }
  if (!solutions || solutions.length === 0) {
    notFound();
  }

  if (params.lang == "fr") {
    return (
      <div>
        <NavLayout lang={params.lang} />
        <h1 className='text-light-grey text-center text-2xl mt-5'>Solutions pour la page {Number(page_index)}</h1>
        <Pagination page_size={Number(page_size)} page_index={Number(page_index)} lang={params.lang} />
        <div className='w-[97vw] flex flex-row flex-wrap justify-around my-5'>
          {solutions.map((solution, index) => (
            <div key={index} className='lg:w-[34vw] lg:h-[34vw] w-[68vw] h-[68vw] my-5'>
              <h3 className='text-dark-white mt-5 text-xl'>{format_number(((Number(page_index) - 1) * Number(page_size) + index + 1).toString())}.</h3>
              <MagicalSquareGrid key={solution.solution} input_depth={2} input_grid={getGridFromSolution(solution.solution)} input_x={5} input_y={5} moves={undefined} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <NavLayout lang={params.lang} />
        <h1 className='text-light-grey text-center text-2xl mt-5'>Solutions for page {Number(page_index)}</h1>
        <Pagination page_size={Number(page_size)} page_index={Number(page_index)} lang={params.lang} />
        <div className='w-[97vw] flex flex-row flex-wrap justify-around my-5'>
          {solutions.map((solution, index) => (
            <div key={index} className='lg:w-[34vw] lg:h-[34vw] w-[68vw] h-[68vw] my-5'>
              <h3 className='text-dark-white mt-5 text-xl'>{format_number(((Number(page_index) - 1) * Number(page_size) + index + 1).toString())}.</h3>
              <MagicalSquareGrid key={solution.solution} input_depth={2} input_grid={getGridFromSolution(solution.solution)} input_x={5} input_y={5} moves={undefined} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
