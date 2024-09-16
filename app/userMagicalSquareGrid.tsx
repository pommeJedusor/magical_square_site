"use client"
import { useState } from "react";
import MagicalSquareGrid from "./magicalSquareGrid";
import { MoveTree } from "../utils/MoveTree";

export default function UserMagicalSquareGrid() {
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
  const [current_depth, setCurrentDepth] = useState(2);
  const [current_x, setX] = useState(0);
  const [current_y, setY] = useState(0);
  const [moves, setMoves] = useState(new MoveTree());
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
  }

  function cancelCancel() {
    if (moves.current.children.length === 0) return;
    let next_move = moves.current.children[moves.current.children.length - 1];
    moves.addMove(next_move.x, next_move.y);

    grid[next_move.y][next_move.x] = next_move.depth;
    setGrid(grid.slice());
    setCurrentDepth(moves.current.depth + 1);
    setX(next_move.x);
    setY(next_move.y);
  }


  return (
    <div className='w-full h-full mx-auto my-5'>
      <div className="w-[90%] h-10% mx-auto">
        <button type="button" onClick={cancelMove} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cancel last move</button>
        <button type="button" onClick={cancelCancel} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel last cancel</button>
      </div>
      <div className='w-[90%] h-[90%] mx-auto my-5'>
        <MagicalSquareGrid input_depth={current_depth} input_grid={grid} input_x={current_x} input_y={current_y} moves={moves} />
      </div>
    </div>
  );
}
