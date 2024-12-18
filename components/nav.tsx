"use client"
import Link from 'next/link'
import { ChangeEvent } from 'react';

export default function NavLayout({ lang }: { lang: string }) {
  const urls = lang == "fr" ? [{ "url": "/", "text": "Jouer" }, { "url": "/rules", "text": "Règles" }, { "url": "/get_page/10/1", "text": "Voir Les Solutions" }, { "url": "/infos", "text": "À Propos" }] : [{ "url": "/", "text": "Play" }, { "url": "/rules", "text": "Rules" }, { "url": "/get_page/10/1", "text": "See Solutions" }, { "url": "/infos", "text": "About" }];

  function switchLanguage(event: ChangeEvent<HTMLSelectElement>) {
    const new_lang = event.target.value;
    const path = location.pathname.slice(3);
    location.href = `/${new_lang}${path}`;
  }

  function valueLanguageToTextLanguage(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  const other_lang = lang == "fr" ? "en" : "fr";
  const languages = {
    "current": {
      "value": lang,
      "text": valueLanguageToTextLanguage(lang),
    },
    "other": {
      "value": other_lang,
      "text": valueLanguageToTextLanguage(other_lang),
    },
  }

  return (
    <div className="sticky top-0">
      <nav className="flex h-10 items-center bg-dark-black border-b">
        {urls.map(link => (
          <Link key={link.url} href={`/${lang}${link.url}`} className="mx-5 md:text-xl text-center text-light-grey hover:text-dark-white hover:underline">{link.text}</Link>
        ))}
        <select onChange={switchLanguage} name="lang" id="lang-select" className='ml-auto mr-5 md:text-xl text-center bg-dark-grey text-dark-white border-1 border-light-grey rounded'>
          <option value={languages.current.value}>{languages.current.text}</option>
          <option value={languages.other.value}>{languages.other.text}</option>
        </select>
      </nav>
    </div>
  );
}
