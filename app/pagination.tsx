"use client"

import { useState } from "react";

function format_number(number: string): string {
  if (number.length <= 3) return number;
  return format_number(number.slice(0, -3)) + " " + number.slice(-3);
}

export default function Pagination({ page_size, page_index, lang }: { page_size: number, page_index: number, lang: string }) {
  const [target_page, setTargetPage] = useState(page_index);
  const max_page = Math.ceil(33938944 / page_size);
  if (lang == "fr") {
    return (
      <>
        <div className="flex flex-row justify-center mt-5">
          <button onClick={() => location.href = `./${target_page}`} className="mx-2 underline text-dark-white hover:text-white">Aller à la page {format_number(target_page.toString())} / {format_number(max_page.toString())}</button><br />
          <form onSubmit={(event) => { event.preventDefault(); location.href = `./${target_page}` }} >
            <input name='page_index' type='number' min="1" max={max_page} value={target_page} className="text-black mx-2 w-24" onChange={(event) => setTargetPage(Math.min(Number(event.target.value), max_page))} />
          </form>
        </div >
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
      </>
    );
  }
}
