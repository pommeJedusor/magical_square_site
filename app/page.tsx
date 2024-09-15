import NavLayout from '@/app/nav'
import MagicalSquareGrid from '@/app/magicalSquareGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Play",
  description: "Page where you can try to solve the magical square",
};

export default function HomePage() {
  return (
    <div>
      <NavLayout />
      <div className='w-[90vh] h-[90vh] mx-auto my-5'>
        <MagicalSquareGrid input_depth={2} input_grid={null} input_x={0} input_y={0} />
      </div>
    </div>
  );
}
