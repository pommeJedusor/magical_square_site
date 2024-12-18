"use client"
import Image from "next/image"

export default function ArrowUp() {
  function goUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <button onClick={goUp} type="button" className="bottom-3 right-3 sm:bottom-10 sm:right-10 fixed flex items-center w-10 h-10 sm:w-12 sm:h-12 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 hover:outline-none hover:ring-4 hover:ring-red-300 dark:hover:ring-red-800 hover:bg-red-600 bg-red-700 p-1 rounded">
        <Image className="w-10 h-10 mx-auto" width={500} height={500} src="/arrow-up-svgrepo-com.svg" alt="arrow going backward" />
      </button>
    </div>
  )
}
