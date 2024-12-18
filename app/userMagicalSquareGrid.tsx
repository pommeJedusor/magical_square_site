"use client"
import { useEffect, useState } from "react";
import MagicalSquareGrid from "../components/magicalSquareGrid";
import { MoveTree, Node } from "../utils/MoveTree";
import Image from "next/image"

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

export default function UserMagicalSquareGrid({ lang }: { lang: string }) {
  const [grid, setGrid] = useState(new Grid(Array.from({ length: 10 }, () => Array(10).fill(0)), 0, 0, 2, () => {}));
  const [moves, setMoves] = useState(new MoveTree());
  const [winning_moves, setWinningMoves] = useState({"must_show": false, "moves": [], "reset_moves": reset_winning_moves});
  grid.grid[grid.y][grid.x] = grid.grid[grid.y][grid.x] || 1;
  grid.setGrid = setGrid;

  // reload MoveTree
  useEffect(() => {
    const str_tree = localStorage.getItem("magical_square_grid_tree")
    const str_location = localStorage.getItem("magical_square_grid_location");
    reset_winning_moves(grid.x, grid.y);
    if (str_tree && str_tree !== moves.toString()) {
      const new_moves = MoveTree.fromString(str_tree, str_location || "");

      //reload grid
      const temp_moves = [new_moves.current];
      let temp_node = new_moves.current.parent;
      while (temp_node) {
        temp_moves.push(temp_node);
        temp_node = temp_node.parent;
      }
      for (let i = 1; i <= temp_moves.length; i++) {
        const move = temp_moves.at(-i) as Node;
        grid.grid[move.y][move.x] = i;
      }

      grid.depth = (str_location || "").split(";").length + 1;
      grid.x = temp_moves.at(0)?.x || grid.x;
      grid.y = temp_moves.at(0)?.y || grid.y;
      setGrid(new Grid(grid.grid, grid.x, grid.y, grid.depth, grid.setGrid));
      setMoves(new_moves);
    }
  }, [moves, grid, grid.x, grid.y]);

  function cancelMove() {
    if (moves.current.depth <= 1) return;
    let last_move = moves.current;
    grid.grid[last_move.y][last_move.x] = 0;
    moves.cancelMove();
    last_move = moves.current;
    grid.x = last_move.x;
    grid.y = last_move.y;
    setGrid(new Grid(grid.grid, grid.x, grid.y, grid.depth - 1, grid.setGrid));
    reset_winning_moves(grid.x, grid.y);
    localStorage.setItem("magical_square_grid_tree", moves.toString());
    localStorage.setItem("magical_square_grid_location", moves.current.toString());
  }

  function cancelCancel() {
    if (moves.current.children.length === 0) return;
    const next_move = moves.current.children[moves.current.children.length - 1];
    moves.addMove(next_move.x, next_move.y);

    grid.grid[next_move.y][next_move.x] = next_move.depth;
    grid.x = next_move.x;
    grid.y = next_move.y;
    setGrid(new Grid(grid.grid, grid.x, grid.y, grid.depth + 1, grid.setGrid));
    reset_winning_moves(grid.x, grid.y);
    localStorage.setItem("magical_square_grid_tree", moves.toString());
    localStorage.setItem("magical_square_grid_location", moves.current.toString());
  }

  function refresh() {
    const confirm_text = lang === "fr" ? "Réinitialiser la partie?" : "Reset the game?";
    if (confirm(confirm_text)) {
      localStorage.removeItem("magical_square_grid_tree");
      localStorage.removeItem("magical_square_grid_location");
      location.reload();
    }
  }

  function get_hash(index: number): string{
      let hash = BigInt(0);
      for (let y=0;y<10;y++){
          for (let x=0;x<10;x++){
              if (grid.grid[y][x]){
                  const index = y * 10 + x;
                  hash |=  BigInt(1) << BigInt(index);
              }
          }
      }
      hash |= BigInt(index) << BigInt(100);
      return hash.toString();
  }

  function reset_winning_moves(x: number, y: number): void {
    const current_index = y * 10 + x;
    const hash = get_hash(current_index);
    fetch(`https://api_magical_square.chesspomme.com/get_moves/${hash}`)
      .then(response => {
        if (!response.ok)return null;
        return response.json();
      })
      .then(response => {
          if (response === null)return;
          winning_moves.moves = response;
          setWinningMoves({"must_show": winning_moves.must_show, "moves": response, "reset_moves": reset_winning_moves})
      });
  }

  function toggle_cheat(): void{
        winning_moves.must_show = !winning_moves.must_show;
        setWinningMoves({"must_show": winning_moves.must_show, "moves": winning_moves.moves, "reset_moves": reset_winning_moves});
        reset_winning_moves(grid.x, grid.y);
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
      <div className='w-[90%] h-[90%] mx-auto my-5 flex flex-row items-center'>
        <button onClick={toggle_cheat} type="button" className="flex items-center w-12 h-12 mr-5 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800 hover:outline-none hover:ring-4 hover:ring-yellow-300 dark:hover:ring-yellow-800 hover:bg-yellow-600 bg-yellow-700 p-1 rounded">
          <Image className="w-10 h-10 mx-auto" width={500} height={500} src="/star-svgrepo-com.svg" alt="arrow going backward" />
        </button>
        <div className='w-[90%] h-[90%] mx-auto my-5'>
          <MagicalSquareGrid grid={grid} input_moves={moves} winning_moves={winning_moves} />
        </div>
        <button onClick={refresh} type="button" className="flex items-center w-12 h-12 ml-5 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 hover:outline-none hover:ring-4 hover:ring-sky-300 dark:hover:ring-sky-800 hover:bg-sky-600 bg-sky-700 p-1 rounded">
          <Image className="w-10 h-10 mx-auto rotate-270" width={500} height={500} src="/refresh-svgrepo-com.svg" alt="arrow going backward" />
        </button>
      </div>
    </div>
  );
}
