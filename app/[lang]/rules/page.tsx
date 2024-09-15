import { Metadata } from "next";
import NavLayout from "../../nav";

export const metadata: Metadata = {
  title: "Rules",
  description: "Explain the rules of the magical square",
};

export default async function Page({ params }: { params: { lang: string } }) {
  if (params.lang == "fr") {
    metadata.title = "Règles"
    return (
      <div>
        <NavLayout lang={params.lang} />
        <h1 className="text-dark-white text-center text-4xl my-5">Les règles</h1>
        <h2 className="text-dark-white w-10/12 lg:w-4/12 mx-auto text-3xl my-5">La grille</h2>
        <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl">
          <li className="my-2">
            <span className="font-black">Taille</span>: Le jeu se joue sur une grille de 10 rangées et 10 colonnes, soit un total de 100 cases.
          </li>
          <li className="my-2">
            <span className="font-black">Point de départ</span>: Vous commencez par placer le chiffre '1' dans le coin supérieur gauche de la grille (le site le fait pour vous).
          </li>
        </ul>

        <h2 className="text-dark-white w-10/12 lg:w-4/12 mx-auto text-3xl my-5">Placement des chiffres</h2>
        <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl">
          <li className="my-2">
            <span className="font-black">Ordre des chiffres</span>: Après avoir placé '1', vous placerez le chiffre suivant, qui est '2'. Ensuite, vous placerez '3', '4', et ainsi de suite, jusqu'à '100'.
          </li>
          <li className="my-2">
            <span className="font-black">Règles des mouvements</span>: Vous pouvez placer le chiffre suivant (par exemple, '2') de l'une des manières suivantes:
            <ul className="w-10/12 mx-auto list-decimal text-xl">
              <li className="my-2">
                <span className="font-black">Trois cases de distance</span>: Sautez par dessus deux cases soit verticalement (vers le haut ou vers le bas), soit horizontalement (vers la gauche ou vers la droite).
              </li>
              <li className="my-2">
                <span className="font-black">Deux cases en diagonale</span>: Sautez par dessus une case en diagonale dans n'importe quelle direction.
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-dark-white w-10/12 lg:w-4/12 mx-auto text-3xl my-5">Gagner et perdre</h2>
        <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl">
          <li className="my-2">
            <span className="font-black">Condition de victoire</span>: Vous gagnez le jeu si vous avez placé le chiffre '100' et rempli toute la grille avec des chiffres sans enfreindre les règles de mouvement.
          </li>
          <li className="my-2">
            <span className="font-black">Condition de perte</span>: Vous perdez si vous ne pouvez plus faire de mouvements et que la grille n'est pas complètement remplie.
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <NavLayout lang={params.lang} />
        <h1 className="text-dark-white text-center text-4xl my-5">The rules</h1>
        <h2 className="text-dark-white w-10/12 lg:w-4/12 mx-auto text-3xl my-5">Grid Setup</h2>
        <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl">
          <li className="my-2">
            <span className="font-black">Size</span>: The game is played on a grid that has 10 rows and 10 columns, making a total of 100 squares.
          </li>
          <li className="my-2">
            <span className="font-black">Starting Point</span>: You begin by placing the number '1' in the top left corner of the grid (the site does it for you).
          </li>
        </ul>

        <h2 className="text-dark-white w-10/12 lg:w-4/12 mx-auto text-3xl my-5">Placing Numbers</h2>
        <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl">
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

        <h2 className="text-dark-white w-10/12 lg:w-4/12 mx-auto text-3xl my-5">Winning and Losing</h2>
        <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl">
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
}
