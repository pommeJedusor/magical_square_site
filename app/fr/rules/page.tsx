import NavLayout from "../../../components/nav";

export default async function Page() {
  return (
    <div>
      <NavLayout lang={"fr"} />
      <h1 className="text-light-grey text-center text-4xl my-5">Les règles</h1>
      <h2 className="text-light-grey w-10/12 lg:w-4/12 mx-auto text-3xl my-5">La grille</h2>
      <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl text-dark-white">
        <li className="my-2">
          <span className="font-black">Taille</span>: Le jeu se joue sur une grille de 10 rangées et 10 colonnes, soit un total de 100 cases.
        </li>
        <li className="my-2">
          <span className="font-black">Point de départ</span>: Vous commencez par placer le chiffre '1' dans le coin supérieur gauche de la grille (le site le fait pour vous).
        </li>
      </ul>

      <h2 className="text-light-grey w-10/12 lg:w-4/12 mx-auto text-3xl my-5">Placement des chiffres</h2>
      <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl text-dark-white">
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

      <h2 className="text-light-grey w-10/12 lg:w-4/12 mx-auto text-3xl my-5">Gagner et perdre</h2>
      <ul className="w-10/12 lg:w-4/12 mx-auto list-disc text-xl text-dark-white">
        <li className="my-2">
          <span className="font-black">Condition de victoire</span>: Vous gagnez le jeu si vous avez placé le chiffre '100' et rempli toute la grille avec des chiffres sans enfreindre les règles de mouvement.
        </li>
        <li className="my-2">
          <span className="font-black">Condition de perte</span>: Vous perdez si vous ne pouvez plus faire de mouvements et que la grille n'est pas complètement remplie.
        </li>
      </ul>
    </div>
  );
}
