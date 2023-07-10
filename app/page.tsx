import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div>
        <h1>Welcome!</h1>
        <Link href='/login'>Login</Link>
        <Link href='/register'>Register</Link>
      </div>
    </main>
  )
}
