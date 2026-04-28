interface TestimonialsProps {
  location: string
}

export function Testimonials({ location }: TestimonialsProps) {
  // Simple hash for deterministic testimonial selection
  let hash = 0
  for (let i = 0; i < location.length; i++) {
    const char = location.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  const seed = Math.abs(hash)
  const testimonialSets = [
    [
      { name: "Sarah K.", location: location, text: "Excellent service! Bought gold with Bitcoin and received delivery within days. Highly recommended!" },
      { name: "Michael R.", location: "International Client", text: "Smooth crypto payment process and great communication via WhatsApp. Gold quality exceeded expectations." },
      { name: "Ahmed M.", location: location, text: "Best prices I found online. The Dubai delivery was fast and secure. Will buy again!" }
    ],
    [
      { name: "Emma L.", location: location, text: "Professional service and secure transactions. Got my gold investment in record time." },
      { name: "James T.", location: "International Client", text: "The crypto payment system is brilliant. No hassle, instant confirmation." },
      { name: "Maria S.", location: location, text: "Trustworthy dealer with competitive prices. Very satisfied with my purchase." }
    ],
    [
      { name: "David W.", location: location, text: "Outstanding customer service. They guided me through the whole process." },
      { name: "Lisa K.", location: "International Client", text: "Fast delivery and great communication. Exactly what I was looking for." },
      { name: "Robert M.", location: location, text: "Professional and reliable. My go-to gold dealer now." }
    ]
  ]
  
  const selectedTestimonials = testimonialSets[seed % testimonialSets.length]

  return (
    <section className="section">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {selectedTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
