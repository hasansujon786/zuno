export default function Navbar() {
  return (
    <div className="fixed top-3 z-50 flex w-full justify-center">
      <div className="shaow-sm flex h-14 w-full max-w-3xl items-center justify-between rounded-lg border border-zinc-100 bg-white/90 p-1.5 px-2">
        <a href="/" aria-label="home" className="ml-3">
          <img
            className="h-4"
            src="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67ea1567f801b7bf3d63fad7_zuno-logo-b.svg"
            loading="lazy"
            alt=""
          />
        </a>

        <div className="flex justify-center items-center gap-2">
          {["Home", "Pages", "Template"].map((title) => (
            <a className="hover:bg-black/20 px-2 py-1 rounded-sm" key={title} href="#">
              {title}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="text-primary-dark bg-primary hover:bg-primary-light flex h-full items-center justify-center rounded-lg px-6 text-base font-medium"
        >
          Request demo
        </a>
      </div>
    </div>
  )
}
