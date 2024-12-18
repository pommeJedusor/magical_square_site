import NavLayout from '@/components/nav'
import UserMagicalSquareGrid from '@/app/userMagicalSquareGrid'

export default function HomePage() {
  return (
    <div>
      <NavLayout lang={"en"} />
      <div className='w-[90vh] h-[90vh] max-w-[90vw] max-h-[90vw] mx-auto my-5'>
        <UserMagicalSquareGrid lang={"en"} />
      </div >
    </div >
  );
}
