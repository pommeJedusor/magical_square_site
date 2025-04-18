import { ChangeEvent } from "react";

class PageInfo{
    size: number;
    index: number;
    setPageInfo: (PageInfo: PageInfo) => void;
    constructor(size: number, index: number, setPageInfo: (PageInfo: PageInfo) => void){
        this.size = size;
        this.index = index;
        this.setPageInfo = setPageInfo;
    }
}

export default function Pagination({ page_info, lang }: { page_info: PageInfo, lang: string }) {
  const max_page = Math.ceil(33938944 / page_info.size);

  function getPageIndex(to_solutions_by_page: number, solution_index: number): number {
    return Math.floor(solution_index / to_solutions_by_page) + 1;
  }

  function switchSolutionByPage(event: ChangeEvent<HTMLSelectElement>) {
    const to_solutions_by_page = Number(event.target.value);
    const solution_index = page_info.size * (page_info.index - 1) + 1;
    const new_page_index = getPageIndex(to_solutions_by_page, solution_index);
    page_info.setPageInfo(new PageInfo(to_solutions_by_page, new_page_index, page_info.setPageInfo))
  }

  if (lang == "fr") {
    return (
      <>
        <div className="flex flex-row justify-center mt-5">
          <form onSubmit={(event) => { event.preventDefault(); location.href = `./${page_info.index}` }} >
            <input name='page_index' type='number' min="1" max={max_page} value={page_info.index} className="text-black mx-2 w-24" onChange={(event) => page_info.setPageInfo(new PageInfo(page_info.size, Math.min(Number(event.target.value), max_page) || 1, page_info.setPageInfo))} />
          </form>
        </div>
        <div className="flex flex-row justify-center mt-5">
          <p className="text-dark-white mr-3 text-lg">Solutions par page : </p>
          <select value={page_info.size} onChange={switchSolutionByPage} name="lang" id="lang-select" className='d:text-xl text-center bg-normal-grey text-dark-white border-1 border-light-grey rounded'>
            <option value="4">4</option>
            <option value="10">10</option >
            <option value="50">50</option >
          </select >
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-row justify-center mt-5">
          <form onSubmit={(event) => { event.preventDefault(); location.href = `./${page_info.index}` }} >
            <input name='page_index' type='number' min="1" max={max_page} value={page_info.index} className="text-black mx-2 w-24" onChange={(event) => page_info.setPageInfo(new PageInfo(page_info.size, Math.min(Number(event.target.value), max_page) || 1, page_info.setPageInfo))} />
          </form>
        </div>
        <div className="flex flex-row justify-center mt-5">
          <p className="text-dark-white mr-3 text-lg">Solutions by page : </p>
          <select value={page_info.size} onChange={switchSolutionByPage} name="lang" id="lang-select" className='d:text-xl text-center bg-normal-grey text-dark-white border-1 border-light-grey rounded'>
            <option value="4">4</option>
            <option value="10">10</option >
            <option value="50">50</option >
          </select >
        </div>
      </>
    );
  }
}
