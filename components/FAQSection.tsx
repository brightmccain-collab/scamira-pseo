"use client"

import { useState } from 'react'

interface FAQSectionProps {
  location: string
}

export function FAQSection({ location }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Simple hash for deterministic FAQ selection
  let hash = 0
  for (let i = 0; i < location.length; i++) {
    const char = location.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  const seed = Math.abs(hash)
  
  const faqSets = [
    [
      {
        question: `How long does delivery to ${location} take?`,
        answer: `Delivery times to ${location} typically range from 3-7 business days, depending on your specific location and customs processing.`
      },
      {
        question: `What cryptocurrencies do you accept for gold purchases in ${location}?`,
        answer: `We accept Bitcoin (BTC), Ethereum (ETH), USDT, and other major cryptocurrencies for gold purchases destined for ${location}.`
      },
      {
        question: `Are there import duties for gold delivered to ${location}?`,
        answer: `Import duties vary by country. We'll provide guidance on any applicable taxes for gold imports to ${location} during the ordering process.`
      },
      {
        question: `How do I verify the authenticity of gold delivered to ${location}?`,
        answer: `All our gold comes with certificates of authenticity and can be verified at local assay offices in ${location}.`
      },
      {
        question: `Can I track my gold shipment to ${location}?`,
        answer: `Yes, we provide full tracking information for all shipments to ${location}, updated regularly via WhatsApp.`
      }
    ],
    [
      {
        question: `Is it legal to buy gold with cryptocurrency in ${location}?`,
        answer: `Yes, cryptocurrency transactions for gold purchases are legal in ${location}. We ensure full compliance with local regulations.`
      },
      {
        question: `What payment methods are available for customers in ${location}?`,
        answer: `We accept Bitcoin, Ethereum, USDT, and other major cryptocurrencies. All transactions are secure and instant.`
      },
      {
        question: `Do you deliver to all areas of ${location}?`,
        answer: `We deliver to all major cities and most areas in ${location}. Contact us to confirm delivery to your specific location.`
      },
      {
        question: `How are gold prices determined for ${location} customers?`,
        answer: `Our gold prices are based on international market rates plus shipping and handling costs to ${location}. No hidden fees.`
      },
      {
        question: `What if I need to return or exchange my gold in ${location}?`,
        answer: `We have a clear return policy for customers in ${location}. Contact us within 7 days for any concerns about your purchase.`
      }
    ]
  ]
  
  const selectedFAQs = faqSets[seed % faqSets.length]

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions - {location}
        </h2>
        <div className="max-w-3xl mx-auto">
          {selectedFAQs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <span className="text-2xl text-gold">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </div>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-white border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
