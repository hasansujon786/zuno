import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"

export default function HorizontalStackCards() {
  const cards = ["a", "b", "c", "d", "e"]
  const colors = [
    "var(--color-amber-400)",
    "var(--color-red-400)",
    "var(--color-green-400)",
    "var(--color-blue-400)",
    "var(--color-gray-400)",
  ]

  const { width = 0 } = useWindowSize({ initializeWithValue: false })
  const cardWidth = width * 0.26

  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const endVal = 0.4

  const textTranslateX = useTransform(scrollYProgress, [0, endVal], [cardWidth * 3, 0])
  const textOpacity = useTransform(scrollYProgress, [0, endVal], ["30%", "100%"])

  return (
    <section ref={sectionRef} className="relative h-[320vh] min-h-screen bg-red-100 p-1">
      <div className="stack-slider sticky top-0 ml-8 flex h-screen flex-col justify-center ring ring-black">
        <div className="relative" style={{ height: (cardWidth / 5) * 7 }}>
          {cards.map((card, i) => {
            const x = useTransform(scrollYProgress, [0, endVal], [cardWidth * i, "0"])
            const scale = useTransform(scrollYProgress, [0.2, endVal], [1, (100 - i * 2) / 100])

            return (
              <motion.div
                key={card}
                className="absolute top-0 flex aspect-[5/7] items-center justify-center rounded-2xl text-2xl font-bold"
                style={{
                  x,
                  scale,
                  width: cardWidth,
                  left: 24 * i,
                  backgroundColor: colors[i],
                  zIndex: 10 - i, // lower zIndex = further back
                }}
              >
                {card}
              </motion.div>
            )
          })}

          <motion.div
            className="text-dim-grey relative flex h-full max-w-3xl flex-col justify-center pl-2 text-7xl font-bold"
            style={{
              left: cardWidth * 1.3,
              translateX: textTranslateX,
              opacity: textOpacity,
            }}
          >
            <p>Your mental</p>
            <p>wellness journey</p>
            <p>starts now</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
