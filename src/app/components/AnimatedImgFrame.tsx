import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface AnimatedImgFrameProps {
  image: string
}
export default function AnimatedImgFrame({ image }: AnimatedImgFrameProps) {
  const scrollRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  // Interpolate alpha values
  const overlayAlpha = useTransform(scrollYProgress, [0.4, 0.8], [0, 1])

  // Convert to rgba string
  const backgroundImage = useTransform(
    overlayAlpha,
    (alpha) =>
      `linear-gradient(rgba(255,255,255,${alpha}), rgba(255,255,255,${alpha})), url(${image})`
  )

  const opacity = useTransform(scrollYProgress, [0.1, 0.2], ["0%", "100%"])
  const width = useTransform(scrollYProgress, [0.2, 0.4], ["33vw", "90vw"])

  return (
    <section ref={scrollRef} className="h-[300vh] bg-yellow-200">
      <motion.div
        className="sticky top-0 h-screen w-screen bg-green-200 bg-cover bg-center"
        style={{ backgroundImage }}
      >
        {/* Front clipped image */}
        <div
          className="absolute top-0 left-0 h-screen w-screen bg-yellow-200 bg-cover bg-center mask-center mask-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
            clipPath: "inset(5vh 5vw round 16px)",
          }}
        />

        {/* Animated Frame */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[90vh] w-[90vw] -translate-1/2 rounded-2xl outline-2 outline-white"
          style={{ width, opacity }}
        />
      </motion.div>
    </section>
  )
}
