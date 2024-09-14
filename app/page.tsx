import NavLayout from '@/app/nav'
import MagicalSquareGrid from '@/app/magicalSquareGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function HomePage() {
  return (
    <div>
      <NavLayout />
      <div className='w-[90vh] h-[90vh] mx-auto my-5'>
        <MagicalSquareGrid />
      </div>
    </div>
  );
}
