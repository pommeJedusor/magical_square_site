"use client"
import { useState } from "react";

export default function MagicalSquareGrid() {
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
  grid[0][0] = 1;
  const [current_index, setCurrentIndex] = useState(2);
  const [isGameFinished, setGameFinished] = useState(false);
  return (
    <div className='w-full h-full bg-dark-white flex flex-col'>
      {grid.map((row, index) => (
        <Row key={index} grid={grid} y={index} current_index={current_index} />
      ))}
    </div>
  );
}

function Row({ grid, y, current_index }: { grid: Array<Array<number>>, y: number, current_index: number }) {
  return (
    <div className={`w-full h-[10%] flex flex-row`}>
      {grid[y].map((square, index) => (
        <Square grid={grid} x={index} y={y} current_index={current_index} />
      ))}
    </div>
  );
}

function Square({ grid, x, y, current_index }: { grid: Array<Array<number>>, x: number, y: number, current_index: number }) {
  const [isHovered, setHovered] = useState(false);
  const square_value = grid[y][x];
  if (!isHovered || square_value) {
    return (
      <div className="w-[10%] h-full border text-dark-black flex items-center justify-center text-2xl" onMouseEnter={() => setHovered(true)}>
        {square_value ? square_value : null}
      </div>
    );
  } else {
    return (
      <div className="w-[10%] h-full border text-dark-black/50 flex items-center justify-center text-2xl cursor-pointer" onMouseLeave={() => setHovered(false)}>
        {square_value ? square_value : current_index}
      </div>
    );

  }
}
