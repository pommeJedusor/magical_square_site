"use client"
import Link from 'next/link'

export default function NavLayout({ lang }: { lang: string }) {
  const urls = lang == "fr" ? [{ "url": "/", "text": "Jouer" }, { "url": "/rules", "text": "Règles" }, { "url": "/get_page/10/1", "text": "Voir Les Solutions" }, { "url": "/infos", "text": "À Propos" }] : [{ "url": "/", "text": "Play" }, { "url": "/rules", "text": "Rules" }, { "url": "/get_page/10/1", "text": "See Solutions" }, { "url": "/infos", "text": "About" }];
  return (
    <div className="sticky top-0">
      <nav className="flex h-10 items-center bg-dark-black border-b">
        {urls.map(link => (
          <Link key={link.url} href={`/${lang}${link.url}`} className="mx-5 md:text-xl text-center text-light-grey hover:text-dark-white hover:underline">{link.text}</Link>
        ))}
      </nav>
    </div>
  );
}
