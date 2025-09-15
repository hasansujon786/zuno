import { useEffect, useState } from "react"

interface WindowSize {
  width: number
  height: number
}
export function useWindowSize(): WindowSize {
  // TODO: handle window not found in next.js
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}
