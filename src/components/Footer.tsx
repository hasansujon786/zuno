const links = [
  {
    title: "Explore",
    items: [
      { title: "About Zuno", href: "#" },
      { title: "Learn", href: "#" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "Careers", href: "#" },
      { title: "Terms of service", href: "#" },
      { title: "Privacy policy", href: "#" },
      { title: "Contact us", href: "#" },
    ],
  },
  {
    title: "Follow us",
    items: [
      { title: "Instagram", href: "#" },
      { title: "TikTok", href: "#" },
      { title: "Twitter", href: "#" },
    ],
  },
]

export const Footer = () => {
  return (
    <footer className="bg-[#1f3634] py-12">
      <div className="container mx-auto flex max-w-7xl justify-between">
        <div>
          <img
            className="image-brand h-4"
            src="https://cdn.prod.website-files.com/675c8e48ca0e0fb5ab421239/67e725b86fdf9ee970fe1013_zuno-logo.svg"
            loading="lazy"
            alt=""
          />
        </div>

        <div className="flex gap-16">
          {links.map((link) => (
            <div key={link.title}>
              <div className="text-primary-light">{link.title}</div>
              <ul>
                {link.items.map((item) => (
                  <li className="text-avocado mt-4" key={item.title}>
                    <a
                      className="border-b border-transparent pb-2 hover:border-gray-200"
                      href={item.href}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="text-primary-light">Newsletter</div>
            <EmailForm />
            <p className="mt-4 text-xs text-zinc-400">
              We only share your information in accordance <br /> with our privacy policy.
            </p>
          </div>
        </div>
      </div>

      <div className="border-avocado/40 container mx-auto mt-6 max-w-7xl border-t">
        <p className="mt-6 text-xs text-zinc-400">
          Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante
          venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo luctus, nisi erat
          porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra
          augue.. © Zuno 2025. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
function EmailForm() {
  return (
    <div className="flex">
      <form id="form-id" className="relative mt-5">
        <input
          className="border-avocado placeholder-avocado rounded-md border px-3 py-3 placeholder:text-sm focus:border-blue-400 focus:outline-none"
          id="email"
          type="email"
          placeholder="Email Address"
        />
        <button
          className="group absolute top-0 right-0 flex h-full w-12 cursor-pointer items-center justify-center"
          type="submit"
          data-wait="Please wait..."
          value=""
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-avocado size-6 transition-transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
