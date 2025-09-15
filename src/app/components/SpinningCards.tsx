import React, { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useWindowSize } from "../hooks/useWindowSize"

type Card = { id: string; title?: string; color?: string }
type CircleStackScrollProps = {
  cards: Card[]
}

export default function SpinningCards({ cards }: CircleStackScrollProps) {
  const scrollRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  })

  const { width } = useWindowSize()

  const circleRadious = width + 200
  const columnsCount = cards.length
  const columnWidth = circleRadious / columnsCount
  const columnWrapperWidth = circleRadious + columnWidth
  const rotation = 360 / (columnsCount * 2)
  const colRanges = createColumnOutputRange(columnWidth, rotation)

  const wrapperScale = useTransform(scrollYProgress, [0, 0.4], ["1", "0.6"])
  const wrapperRotate = useTransform(scrollYProgress, [0.38, 1], ["0deg", "-180deg"])

  return (
    <section ref={scrollRef} className="h-[700vh] flex justify-center items-start">
      <motion.div
        className="sticky top-0 origin-center aspect-square"
        style={{ width: columnWrapperWidth }}
      >
        <TextContent progressY={scrollYProgress} />

        <motion.div
          className="w-full h-full origin-center relative"
          style={{
            rotate: wrapperRotate,
            scale: wrapperScale,
          }}
        >
          {cards.map((n, i) => {
            const rotate = useTransform(scrollYProgress, [0, 0.4], ["0deg", colRanges[i].rotate])
            const x = useTransform(scrollYProgress, [0, 0.4], [colRanges[i].x, "0px"])

            return (
              <motion.div
                key={i}
                className="image-column utline outline-red-600 origin-center absolute top-0 p-2 h-full w-full flex flex-col justify-between items-center"
                style={{
                  width: columnWidth,
                  rotate,
                  translateX: "-50%",
                  left: "50%",
                  x,
                }}
              >
                {["1", "2"].map((n) => (
                  <Card key={n} img={i.toString()} />
                ))}
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

function Card({ img }: { img: string }) {
  return (
    <span
      key={img}
      className="outline outline-blue-600  text-2xl font-bold rounded-xl w-full text-black bg-yellow-200 aspect-square grid place-items-center"
    >
      {img}
    </span>
  )
}

function TextContent({ progressY }: { progressY: MotionValue<number> }) {
  const textY = useTransform(progressY, [0.6, 0.8], [600, 0])

  return (
    <div className="grid place-items-center w-full h-full absolute">
      <motion.div className="gap-3 justify-center items-center flex flex-col" style={{ y: textY }}>
        <div className="bg-[#1313130f] text-dim-grey px-4 py-1.5 text-sm font-medium rounded-2xl">
          Personal Growth
        </div>
        <h2 className="text-dim-grey text-5xl leading-14 font-bold max-w-xl text-center">
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
