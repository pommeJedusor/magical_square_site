"use client"

import { useState, useEffect } from 'react';
import ArrowUp from '@/app/arrowUp';
import MagicalSquareGrid from '@/components/magicalSquareGrid';
import NavLayout from '@/components/nav';
import Pagination from '@/components/pagination';

class PageInfo{
    size: number;
    index: number;
    setPageInfo: (PageInfo: PageInfo) => void;
    constructor(size: number, index: number, setPageInfo: (PageInfo: PageInfo) => void){
        this.size = size;
        this.index = index;
        this.setPageInfo = setPageInfo;
    }
}

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

function SolutionGrid({ page_index }: {page_index: number}){
    const [path, setPath] = useState<Array<number>|null>(null);
    useEffect(() => {
        const getSolution = async () => {
            const response = await fetch(`https://api_magical_square.chesspomme.com/get_path/${page_index}`);
            const json = await response.json() as Array<number>;
            setPath(json);
        }
        getSolution();
    }, [page_index]);

    return (
        <>
          <MagicalSquareGrid grid={path ? getGridFromPath(path) : new Grid(Array(10).fill(Array(10).fill(0)), 101, 0, 100, ()=>{})} input_moves={undefined} winning_moves={{ moves: [], must_show: false, reset_moves: () => { } }} />
        </>
    );
}

export default function Page() {
  const [page_info, setPageInfo] = useState(new PageInfo(10, 1, ()=>{}));
  page_info.setPageInfo = setPageInfo;

  const renderContent = (lang: string) => {
    return (
      <div>
        <NavLayout lang={lang} />
        <h1 className='text-light-grey text-center text-2xl mt-5'>
          {lang === "fr" ? `Solutions pour la page ${page_info.index}` : `Solutions for page ${page_info.index}`}
        </h1>
        <Pagination page_info={page_info} lang={lang} />
        <div className='w-[97vw] flex flex-row flex-wrap justify-around my-5'>
          {Array(page_info.size).fill(1).map((solution, index) => (
            <div key={index} className='lg:w-[34vw] lg:h-[34vw] w-[68vw] h-[68vw] my-5'>
              <h3 className='text-dark-white mt-5 text-xl'>
                {format_number(((page_info.index - 1) * page_info.size + index + 1).toString())}.
              </h3>
              <SolutionGrid key={index} page_index={(page_info.index - 1) * page_info.size + index} />
            </div>
          ))}
        </div>
        <ArrowUp />
      </div>
    );
  };

  return renderContent("en");
}
