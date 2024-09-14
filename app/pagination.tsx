"use client"

import { useState } from "react";

export default function Pagination({ page_size, page_index }: { page_size: number, page_index: number }) {
  const [target_page, setTargetPage] = useState(page_index);
  const max_page = Math.ceil(33938944 / page_size);
  return (
    <>
      <div className="flex flex-row justify-center mt-5">
        <button onClick={() => location.href = `./${target_page}`} className="mx-2 underline text-dark-white hover:text-white">Go to page {target_page} / {max_page}</button><br />
        <input name='page_index' type='number' min="1" max={max_page} value={target_page} className="text-black mx-2 w-24" onChange={(event) => setTargetPage(Math.min(Number(event.target.value), max_page))} />
      </div>
    </>
  );
}
