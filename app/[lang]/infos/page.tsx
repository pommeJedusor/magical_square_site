import { Metadata } from "next";
import NavLayout from "../../nav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site Info",
  description: "Describe the site and gives interesting infos",
};

export default async function Page({ params }: { params: { lang: string } }) {
  if (params.lang == "fr") {
    metadata.title = "Information sur le site";
    return (
      <div>
        <NavLayout lang={params.lang} />
        <h1 className="text-dark-white text-center text-4xl my-5">Informations</h1>
        <h2 className="text-dark-white w-10/12 md:w-4/12 mx-auto text-3xl my-5">Algorithme de résolution</h2>
        <p className="w-10/12 md:w-4/12 mx-auto text-xl text-dark-white">
          J'ai codé un algorithme complex en python qui peut trouver jusqu'à 33 938 944 solutions en seulement quelques minutes.
          Si les récursives, les tables de transpositions et les opérations binaires ne vous font pas peur, voici <Link target="_blank" href="https://github.com/pommeJedusor/magical_square" className="text-light-grey hover:text-white hover:underline">le code</Link>
        </p>
        <h2 className="text-dark-white w-10/12 md:w-4/12 mx-auto text-3xl my-5">Le site</h2>
        <p className="w-10/12 md:w-4/12 mx-auto text-xl text-dark-white">
          J'ai codé ce site en utilisant react, next.js, typescript et tailwindcss.
          si vous voulez le voir, voici <Link target="_blank" href="https://github.com/pommeJedusor/magical_square_site" className="text-light-grey hover:text-white hover:underline">le code</Link>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <NavLayout lang={params.lang} />
        <h1 className="text-dark-white text-center text-4xl my-5">Informations</h1>
        <h2 className="text-dark-white w-10/12 md:w-4/12 mx-auto text-3xl my-5">Solutions finder</h2>
        <p className="w-10/12 md:w-4/12 mx-auto text-xl text-dark-white">
          I coded a complex python algorithm that can find 33 938 944 solutions in only some minutes.
          If recursives, transposition tables and binary operations don't scare you, here is <Link target="_blank" href="https://github.com/pommeJedusor/magical_square" className="text-light-grey hover:text-white hover:underline">the code</Link>
        </p>
        <h2 className="text-dark-white w-10/12 md:w-4/12 mx-auto text-3xl my-5">This site</h2>
        <p className="w-10/12 md:w-4/12 mx-auto text-xl text-dark-white">
          I coded this site using react, next.js, typescript and tailwindcss.
          if you want to see it, here is <Link target="_blank" href="https://github.com/pommeJedusor/magical_square_site" className="text-light-grey hover:text-white hover:underline">the code</Link>
        </p>
      </div>
    );
  }
}
