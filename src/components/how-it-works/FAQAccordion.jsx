import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "../../data/mockData";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-3">
          Kesyon yo poze souvan (FAQ)
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Si ou gen yon kesyon, gen chans pou jwenn repons la isit.
        </p>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-transparent border-none cursor-pointer group"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium text-sm group-hover:text-gold transition-colors pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-gold" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
