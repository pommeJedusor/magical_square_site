"use client"
import { useState } from "react";
import MagicalSquareGrid from "./magicalSquareGrid";
import { MoveTree } from "../utils/MoveTree";
import Image from "next/image"

export default function UserMagicalSquareGrid() {
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
  const [current_depth, setCurrentDepth] = useState(2);
  const [current_x, setX] = useState(0);
  const [current_y, setY] = useState(0);
  const [moves] = useState(new MoveTree());
  grid[current_y][current_x] = grid[current_y][current_x] || 1;

  function cancelMove() {
    if (moves.current.depth <= 1) return;
    let last_move = moves.current;
    grid[last_move.y][last_move.x] = 0;
    moves.cancelMove();
    last_move = moves.current;
    setGrid(grid.slice());
    setCurrentDepth(moves.current.depth + 1);
    setX(last_move.x);
    setY(last_move.y);
    sessionStorage.setItem("magical_square_grid_tree", moves.toString());
    sessionStorage.setItem("magical_square_grid_location", moves.current.toString());
  }

  function cancelCancel() {
    if (moves.current.children.length === 0) return;
    const next_move = moves.current.children[moves.current.children.length - 1];
    moves.addMove(next_move.x, next_move.y);

    grid[next_move.y][next_move.x] = next_move.depth;
    setGrid(grid.slice());
    setCurrentDepth(moves.current.depth + 1);
    setX(next_move.x);
    setY(next_move.y);
    sessionStorage.setItem("magical_square_grid_tree", moves.toString());
    sessionStorage.setItem("magical_square_grid_location", moves.current.toString());
  }


  return (
    <div className='w-full h-full mx-auto my-5'>
      <div className="w-32 h-10% mx-auto">
        <button onClick={cancelMove} type="button" className="mx-2 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 hover:outline-none hover:ring-4 hover:ring-green-300 dark:hover:ring-green-800 hover:bg-green-600 bg-green-700 p-1 rounded">
          <Image className="w-10" width={500} height={500} src="/arrow-u-up-left-svgrepo-com.svg" alt="arrow going backward" />
        </button>
        <button onClick={cancelCancel} type="button" className="mx-2 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 hover:outline-none hover:ring-4 hover:ring-red-300 dark:hover:ring-red-800 hover:bg-red-600 bg-red-700 p-1 rounded">
          <Image className="w-10" width={500} height={500} src="/arrow-u-up-right-svgrepo-com.svg" alt="arrow going backward" />
        </button>
      </div>
      <div className='w-[90%] h-[90%] mx-auto my-5'>
        <MagicalSquareGrid input_depth={current_depth} input_grid={grid} input_x={current_x} input_y={current_y} moves={moves} />
      </div>
    </div>
  );
}
