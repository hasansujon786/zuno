"use client"

import AnimatedImgFrame from "./components/AnimatedImgFrame"
import { Footer } from "./components/Footer"
import Hero from "./components/Hero"
import HorizontalStackCards from "./components/HorizontalStackCards"
import ImgGrid from "./components/ImgGrid"
import SpinningCards from "./components/SpinningCards"

const cards = new Array(7).fill(0).map((_, i) => ({
  id: `Card ${i + 1}`,
  title: `#${i + 1}`,
  color:
    i % 2 ? "linear-gradient(135deg,#ffd2a8,#ff9b9b)" : "linear-gradient(135deg,#d7fce8,#9be7ff)",
}))

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <main>
        <Hero />
        <SpinningCards cards={cards} />
        <HorizontalStackCards />
        <AnimatedImgFrame image="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9e24c2d1b01e097179829_bg-cloud-71.avif" />
        <ImgGrid />
      </main>

      <Footer />
    </div>
  )
}
