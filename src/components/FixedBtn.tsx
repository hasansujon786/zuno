import { ReactNode } from "react"

export default function FixedBtn({ children }: { children: ReactNode }) {
  return (
    <a
      className="fixed right-4 bottom-4 flex items-center justify-center rounded border border-zinc-100 bg-white px-5 py-3 text-sm font-bold shadow"
      href="https://tem.place/product/zuno"
      target="_blank"
    >
      {children}
    </a>
  )
}
