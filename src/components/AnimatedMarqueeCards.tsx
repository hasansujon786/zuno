import MarqueeItem from "./MarqueeItem"

const images = [
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c31841d04e272a85216f_bg-cloud-63.avif",
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f75435261184f880702d40_bg-cloud-43.avif",
  "https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67f9c6586f1024288c4e6ed8_bg-cloud-64.avif",
]

export default function AnimatedMarqueeCards() {
  return (
    <section className="container mx-auto">
      <div className="mx-auto flex max-w-6xl gap-4 py-24">
        <div className="aspect-[5/6] flex-1">
          <img
            className="h-full w-full rounded-3xl object-cover"
            src="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67fd3b3b64ef722b8bd2b5c4_bg-cloud-77.avif"
            alt="bannter-img"
          />
        </div>
        <div className="flex aspect-[5/6] flex-1 flex-col gap-4">
          {/* text content */}
          <div className="flex-1 rounded-3xl bg-gray-200 p-12">
            <div className="flex flex-col items-start gap-3">
              <div className="text-dim-grey rounded-2xl bg-[#1313130f] px-4 py-1.5 text-sm font-medium">
                Ready to automate?
              </div>
              <h2 className="text-dim-grey max-w-xl text-3xl font-bold">
                Stay on top of your recurring payments with ease
              </h2>
            </div>
          </div>

          <div className="mx-auto overflow-hidden select-none">
            <MarqueeItem images={images} from={0} to={"-100%"} />
          </div>
        </div>
      </div>
    </section>
  )
}
