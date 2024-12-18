import NavLayout from "../../../components/nav";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <NavLayout lang={"en"} />
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
