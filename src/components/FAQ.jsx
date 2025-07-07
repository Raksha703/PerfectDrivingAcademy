import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What types of vehicles do you offer training for?",
    answer: "We offer driving lessons for cars, bikes, and scooties. You can choose your preferred vehicle during registration.",
  },
  {
    question: "How long is each driving session?",
    answer: "Each driving session lasts around 45–60 minutes, including practical training and briefing.",
  },
  {
    question: "Do I need a learner’s license to start?",
    answer: "Yes, a valid learner’s license is required to begin on-road training. We can assist you in applying if needed.",
  },
  {
    question: "Are your instructors certified?",
    answer: "Yes, all our instructors are professionally certified and trained to provide safe and effective lessons.",
  },
  {
    question: "Can I schedule classes on weekends?",
    answer: "Absolutely! We offer flexible scheduling, including weekend and evening slots based on availability.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-2 px-4 ">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl shadow-sm p-4 bg-white"
          >
            <button
              className="flex justify-between w-full text-left text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
