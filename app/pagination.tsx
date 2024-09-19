"use client"

import { ChangeEvent, useState } from "react";

function format_number(number: string): string {
  if (number.length <= 3) return number;
  return format_number(number.slice(0, -3)) + " " + number.slice(-3);
}

export default function Pagination({ page_size, page_index, lang }: { page_size: number, page_index: number, lang: string }) {
  const [target_page, setTargetPage] = useState(page_index);
  const max_page = Math.ceil(33938944 / page_size);

  function getPageIndex(to_solutions_by_page: number, solution_index: number): number {
    return Math.floor(solution_index / to_solutions_by_page) + 1;
  }

  function switchSolutionByPage(event: ChangeEvent<HTMLSelectElement>) {
    const to_solutions_by_page = Number(event.target.value);
    const solution_index = page_size * (page_index - 1) + 1;
    const new_page_index = getPageIndex(to_solutions_by_page, solution_index);
    location.href = `../${to_solutions_by_page}/${new_page_index}`;
  }

  if (lang == "fr") {
    return (
      <>
        <div className="flex flex-row justify-center mt-5">
          <button onClick={() => location.href = `./${target_page}`} className="mx-2 underline text-dark-white hover:text-white">Aller à la page {format_number(target_page.toString())} / {format_number(max_page.toString())}</button><br />
          <form onSubmit={(event) => { event.preventDefault(); location.href = `./${target_page}` }} >
            <input name='page_index' type='number' min="1" max={max_page} value={target_page} className="text-black mx-2 w-24" onChange={(event) => setTargetPage(Math.min(Number(event.target.value), max_page))} />
          </form>
        </div>
        <div className="flex flex-row justify-center mt-5">
          <p className="text-dark-white mr-3 text-lg">Solutions par page : </p>
          <select value={page_size} onChange={switchSolutionByPage} name="lang" id="lang-select" className='d:text-xl text-center bg-normal-grey text-dark-white border-1 border-light-grey rounded'>
            <option value="5">5</option>
            <option value="10">10</option >
            <option value="50">50</option >
            <option value="100">100</option >
          </select >
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-row justify-center mt-5">
          <button onClick={() => location.href = `./${target_page}`} className="mx-2 underline text-dark-white hover:text-white">Go to page {format_number(target_page.toString())} / {format_number(max_page.toString())}</button><br />
          <form onSubmit={(event) => { event.preventDefault(); location.href = `./${target_page}` }} >
            <input name='page_index' type='number' min="1" max={max_page} value={target_page} className="text-black mx-2 w-24" onChange={(event) => setTargetPage(Math.min(Number(event.target.value), max_page))} />
          </form>
        </div>
        <div className="flex flex-row justify-center mt-5">
          <p className="text-dark-white mr-3 text-lg">Solutions by page : </p>
          <select value={page_size} onChange={switchSolutionByPage} name="lang" id="lang-select" className='d:text-xl text-center bg-normal-grey text-dark-white border-1 border-light-grey rounded'>
            <option value="5">5</option>
            <option value="10">10</option >
            <option value="50">50</option >
            <option value="100">100</option >
          </select >
        </div>
      </>
    );
  }
}
