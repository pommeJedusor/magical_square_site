"use client"
import { MoveTree } from "../utils/MoveTree";
import { useEffect, useState } from "react";

function isAvailableMove(current_x: number, current_y: number, x: number, y: number): boolean {
  const current_index = current_y * 10 + current_x;
  const index = y * 10 + x;
  const possible_moves = [];
  if (x <= 6) possible_moves.push(3);
  if (x >= 3) possible_moves.push(-3);
  if (y <= 6) possible_moves.push(30);
  if (y >= 3) possible_moves.push(-30);
  if (y >= 2 && x >= 2) possible_moves.push(-22);
  if (y <= 7 && x <= 7) possible_moves.push(22);
  if (y <= 7 && x >= 2) possible_moves.push(18);
  if (y >= 2 && x <= 7) possible_moves.push(-18);
  return possible_moves.includes(current_index - index);
}

export default function MagicalSquareGrid({ input_depth, input_grid, input_x, input_y, input_moves }: { input_depth: number, input_grid: Array<Array<number>> | null, input_x: number, input_y: number, input_moves: MoveTree | undefined }) {
  const [grid, setGrid] = useState(input_grid || Array.from({ length: 10 }, () => Array(10).fill(0)));
  grid[input_y][input_x] = grid[input_y][input_x] || 1;
  const [current_depth, setCurrentDepth] = useState(input_depth);
  const [current_x, setX] = useState(input_x);
  const [current_y, setY] = useState(input_y);
  const [moves, setMoves] = useState(input_moves);

  useEffect(() => {
    setCurrentDepth(input_depth);
    setX(input_x);
    setY(input_y);
    if (input_grid) setGrid(input_grid)
    if (input_moves) setMoves(input_moves)
  }, [input_grid, input_depth, input_x, input_y, input_moves]);

  function play_move(x: number, y: number): void {
    grid[y][x] = current_depth;
    // doesn't copy the sub-array because we just want react to reload
    setGrid(grid.slice())
    setCurrentDepth(current_depth + 1);
    setX(x);
    setY(y);
    moves?.addMove(x, y)
    if (moves) {
      sessionStorage.setItem("magical_square_grid_tree", moves.toString());
      sessionStorage.setItem("magical_square_grid_location", moves.current.toString());
    }
  }
  return (
    <div className='w-full h-full bg-dark-white flex flex-col'>
      {grid.map((_, index) => (
        <Row key={index} grid={grid} y={index} current_x={current_x} current_y={current_y} current_depth={current_depth} play_move={play_move} moves={moves} />
      ))}
    </div>
  );
}

function Row({ grid, y, current_x, current_y, current_depth, play_move, moves }: { grid: Array<Array<number>>, y: number, current_x: number, current_y: number, current_depth: number, play_move: (x: number, y: number) => void, moves: MoveTree | undefined }) {
  return (
    <div className={`w-full h-[10%] flex flex-row`}>
      {grid[y].map((_, index) => (
        <Square key={index} grid={grid} x={index} y={y} current_x={current_x} current_y={current_y} current_depth={current_depth} play_move={play_move} moves={moves} />
      ))}
    </div>
  );
}

function Square({ grid, x, y, current_x, current_y, current_depth, play_move, moves }: { grid: Array<Array<number>>, x: number, y: number, current_x: number, current_y: number, current_depth: number, play_move: (x: number, y: number) => void, moves: MoveTree | undefined }) {
  const [isHovered, setHovered] = useState(false);
  const square_value = grid[y][x];
  if (square_value > 0 && square_value < 100 && y == moves?.current.y && x == moves?.current.x) {
    return (
      <div className="w-[10%] h-full border text-green-600 flex items-center justify-center font-semibold xl:text-2xl lg:text-xl sm:text-lg text-xs" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {square_value ? square_value : null}
      </div>
    );
  }
  else if (square_value || !isAvailableMove(current_x, current_y, x, y)) {
    return (
      <div className="w-[10%] h-full border text-dark-black flex items-center justify-center xl:text-2xl lg:text-xl sm:text-lg text-xs" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {square_value ? square_value : null}
      </div>
    );
  }
  else if (!isHovered && moves?.current.children.find((el) => el.x === x && el.y === y)) {
    return (
      <div className="w-[10%] h-full border-4 rounded border-red-500/40 text-dark-black/50 flex items-center justify-center text-2xl cursor-pointer" onMouseEnter={() => setHovered(true)} onClick={() => play_move(x, y)}>
      </div>
    );
  }
  else if (moves?.current.children.find((el) => el.x === x && el.y === y)) {
    return (
      <div className="w-[10%] h-full border-4 rounded border-red-500/80 text-dark-black/50 flex items-center justify-center text-2xl cursor-pointer" onMouseLeave={() => setHovered(false)} onClick={() => play_move(x, y)}>
        {square_value ? square_value : current_depth}
      </div>
    );
  }
  else if (!isHovered) {
    return (
      <div className="w-[10%] h-full border-4 rounded border-cyan-500/40 text-dark-black/50 flex items-center justify-center text-2xl cursor-pointer" onMouseEnter={() => setHovered(true)} onClick={() => play_move(x, y)}>
      </div>
    );
  } else {
    return (
      <div className="w-[10%] h-full border-4 rounded border-cyan-500/80 text-dark-black/50 flex items-center justify-center text-2xl cursor-pointer" onMouseLeave={() => setHovered(false)} onClick={() => play_move(x, y)}>
        {square_value ? square_value : current_depth}
      </div>
    );
  }
}
