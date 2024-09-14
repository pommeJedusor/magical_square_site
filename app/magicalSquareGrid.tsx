"use client"
import { useState } from "react";

export default function MagicalSquareGrid() {
  const [grid, setGrid] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
  const [isGameFinished, setGameFinished] = useState(false);
  return (
    <div className='w-full h-full bg-dark-white flex flex-col'>
      {grid.map((row, index) => (
        <Row key={index} row={row} y={index} />
      ))}
    </div>
  );
}

function Row({ row, y }: { row: Array<number>, y: number }) {
  return (
    <div className={`w-full h-[10%] flex flex-row`}>
      {row.map((square, index) => (
        <Square square_value={square} x={index} y={y} />
      ))}
    </div>
  );
}

function Square({ square_value, x, y }: { square_value: number, x: number, y: number }) {
  return (
    <div className="w-[10%] h-full border text-dark-black flex items-center justify-center text-2xl">
      {square_value ? square_value : null}
    </div>
  );
}
