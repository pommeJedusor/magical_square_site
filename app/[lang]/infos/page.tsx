import { Metadata } from "next";
import NavLayout from "../../nav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site Info",
  description: "Describe the site and gives interesting infos",
};

export default async function Page({ params }: { params: { lang: string } }) {
  return (
    <div>
      <NavLayout lang={params.lang} />
      <h1 className="text-dark-white text-center text-4xl my-5">Informations</h1>
      <h2 className="text-dark-white w-4/12 mx-auto text-3xl my-5">Solutions finder</h2>
      <p className="w-4/12 mx-auto text-xl">
        I coded a complex python algorithm that can find 33 938 944 solutions in only some minutes.
        If recursives, transposition tables and binary operations don't scare you, here is <Link target="_blank" href="https://github.com/pommeJedusor/magical_square" className="text-dark-white hover:text-white hover:underline">the code</Link>
      </p>
      <h2 className="text-dark-white w-4/12 mx-auto text-3xl my-5">This site</h2>
      <p className="w-4/12 mx-auto text-xl">
        I coded this sites using react, next.js, typescript and tailwindcss.
        if you want to see it, here is <Link target="_blank" href="https://github.com/pommeJedusor/magical_square_site" className="text-dark-white hover:text-white hover:underline"> the code</Link>
      </p>
    </div>
  );
}
