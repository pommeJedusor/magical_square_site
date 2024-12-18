import { MoveTree } from "../utils/MoveTree";
import {  useEffect, useState } from "react";

class Grid{
    grid: number[][];
    x: number;
    y: number;
    depth: number;
    setGrid: (grid: Grid) => void;
    constructor(grid: number[][], x: number, y: number, depth: number, setGrid: (grid: Grid) => void){
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.depth = depth;
        this.setGrid = setGrid;
    }
}

type winning_moves_type = {moves: number[], must_show: boolean, reset_moves: (x: number, y: number) => void};

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

export default function MagicalSquareGrid({ grid, input_moves, winning_moves }: { grid: Grid, input_moves: MoveTree | undefined, winning_moves: winning_moves_type }) {
  const [moves, setMoves] = useState(input_moves);

  useEffect(() => {
    if (input_moves) setMoves(input_moves)
  }, [grid, input_moves, winning_moves]);

  function play_move(x: number, y: number): void {
    grid.grid[y][x] = grid.depth;
    grid.x = x;
    grid.y = y;
    grid.depth++;
    grid.setGrid(new Grid(grid.grid, grid.x, grid.y, grid.depth, grid.setGrid));
    moves?.addMove(x, y)
    if (moves) {
      localStorage.setItem("magical_square_grid_tree", moves.toString());
      localStorage.setItem("magical_square_grid_location", moves.current.toString());
    }
    winning_moves.reset_moves(x, y);
  }
  return (
    <div className='w-full h-full bg-dark-white flex flex-col'>
      {grid.grid.map((_, index) => (
        <Row key={index} grid={grid} y={index} play_move={play_move} moves={moves} winning_moves={winning_moves} />
      ))}
    </div>
  );
}

function Row({ grid, y, play_move, moves, winning_moves }: { grid: Grid, y: number, play_move: (x: number, y: number) => void, moves: MoveTree | undefined, winning_moves: winning_moves_type }) {
  return (
    <div className={`w-full h-[10%] flex flex-row`}>
      {grid.grid[y].map((_, index) => (
        <Square key={index} grid={grid} x={index} y={y} play_move={play_move} moves={moves} winning_moves={winning_moves} />
      ))}
    </div>
  );
}

function Square({ grid, x, y, play_move, moves, winning_moves }: { grid: Grid, x: number, y: number, play_move: (x: number, y: number) => void, moves: MoveTree | undefined, winning_moves: winning_moves_type }) {
  const [isHovered, setHovered] = useState(false);
  const square_value = grid.grid[y][x];
  if (square_value > 0 && square_value < 100 && y == moves?.current.y && x == moves?.current.x) {
    return (
      <div className="w-[10%] h-full border text-green-600 flex items-center justify-center font-semibold xl:text-2xl lg:text-xl sm:text-lg text-xs" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {square_value ? square_value : null}
      </div>
    );
  }
  else if (square_value || !isAvailableMove(grid.x, grid.y, x, y)) {
    return (
      <div className="w-[10%] h-full border text-dark-black flex items-center justify-center xl:text-2xl lg:text-xl sm:text-lg text-xs" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {square_value ? square_value : null}
      </div>
    );
  }
  else if (!isHovered && winning_moves.must_show && winning_moves.moves.includes(y * 10 + x)) {
    return (
      <div className="w-[10%] h-full border-4 rounded border-green-500/40 text-dark-black/50 flex items-center justify-center text-2xl cursor-pointer" onMouseEnter={() => setHovered(true)} onClick={() => play_move(x, y)}>
      </div>
    );
  }
  else if (winning_moves.must_show && winning_moves.moves.includes(y * 10 + x)) {
    return (
      <div className="w-[10%] h-full border-4 rounded border-green-500/80 text-dark-black/50 flex items-center justify-center text-2xl cursor-pointer" onMouseLeave={() => setHovered(false)} onClick={() => play_move(x, y)}>
        {square_value ? square_value : grid.depth}
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
        {square_value ? square_value : grid.depth}
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
        {square_value ? square_value : grid.depth}
      </div>
    );
  }
}
