import { motion } from "framer-motion"

export default function MarqueeItem({
  images,
  from,
  to,
}: {
  images: string[]
  from: number | string
  to: number | string
}) {
  return (
    <div className="flex overflow-hidden rounded-3xl">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => {
          return (
            <img
              width={200}
              height={200}
              alt={`marqueImg${index}`}
              className="mr-4 rounded-3xl object-cover"
              src={image}
              key={index}
            />
          )
        })}
      </motion.div>

      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => {
          return (
            <img
              width={200}
              height={200}
              alt={`marqueImg${index}`}
              className="mr-4 rounded-3xl object-cover"
              src={image}
              key={index}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
