import { SPRING_CONF } from "@/constants/styles"
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"

type ColumnImage = string[]

interface CircleStackScrollProps {
  images: ColumnImage[]
}

export default function SpinningCards({ images }: CircleStackScrollProps) {
  const scrollRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  const { width = 0 } = useWindowSize({ initializeWithValue: false })

  const circleRadious = width + 200
  const columnsCount = images.length
  const columnWidth = circleRadious / columnsCount
  const columnWrapperWidth = circleRadious + columnWidth
  const rotation = 360 / (columnsCount * 2)
  const colRanges = createColumnOutputRange(columnWidth, rotation)

  const wrapperScale = useSpring(useTransform(scrollYProgress, [0.35, 0.6], [1, 0.6]), SPRING_CONF)
  const wrapperRotate = useSpring(
    useTransform(scrollYProgress, [0.35, 1], ["0deg", "-180deg"]),
    SPRING_CONF
  )

  return (
    <section ref={scrollRef} className="flex h-[700vh] items-start justify-center">
      <motion.div
        className="sticky top-0 aspect-square origin-center overflow-x-hidden"
        style={{ width: columnWrapperWidth }}
      >
        <TextContent progressY={scrollYProgress} />

        <motion.div
          className="relative h-full w-full origin-center"
          style={{ rotate: wrapperRotate, scale: wrapperScale }}
        >
          {images.map((col, i) => (
            <CardColumn
              width={columnWidth}
              key={i}
              topImg={col[0]}
              bottomImg={col[1]}
              outputRange={colRanges[i]}
              progressY={scrollYProgress}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

function CardColumn(props: {
  progressY: MotionValue<number>
  width: number
  topImg: string
  bottomImg: string
  outputRange: {
    x: string
    rotate: string
  }
}) {
  const rotate = useTransform(props.progressY, [0, 0.4], ["0deg", props.outputRange.rotate])
  const x = useTransform(props.progressY, [0, 0.4], [props.outputRange.x, "0px"])

  return (
    <motion.div
      className="image-column utline absolute top-0 flex h-full w-full origin-center flex-col items-center justify-between p-2 outline-red-600"
      style={{
        width: props.width,
        translateX: "-50%",
        left: "50%",
        rotate,
        x,
      }}
    >
      <ColumnImage imageSrc={props.topImg} />

      {/* Flip bottom images */}
      <div className="rotate-[180deg]">
        <ColumnImage imageSrc={props.bottomImg} />
      </div>
    </motion.div>
  )
}

function ColumnImage({ imageSrc }: { imageSrc: string }) {
  return (
    <img
      src={imageSrc}
      alt="card img"
      className="grid aspect-square w-full rounded-2xl bg-yellow-200 object-cover"
    />
  )
}

function TextContent({ progressY }: { progressY: MotionValue<number> }) {
  const textY = useSpring(useTransform(progressY, [0.6, 0.8], [600, 0]), SPRING_CONF)

  return (
    <div className="absolute grid h-full w-full place-items-center">
      <motion.div className="flex flex-col items-center justify-center gap-3" style={{ y: textY }}>
        <div className="text-dim-grey rounded-2xl bg-[#1313130f] px-4 py-1.5 text-sm font-medium">
          Personal Growth
        </div>
        <h2 className="text-dim-grey max-w-xl text-center text-5xl leading-14 font-bold">
          A gentle space to understand yourself
        </h2>
      </motion.div>
    </div>
  )
}

function createColumnOutputRange(colWidth: number, rotation: number) {
  const values = [
    { x: `${colWidth * -3}px`, rotate: `-${rotation * 3}deg` },
    { x: `${colWidth * -2}px`, rotate: `-${rotation * 2}deg` },
    { x: `${colWidth * -1}px`, rotate: `-${rotation * 1}deg` },
    { x: "0px", rotate: `0deg` }, // middle index
    { x: `${colWidth * 1}px`, rotate: `${rotation * 1}deg` },
    { x: `${colWidth * 2}px`, rotate: `${rotation * 2}deg` },
    { x: `${colWidth * 3}px`, rotate: `${rotation * 3}deg` },
  ]

  return values
}
