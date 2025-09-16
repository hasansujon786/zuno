"use client"

import AnimatedImageFrame from "@/components/AnimatedImageFrame"
import AnimatedMarqueeCards from "@/components/AnimatedMarqueeCards"
import FAQ from "@/components/FAQ"
import FixedBtn from "@/components/FixedBtn"
import { Footer } from "@/components/Footer"
import Hero from "@/components/Hero"
import HorizontalStackCards from "@/components/HorizontalStackCards"
import ImageGrid from "@/components/ImageGrid"
import Navbar from "@/components/Navbar"
import SpinningCards from "@/components/SpinningCards"

const spinningCards = [
  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f89444d1d997a80bbd9c44_bg-cloud-61.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7e0a2f0f48f88d3a1176f_close-up-nerves-yellow-leaf.avif",
  ],

  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7f5b376f614a742795320_bg-cloud-59.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9d1918a5e58f63b70f875_8cf9752d885baa80e26ad73cbe4f0344.avif",
  ],

  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67fd38497b98d7e4fade0fe9_bg-cloud-78.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67eb2202ed6a24da2fa19fda_ChatGPT%20Image%2031%20de%20mar.%20de%202025%2C%2020_12_59.avif",
  ],

  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9d38f41d04e272a8d2926_bg-cloud-66.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67eb1a0a4bd9bc20eac17b0e_ChatGPT%20Image%2031%20de%20mar.%20de%202025%2C%2019_20_50.avif",
  ],

  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f896ecf9932c23507a4961_bg-cloud-62.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7ee6f6bc08ecfebcddf85_bg-cloud-55.avif",
  ],

  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f75435261184f880702d40_bg-cloud-43.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7e0d700996d64eb9d235c_bg-cloud-51.avif",
  ],

  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7dd03f980a473e4e9ff40_bg-cloud-49.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67ee1b85995266773abd081b_img-01.avif",
  ],
]

const horizontalStackCards = [
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67ecae62618ad39b905b8ec9_mh-square.avif",
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f1ee4caf6e43269d97b514_bg-cloud-16.avif",
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f1f28ebca5528238342ea0_bg-cloud-20.avif",
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f1eff7704d86833488bc4e_bg-cloud-17.avif",
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67eb223bbf4303942de155e6_ChatGPT%20Image%2031%20de%20mar.%20de%202025%2C%2020_15_50.avif",
]

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      <main>
        <Hero />
        <SpinningCards images={spinningCards} />
        <HorizontalStackCards images={horizontalStackCards} />
        <AnimatedImageFrame image="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9e24c2d1b01e097179829_bg-cloud-71.avif" />
        <ImageGrid />
        <AnimatedMarqueeCards />
        <FAQ />
      </main>

      <Footer />

      <FixedBtn>Get 50% OFF</FixedBtn>
    </div>
  )
}
