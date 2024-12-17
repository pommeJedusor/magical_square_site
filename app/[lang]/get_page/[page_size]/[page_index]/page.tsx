"use client"

import { useState, useEffect } from 'react';
import ArrowUp from '@/app/arrowUp';
import MagicalSquareGrid from '@/app/magicalSquareGrid';
import NavLayout from '@/app/nav';
import Pagination from '@/app/pagination';
import Link from 'next/link';

function format_number(number: string): string {
  if (number.length <= 3) return number;
  return format_number(number.slice(0, -3)) + " " + number.slice(-3);
}

function getGridFromPath(path: Array<number>): Grid {
  const grid = Array.from({ length: 10 }, () => Array(10).fill(-1));
  for (let i = 0; i < 100; i++) {
    const index = path[i];
    const y = Math.floor(index / 10);
    const x = index % 10;
    grid[y][x] = i + 1;
  }
  return new Grid(grid, 0, 0, 100, () => {});
}

async function fetchSolutions(page_size: string, page_index: string): Promise<Array<{ id: number, path: Array<number> }>> {
  const min_index = (Number(page_index) - 1) * Number(page_size) + 1;
  const max_index = (Number(page_index)) * Number(page_size);
  const solutions = []
  for (let i = min_index; i <= max_index; i++) {
    const response = await fetch(`https://api_magical_square.chesspomme.com/get_path/${i}`);
    const json = await response.json() as Array<number>;
    const path = { id: i, path: json };
    solutions.push(path);
  }
  return solutions;
}

class Grid {
  grid: number[][];
  x: number;
  y: number;
  depth: number;
  setGrid: (grid: Grid) => void;

  constructor(grid: number[][], x: number, y: number, depth: number, setGrid: (grid: Grid) => void) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.depth = depth;
    this.setGrid = setGrid;
  }
}

export default function Page({ params }: { params: { page_size: string, page_index: string, lang: string } }) {
  const { page_size, page_index, lang } = params;

  const [solutions, setSolutions] = useState<Array<{ id: number, path: Array<number> }> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  console.log(page_size);

  useEffect(() => {
    const loadSolutions = async () => {
      if (Number(page_size) > 100) {
        setErrorMessage("You can't ask for more than 100 solutions by page");
        return;
      }

      try {
        const fetchedSolutions = await fetchSolutions(page_size, page_index);
        setSolutions(fetchedSolutions);
      } catch (error) {
        setErrorMessage("Didn't achieve to retrieve the data you were looking for :(");
      }
    };

    loadSolutions();
  }, [page_size, page_index]);

  if (errorMessage) {
    return (
      <div>
        <NavLayout lang={lang} />
        <h1 className='text-light-grey text-center text-2xl mt-5'>{errorMessage}</h1>
        <p className='text-light-grey text-center text-2xl mt-5'>
          Either come back to the previous url or go to <Link href="/">Home</Link>
        </p>
      </div>
    );
  }

  if (!solutions) {
    return (
      <div>
        <NavLayout lang={lang} />
        <h1 className='text-light-grey text-center text-2xl mt-5'>Loading...</h1>
      </div>
    );
  }

  const renderContent = (lang: string) => {
    return (
      <div>
        <NavLayout lang={lang} />
        <h1 className='text-light-grey text-center text-2xl mt-5'>
          {lang === "fr" ? `Solutions pour la page ${Number(page_index)}` : `Solutions for page ${Number(page_index)}`}
        </h1>
        <Pagination page_size={Number(page_size)} page_index={Number(page_index)} lang={lang} />
        <div className='w-[97vw] flex flex-row flex-wrap justify-around my-5'>
          {solutions.map((solution, index) => (
            <div key={index} className='lg:w-[34vw] lg:h-[34vw] w-[68vw] h-[68vw] my-5'>
              <h3 className='text-dark-white mt-5 text-xl'>
                {format_number(((Number(page_index) - 1) * Number(page_size) + index + 1).toString())}.
              </h3>
              <MagicalSquareGrid key={solution.id} grid={getGridFromPath(solution.path)} input_moves={undefined} winning_moves={{ moves: [], must_show: false, reset_moves: () => { } }} />
            </div>
          ))}
        </div>
        <ArrowUp />
      </div>
    );
  };

  return renderContent(lang);
}
