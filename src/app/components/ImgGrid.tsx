import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"

const images = [
  [
    "https://picsum.photos/id/1005/1000/1000",
    "https://picsum.photos/id/1011/1000/1000",
    "https://picsum.photos/id/1012/1000/1000",
  ],
  [
    "https://picsum.photos/id/1015/1000/1000",
    "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif", // Center image
    "https://picsum.photos/id/1021/1000/1000",
  ],
  [
    "https://picsum.photos/id/1022/1000/1000",
    "https://picsum.photos/id/1024/1000/1000",
    "https://picsum.photos/id/1023/1000/1000",
  ],
]
const OFFSET_COLUMN = 80
const IMG_GAP = 30
const SPRING_CONF = { stiffness: 100, damping: 20 }

export default function ImgGrid() {
  const scrollRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  const { width = 0 } = useWindowSize({ initializeWithValue: false })
  const colWidth = width / 3

  return (
    <section ref={scrollRef} className="h-[300vh]">
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
  const zoomWidth = useSpring(
    useTransform(progressY, [0, 0.4], [midColWidth, maxWidth]),
    SPRING_CONF
  )
  const zoomHeight = useSpring(useTransform(progressY, [0, 0.4], ["66%", "100%"]), SPRING_CONF)
  const zoomBorderRadius = useSpring(
    useTransform(progressY, [0.38, 0.4], ["16px", "0px"]),
    SPRING_CONF
  )

  const top = useSpring(useTransform(progressY, [0, 0.4], ["-20vh", "-40vh"]), SPRING_CONF)

  const zoomOpacity = useSpring(useTransform(progressY, [0.4, 0.6], ["0%", "100%"]), SPRING_CONF)

  return (
    <div className="h-full">
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

      <motion.div
        className="relative bg-cover bg-center"
        style={{
          width: zoomWidth,
          height: zoomHeight,
          borderRadius: zoomBorderRadius,
          top,
          backgroundImage: `url(${images[1]})`,
        }}
      >
        <motion.div
          className="flex h-full w-full flex-col items-center justify-center bg-black/70"
          style={{ opacity: zoomOpacity }}
        >
          <p className="text-white">AI that understands your emotions</p>
        </motion.div>
      </motion.div>

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
