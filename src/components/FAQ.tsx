import { useState } from "react"

const faqs = [
  {
    question: "What is your refund policy?",
    answer: "We offer a full refund within 30 days of purchase, no questions asked.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, our support team is available 24/7 via email and chat.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely! You can upgrade or downgrade at any time.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mx-auto mb-20 max-w-6xl border-b border-zinc-300">
      <div className="flex flex-col items-center gap-3">
        <div className="text-dim-grey rounded-2xl bg-[#1313130f] px-4 py-1.5 text-sm font-medium">
          Ready to automate?
        </div>
        <h2 className="text-dim-grey max-w-xl text-center text-3xl font-bold">
          We’re here to help
        </h2>
      </div>

      <div className="mt-20 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-t border-zinc-300 p-8">
            <button
              className="flex w-full cursor-pointer justify-between text-2xl font-medium"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <p className="pt-4 text-zinc-700">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
