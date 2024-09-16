import NavLayout from '@/app/nav'
import UserMagicalSquareGrid from '@/app/userMagicalSquareGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Play",
  description: "Page where you can try to solve the magical square",
};

export default function HomePage({ params }: { params: { lang: string } }) {
  if (params.lang == "fr") metadata.title = "Jouer";
  return (
    <div>
      <NavLayout lang={params.lang} />
      <div className='w-[90vh] h-[90vh] max-w-[90vw] max-h-[90vw] mx-auto my-5'>
        <UserMagicalSquareGrid />
      </div>
    </div>
  );
}
