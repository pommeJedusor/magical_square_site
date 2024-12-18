import NavLayout from '@/components/nav'
import UserMagicalSquareGrid from '@/pages/userMagicalSquareGrid'

export default function HomePage({ params }: { params: { lang: string } }) {
  return (
    <div>
      <NavLayout lang={params.lang} />
      <div className='w-[90vh] h-[90vh] max-w-[90vw] max-h-[90vw] mx-auto my-5'>
        <UserMagicalSquareGrid lang={params.lang} />
      </div >
    </div >
  );
}
