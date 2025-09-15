"use client"

import SpinningCards from "./components/SpinningCards"
import Hero from "./components/Hero"
import HorizontalStackCards from "./components/HorizontalStackCards"

const cards = new Array(7).fill(0).map((_, i) => ({
  id: `Card ${i + 1}`,
  title: `#${i + 1}`,
  color:
    i % 2 ? "linear-gradient(135deg,#ffd2a8,#ff9b9b)" : "linear-gradient(135deg,#d7fce8,#9be7ff)",
}))

const images = [
  "https://picsum.photos/id/1005/200/300",
  "https://picsum.photos/id/1011/200/300",
  "https://picsum.photos/id/1012/200/300",
  "https://picsum.photos/id/1015/200/300",
  "https://picsum.photos/id/1020/200/300",
  "https://picsum.photos/id/1021/200/300",
  "https://picsum.photos/id/1022/200/300",
]

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main>
        <Hero />
        <SpinningCards cards={cards} />
        <HorizontalStackCards />
      </main>

      {/* <Footer /> */}
    </div>
  )
}
