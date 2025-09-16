import { SPRING_CONF } from "@/constants/styles"
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"

const images = [
  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c31841d04e272a85216f_bg-cloud-63.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f75435261184f880702d40_bg-cloud-43.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif",
  ],
  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9d38f41d04e272a8d2926_bg-cloud-66.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif", // Center image
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f7ee4df847a9fb30978659_bg-cloud-54.avif",
  ],
  [
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f1eff7704d86833488bc4e_bg-cloud-17.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f89444d1d997a80bbd9c44_bg-cloud-61.avif",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f288caa25e4431e4d74500_bg-cloud-30.avif",
  ],
]
const OFFSET_COLUMN = 80
const IMG_GAP = 30

export default function ImageGrid() {
  const scrollRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  const { width = 0 } = useWindowSize({ initializeWithValue: false })
  const colWidth = width / 3

  return (
    <section ref={scrollRef} className="h-[350vh]">
      <div className="sticky top-0 flex h-screen w-screen items-start justify-center overflow-hidden">
        <SideColumn
          images={images[0]}
          width={colWidth}
          progressY={scrollYProgress}
          direction="left"
        />

        <MiddleColumn
          images={images[1]}
          width={colWidth}
          maxWidth={width}
          progressY={scrollYProgress}
        />

        <SideColumn
          images={images[2]}
          width={colWidth}
          progressY={scrollYProgress}
          direction="right"
        />

        <TextContent progressY={scrollYProgress} />
      </div>
    </section>
  )
}

type MiddleColumnProps = {
  width: number
  maxWidth: number
  progressY: MotionValue<number>
  images: string[]
}

const MiddleColumn = ({ width, progressY, images, maxWidth }: MiddleColumnProps) => {
  const midColWidth = width + OFFSET_COLUMN * 2
  const zoomHeight = useSpring(useTransform(progressY, [0, 0.4], ["66vh", "100vh"]), SPRING_CONF)
  const zoomWidth = useSpring(
    useTransform(progressY, [0, 0.4], [midColWidth, maxWidth]),
    SPRING_CONF
  )
  const zoomBorderRadius = useSpring(
    useTransform(progressY, [0.38, 0.4], ["16px", "0px"]),
    SPRING_CONF
  )

  const top = useSpring(useTransform(progressY, [0, 0.4], ["-20vh", "-40vh"]), SPRING_CONF)

  return (
    <div className="h-full">
      {/* top image */}
      <motion.div
        className="relative flex h-[40vh] w-full justify-center"
        style={{ top, paddingBottom: IMG_GAP }}
      >
        <img
          className="h-full rounded-2xl object-cover"
          width={midColWidth}
          src={images[0]}
          alt=""
        />
      </motion.div>

      {/* center image */}
      <motion.div
        className="relative bg-cover bg-center"
        style={{
          top,
          width: zoomWidth,
          height: zoomHeight,
          borderRadius: zoomBorderRadius,
          backgroundImage: `url(${images[1]})`,
        }}
      />

      {/* bottom image */}
      <motion.div
        className="relative flex h-[40vh] w-full justify-center"
        style={{ top, paddingTop: IMG_GAP }}
      >
        <img
          className="h-full rounded-2xl object-cover"
          width={midColWidth}
          src={images[2]}
          alt=""
        />
      </motion.div>
    </div>
  )
}

type SideColumnProps = {
  width: number
  progressY: MotionValue<number>
  direction: "left" | "right"
  images: string[]
}
const SideColumn = ({ width, progressY, direction, images }: SideColumnProps) => {
  const isLeft = direction === "left"
  const directionMultiplier = isLeft ? -1 : 1

  const x = useSpring(
    useTransform(
      progressY,
      [0, 0.4],
      [OFFSET_COLUMN * directionMultiplier, width * directionMultiplier]
    ),
    SPRING_CONF
  )

  return (
    <motion.div
      className="absolute top-0 z-10 flex flex-col"
      style={{
        [direction]: 0,
        top: isLeft ? -width / 2 : 0,
        paddingRight: isLeft ? IMG_GAP : 0,
        paddingLeft: isLeft ? 0 : IMG_GAP,
        gap: IMG_GAP,
        width: width,
        x,
      }}
    >
      {images.map((img) => (
        <div key={img} className="h-[40vh] w-full">
          <img className="h-full w-full rounded-2xl object-cover" width={width} src={img} alt="" />
        </div>
      ))}
    </motion.div>
  )
}

function TextContent({ progressY }: { progressY: MotionValue<number> }) {
  const overlayOpacity = useTransform(progressY, [0.38, 0.6], [0, 1])

  return (
    <motion.div
      className="absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black/70"
      style={{ opacity: overlayOpacity }}
    >
      <div className="rounded-2xl bg-black/20 px-4 py-1.5 text-sm font-medium text-white">
        Personal Growth
      </div>
      <h1 className="max-w-3xl text-center text-7xl font-bold text-white">
        AI that understands your emotions
      </h1>
    </motion.div>
  )
}
