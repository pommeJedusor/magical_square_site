import { Metadata } from "next";
import NavLayout from "../../nav";

export const metadata: Metadata = {
  title: "Rules",
  description: "Explain the rules of the magical square",
};

export default async function Page({ params }: { params: { lang: string } }) {
  return (
    <div>
      <NavLayout lang={params.lang} />
      <h1 className="text-dark-white text-center text-4xl my-5">The rules</h1>
      <h2 className="text-dark-white w-4/12 mx-auto text-3xl my-5">Grid Setup</h2>
      <ul className="w-4/12 mx-auto list-disc text-xl">
        <li className="my-2">
          <span className="font-black">Size</span>: The game is played on a grid that has 10 rows and 10 columns, making a total of 100 squares.
        </li>
        <li className="my-2">
          <span className="font-black">Starting Point</span>: You begin by placing the number '1' in the top left corner of the grid (the site does it for you).
        </li>
      </ul>

      <h2 className="text-dark-white w-4/12 mx-auto text-3xl my-5">Placing Numbers</h2>
      <ul className="w-4/12 mx-auto list-disc text-xl">
        <li className="my-2">
          <span className="font-black">Increasing Numbers</span>: After placing '1', you will place the next number, which is '2'. Then you will place '3', '4', and so on, all the way up to '100'
        </li>
        <li className="my-2">
          <span className="font-black">Movement Rules</span>: You can place the next number (e.g., '2') in one of the following ways:
          <ul className="w-10/12 mx-auto list-decimal text-xl">
            <li className="my-2">
              <span className="font-black">Three Cells Away</span>: Move over two squares either vertically (up or down) or horizontally (left or right).
            </li>
            <li className="my-2">
              <span className="font-black">Two Cells Diagonally</span>: Move over one square diagonally in any direction.
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-dark-white w-4/12 mx-auto text-3xl my-5">Winning and Losing</h2>
      <ul className="w-4/12 mx-auto list-disc text-xl">
        <li className="my-2">
          <span className="font-black">Winning Condition</span>: You win the game if you have pute the number '100' and filled the entire grid with numbers without breaking the movement rules.
        </li>
        <li className="my-2">
          <span className="font-black">Losing Condition</span>: You lose if you cannot make any more moves and the grid is not completely filled.
        </li>
      </ul>

    </div>
  );
}
