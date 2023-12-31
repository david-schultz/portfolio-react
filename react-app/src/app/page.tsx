import Image from 'next/image'
import { Button } from '@/components/ui/button.tsx'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>hi welcome to chilis</h1>
      <Button>say that</Button>
    </main>
  )
}
