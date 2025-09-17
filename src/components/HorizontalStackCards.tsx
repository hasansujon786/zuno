import { SPRING_CONF } from "@/constants/styles"
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"

const INPUT_RANGE_END = 0.4
interface HorizontalStackCardsProps {
  images: string[]
}

export default function HorizontalStackCards({ images }: HorizontalStackCardsProps) {
  const { width = 0 } = useWindowSize({ initializeWithValue: false })
  const cardWidth = width * 0.26

  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const textOpacity = useTransform(scrollYProgress, [0, INPUT_RANGE_END], ["30%", "100%"])
  const textTranslateX = useSpring(
    useTransform(scrollYProgress, [0, INPUT_RANGE_END], [cardWidth * 3, 0]),
    SPRING_CONF
  )

  return (
    <section ref={sectionRef} className="relative h-[320vh] min-h-screen bg-gray-200">
      <div className="stack-slider sticky top-0 flex h-screen flex-col justify-center pl-8">
        <div className="relative overflow-x-hidden" style={{ height: (cardWidth / 5) * 7 }}>
          {images.map((img, i) => (
            <StackCard
              key={img}
              progressY={scrollYProgress}
              width={cardWidth}
              image={img}
              index={i}
            />
          ))}

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

interface StackCardProps {
  image: string
  index: number
  width: number
  progressY: MotionValue<number>
}

function StackCard({ image, progressY, width, index }: StackCardProps) {
  const scale = useTransform(progressY, [0.2, INPUT_RANGE_END], [1, (100 - index * 2) / 100])
  const x = useSpring(
    useTransform(progressY, [0, INPUT_RANGE_END], [width * index, 0]),
    SPRING_CONF
  )

  return (
    <motion.img
      alt="card image"
      src={image}
      className="absolute top-0 flex aspect-[5/7] items-center justify-center rounded-2xl object-cover text-2xl font-bold"
      style={{
        x,
        scale,
        width: width,
        left: 24 * index,
        zIndex: 10 - index, // lower zIndex = further back
      }}
    ></motion.img>
  )
}
