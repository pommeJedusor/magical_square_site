import Link from 'next/link'

export default function NavLayout() {
  return (
    <div className="sticky top-0">
      <nav className="flex h-10 items-center bg-dark-black border-b">
        {[{ "url": "/", "text": "Play" }, { "url": "/rules", "text": "Rules" }, { "url": "/get_page/10/1", "text": "See Solutions" }, { "url": "/infos", "text": "Site's infos" }].map(link => (
          <Link key={link.url} href={link.url} className="mx-5 text-xl text-light-grey hover:text-dark-white hover:underline">{link.text}</Link>
        ))}
      </nav>
    </div>
  );
}
