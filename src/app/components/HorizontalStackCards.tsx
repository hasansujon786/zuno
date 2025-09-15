import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export default function HorizontalStackCards() {
  const cards = ["a", "b", "c", "d", "e"]
  const colors = [
    "var(--color-amber-400)",
    "var(--color-red-400)",
    "var(--color-green-400)",
    "var(--color-blue-400)",
    "var(--color-gray-400)",
  ]

  const cardWidth = 200
  const xPos = cards.map((_, i) => `-${cardWidth * i}px`)

  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const endVal = 0.4
  const spring = { stiffness: 100, damping: 20 }
  const translateXValues = [
    useSpring(useTransform(scrollYProgress, [0, endVal], ["0", xPos[0]]), spring),
    useSpring(useTransform(scrollYProgress, [0, endVal], ["0", xPos[1]]), spring),
    useSpring(useTransform(scrollYProgress, [0, endVal], ["0", xPos[2]]), spring),
    useSpring(useTransform(scrollYProgress, [0, endVal], ["0", xPos[3]]), spring),
    useSpring(useTransform(scrollYProgress, [0, endVal], ["0", xPos[4]]), spring),
  ]

  const textTranslateX = useSpring(
    useTransform(scrollYProgress, [0, endVal], ["0", xPos[xPos.length - 2]]),
    spring
  )
  const textOpacity = useTransform(scrollYProgress, [0, endVal], ["30%", "100%"])

  return (
    <section ref={sectionRef} className="bg-red-100 min-h-screen h-[320vh] p-1 relative py-72">
      <div className="ring ring-black stack-slider sticky top-40 flex items-start gap-6">
        {cards.map((n, i) => (
          <motion.div
            key={n}
            className="w-50 aspect-[5/7] flex items-center justify-center text-2xl font-bold"
            style={{
              backgroundColor: colors[i],
              translateX: translateXValues[i],
              zIndex: 10 - i,
            }} // lower zIndex = further back
          >
            {n}
          </motion.div>
        ))}

        <motion.div
          className="text-3xl text-red-700 flex justify-center flex-col relative"
          style={{
            left: -200,
            translateX: textTranslateX,
            opacity: textOpacity,
          }}
        >
          <p>Your mental</p>
          <p>wellness journey</p>
          <p>starts now</p>
        </motion.div>
      </div>
    </section>
  )
}
