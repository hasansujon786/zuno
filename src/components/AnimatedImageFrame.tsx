import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface AnimatedImgFrameProps {
  image: string
}
export default function AnimatedImageFrame({ image }: AnimatedImgFrameProps) {
  const scrollRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  // Interpolate alpha values
  const overlayAlpha = useTransform(scrollYProgress, [0.5, 0.8], [0, 1])

  // Convert to rgba string
  const backgroundImage = useTransform(
    overlayAlpha,
    (alpha) =>
      `linear-gradient(rgba(255,255,255,${alpha}), rgba(255,255,255,${alpha})), url(${image})`
  )

  const opacity = useTransform(scrollYProgress, [0.1, 0.2], ["0%", "100%"])
  const width = useTransform(scrollYProgress, [0.2, 0.4], ["33vw", "90vw"])

  return (
    <section ref={scrollRef} className="h-[350vh] bg-yellow-200">
      <motion.div
        className="sticky top-0 h-screen w-screen bg-green-200 bg-cover bg-center"
        style={{ backgroundImage }}
      >
        {/* Front clipped image */}
        <div
          className="absolute top-0 left-0 h-screen w-screen bg-yellow-200 bg-cover bg-center mask-center mask-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
            clipPath: "inset(10vh 5vw round 24px)",
          }}
        />

        {/* Animated Frame */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[80vh] w-[90vw] -translate-1/2 rounded-3xl outline-2 outline-white"
          style={{ width, opacity }}
        >
          {/* Text Content */}
          <TextCard opacity={overlayAlpha} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function TextCard({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div
      style={{ opacity: opacity }}
      className="absolute bottom-8 left-8 flex w-full max-w-sm flex-col items-start gap-3 rounded-2xl bg-white px-8 py-10"
    >
      <div className="text-dim-grey rounded-2xl bg-[#1313130f] px-4 py-1.5 text-sm font-medium">
        Personal Growth
      </div>
      <p className="text-dim-grey max-w-xl text-4xl font-medium">
        Feel more human
        <br /> every day
      </p>
    </motion.div>
  )
}
