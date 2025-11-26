'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  question: string;
  answer: string;
}

export default function FAQAccordion({ question, answer }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown
          size={24}
          className={`text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t bg-gray-50">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

