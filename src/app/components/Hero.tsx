export const Hero = () => {
  return (
    <div className="p-8 pb-20 sm:p-20 h-[70vh] flex flex-col items-center justify-center gap-8">
      <div className="bg-[#1313130f] text-dim-grey px-4 py-1.5 text-sm font-medium rounded-2xl">
        Personal Growth
      </div>
      <h1 className="text-7xl max-w-3xl px-20 font-bold text-dim-grey text-center">
        Feel more human every day
      </h1>
      <a
        href="#"
        className="text-primary-dark bg-primary hover:bg-primary-light px-8 py-4 font-medium text-base rounded-full"
      >
        Request demo
      </a>
    </div>
  )
}

export default Hero
