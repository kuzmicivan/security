import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-4 p-24 `}
    >
      <Link href="/sql-injection" className='bg-blue-500 rounded p-2 hover:bg-white hover:text-blue-500'>
          1 Kategorija - SQL injection
      </Link>
      <Link href="/csrf" className='bg-blue-500 rounded p-2 hover:bg-white hover:text-blue-500'>
          2 Kategorija - Cross Site Request Forgery
      </Link>
    </main>
  )
}
