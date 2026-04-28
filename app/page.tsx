import Link from 'next/link'
import { CTAButton } from '@/components/CTAButton'
import { FeaturedCountries } from '@/components/FeaturedCountries'
import { TrustSignals } from '@/components/TrustSignals'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">
            Buy Gold Worldwide with Cryptocurrency
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Premium gold delivered globally using Bitcoin, Ethereum, and other cryptocurrencies. 
            Fast, secure delivery from our strategic hubs in Dubai & Cairo.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <CTAButton 
              variant="whatsapp" 
              href="https://wa.me/2819063800?text=Hi! I'm interested in buying gold with cryptocurrency"
            >
              📱 Contact on WhatsApp
            </CTAButton>
            <CTAButton 
              variant="primary" 
              href="#countries"
            >
              🌍 Choose Your Country
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <TrustSignals />

      {/* Featured Countries */}
      <section id="countries" className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Serving Gold Buyers Worldwide
          </h2>
          <FeaturedCountries />
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            How to Buy Gold with Cryptocurrency
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Contact via WhatsApp", desc: "Message us to discuss your gold requirements" },
              { step: 2, title: "Confirm Your Order", desc: "Review and confirm your gold selection and delivery details" },
              { step: 3, title: "Pay with Crypto", desc: "Complete payment using Bitcoin, Ethereum, or other cryptocurrencies" },
              { step: 4, title: "Receive Delivery", desc: "Get your gold delivered from our Dubai or Cairo facility" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gold text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-whatsapp text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Invest in Gold?
          </h2>
          <p className="text-xl mb-8">
            Contact us now on WhatsApp for instant assistance and to place your order
          </p>
          <CTAButton 
            variant="primary" 
            href="https://wa.me/2819063800?text=Hi! I'm ready to buy gold with cryptocurrency"
            className="bg-white text-whatsapp hover:bg-gray-100"
          >
            📱 Message on WhatsApp
          </CTAButton>
        </div>
      </section>
    </div>
  )
}
