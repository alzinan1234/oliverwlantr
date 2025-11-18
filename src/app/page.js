
"use client"
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, CheckCircle, Music, Music2, Users, MapPin, Mail, User, UserPlus, Search, Calendar, Twitter, Instagram, Facebook } from 'lucide-react'

export default function LantrLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', userType: 'fan' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', userType: 'fan' })
      setErrors({})
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const userTypes = [
    { value: 'fan', label: 'Fan', description: 'I want to discover live music and connect with artists', icon: '🎵' },
    { value: 'artist', label: 'Artist', description: 'I want to build my fanbase and perform at venues', icon: '🎤' },
    { value: 'venue', label: 'Venue', description: 'I want to host events and connect with artists', icon: '🎪' }
  ]

  const steps = [
    { icon: <UserPlus size={32} />, number: '01', title: 'Create Your Profile', description: 'Sign up as a fan, artist, or venue. Tell us about your music taste, availability, and what you\'re looking for.' },
    { icon: <Search size={32} />, number: '02', title: 'Discover & Connect', description: 'Browse upcoming shows, discover new artists, and connect with fans who share your passion for live music.' },
    { icon: <Calendar size={32} />, number: '03', title: 'Experience Live Music', description: 'Book tickets, attend shows, and build lasting connections within your local music community.' }
  ]

  const listings = [
    { type: 'artist', name: 'Luna Eclipse', genre: 'Indie Electronic', location: 'Brooklyn, NY', followers: '2.4K', image: '🎵' },
    { type: 'venue', name: 'The Echo Chamber', capacity: '300', location: 'Austin, TX', events: '24 upcoming', image: '🎪' },
    { type: 'fan', name: 'Alex Chen', interests: 'Jazz, R&B, Soul', location: 'San Francisco, CA', attended: '47 shows', image: '👤' },
    { type: 'artist', name: 'The Reverb Collective', genre: 'Post-Rock', location: 'Portland, OR', followers: '5.1K', image: '🎸' }
  ]

  const faqs = [
    { question: 'What is Lantr?', answer: 'Lantr is a platform connecting fans, artists, and venues. We make it easy to discover live music, book shows, and build meaningful connections within your local music community.' },
    { question: 'When will Lantr launch?', answer: 'We\'re currently in development and planning to launch in early 2024. Join our waitlist to be notified when we go live and get early access to the platform.' },
    { question: 'Is Lantr free to use?', answer: 'Yes! Lantr is free for fans to discover and connect with artists. Artists and venues will have access to free basic features, with premium tools available for serious professionals.' },
    { question: 'How do I sign up as an artist?', answer: 'Simply join our waitlist and select "Artist" as your user type. When we launch, you\'ll receive priority access to create your artist profile and start connecting with fans.' },
    { question: 'Can venues list their events?', answer: 'Absolutely! Venues can create profiles, list their events, and connect directly with artists looking for performance opportunities in their area.' },
    { question: 'What cities will Lantr be available in?', answer: 'We\'re starting with major music cities in the US, including New York, Los Angeles, Austin, Nashville, and more. We plan to expand globally based on demand.' }
  ]

  const footerLinks = {
    product: [
      { name: 'Features', href: 'how-it-works' },
      { name: 'Examples', href: 'examples' },
      { name: 'Waitlist', href: 'waitlist' },
      { name: 'FAQ', href: 'faq' }
    ],
    company: [{ name: 'About', href: '#' }, { name: 'Blog', href: '#' }, { name: 'Careers', href: '#' }, { name: 'Press', href: '#' }],
    legal: [{ name: 'Privacy Policy', href: '#' }, { name: 'Terms of Service', href: '#' }, { name: 'Cookie Policy', href: '#' }]
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur border-b border-gray-900' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => scrollToSection('hero')} className="text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">Lantr</button>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-400 hover:text-white transition">How it works</button>
            <button onClick={() => scrollToSection('waitlist')} className="text-gray-400 hover:text-white transition">Join</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition">FAQ</button>
            <button onClick={() => scrollToSection('waitlist')} className="px-6 py-2 bg-[#6366F1] hover:bg-[#8B5CF6] rounded-lg font-semibold transition">Get early access</button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-900 p-6 space-y-4">
            <button onClick={() => scrollToSection('how-it-works')} className="block text-gray-400 hover:text-white w-full text-left">How it works</button>
            <button onClick={() => scrollToSection('waitlist')} className="block text-gray-400 hover:text-white w-full text-left">Join</button>
            <button onClick={() => scrollToSection('faq')} className="block text-gray-400 hover:text-white w-full text-left">FAQ</button>
            <button onClick={() => scrollToSection('waitlist')} className="w-full px-6 py-2 bg-[#6366F1] hover:bg-[#8B5CF6] rounded-lg font-semibold">Get early access</button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div style={{ animation: 'slideUp 0.8s ease-out' }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Where Music<span className="block bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent"> Finds Its People</span></h1>
            <p className="text-xl text-gray-400 mb-8 max-w-lg">Lantr connects fans, artists, and venues in one seamless platform. Discover live music, build your community, and make every night unforgettable.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={() => scrollToSection('waitlist')} className="px-8 py-4 bg-[#6366F1] hover:bg-[#8B5CF6] rounded-lg font-semibold transition transform hover:translate-y-[-2px]">Join the Waitlist</button>
              <button onClick={() => scrollToSection('how-it-works')} className="px-8 py-4 bg-gray-900 hover:bg-gray-800 rounded-lg font-semibold transition border border-gray-800">Learn More</button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-3 bg-gray-900/30 backdrop-blur border border-gray-800 rounded-full">
                <Users size={20} className="text-[#6366F1]" />
                <span className="text-sm text-gray-300">For Fans</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-gray-900/30 backdrop-blur border border-gray-800 rounded-full">
                <Music2 size={20} className="text-[#8B5CF6]" />
                <span className="text-sm text-gray-300">For Artists</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-gray-900/30 backdrop-blur border border-gray-800 rounded-full">
                <MapPin size={20} className="text-[#EC4899]" />
                <span className="text-sm text-gray-300">For Venues</span>
              </div>
            </div>
          </div>

          <div className="space-y-4" style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>
            {listings.slice(0, 2).map((listing, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-[#6366F1]/50 transition">
                <div className="text-sm text-gray-400 mb-1">Prototype listing</div>
                <h3 className="font-bold text-lg mb-2">{listing.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{listing.capacity || listing.genre}</p>
                <p className="text-xs text-gray-500 italic">Real dates will show here later.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 hover:border-[#6366F1]/50 transition" style={{ animation: `slideUp 0.8s ease-out ${i * 0.1}s both` }}>
              <div className="text-4xl font-bold text-[#6366F1] mb-4">{item.number}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Listings */}
      <section id="examples" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Meet the Community</h2>
        <p className="text-gray-400 text-center mb-16">Static examples of artists, venues, and fans on Lantr</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-[#6366F1]/50 transition" style={{ animation: `slideUp 0.8s ease-out ${i * 0.1}s both` }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#6366F1] to-[#EC4899] rounded-xl flex items-center justify-center text-4xl mb-4 mx-auto">{listing.image}</div>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{listing.name}</h3>
                <span className="inline-block px-3 py-1 bg-[#6366F1]/20 text-[#6366F1] text-xs font-semibold rounded-full uppercase">{listing.type}</span>
              </div>
              <div className="space-y-2 text-sm">
                {listing.genre && <div className="flex items-center gap-2 text-gray-400"><Music size={16} className="text-[#8B5CF6]" /><span>{listing.genre}</span></div>}
                {listing.interests && <div className="flex items-center gap-2 text-gray-400"><Music size={16} className="text-[#8B5CF6]" /><span>{listing.interests}</span></div>}
                {listing.location && <div className="flex items-center gap-2 text-gray-400"><MapPin size={16} className="text-[#6366F1]" /><span>{listing.location}</span></div>}
                {listing.followers && <div className="flex items-center gap-2 text-gray-400"><Users size={16} className="text-[#EC4899]" /><span>{listing.followers} followers</span></div>}
                {listing.capacity && <div className="flex items-center gap-2 text-gray-400"><Users size={16} className="text-[#EC4899]" /><span>Capacity: {listing.capacity}</span></div>}
                {listing.events && <div className="flex items-center gap-2 text-gray-400"><Calendar size={16} className="text-[#6366F1]" /><span>{listing.events}</span></div>}
                {listing.attended && <div className="flex items-center gap-2 text-gray-400"><Calendar size={16} className="text-[#6366F1]" /><span>{listing.attended}</span></div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join the Waitlist</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Be the first to know when Lantr launches. Get early access and exclusive updates.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {userTypes.map((type, idx) => (
            <div key={type.value} onClick={() => setFormData(prev => ({ ...prev, userType: type.value }))} className={`bg-gray-900/50 backdrop-blur border rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${formData.userType === type.value ? 'border-2 border-[#6366F1] bg-[#6366F1]/10' : 'border-gray-800 hover:border-[#6366F1]/50'}`} style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}>
              <div className="text-center">
                <div className="text-4xl mb-3">{type.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{type.label}</h3>
                <p className="text-sm text-gray-400">{type.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12" style={{ animation: 'slideUp 0.6s ease-out 0.3s both' }}>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You are on the list! 🎉</h3>
              <p className="text-gray-400">Well send you updates to <span className="text-[#6366F1] font-semibold">{formData.email}</span></p>
              <p className="text-sm text-gray-500 mt-4">You are registered as a <span className="capitalize text-[#8B5CF6]">{formData.userType}</span></p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-6 p-4 bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-lg">
                <p className="text-sm text-gray-300"><span className="text-[#6366F1] font-semibold">Registering as:</span> <span className="capitalize">{formData.userType}</span></p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={`w-full pl-12 pr-4 py-4 bg-gray-800 border rounded-xl text-white placeholder-gray-600 focus:outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-700 focus:border-[#6366F1]'}`} />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-500" />
                  </div>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className={`w-full pl-12 pr-4 py-4 bg-gray-800 border rounded-xl text-white placeholder-gray-600 focus:outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#6366F1]'}`} />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <button onClick={handleSubmit} disabled={!formData.name || !formData.email} className="w-full px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-[#6366F1]/50 disabled:opacity-50 disabled:cursor-not-allowed">Join the Waitlist</button>

              <p className="text-xs text-gray-500 text-center">By joining, you agree to receive updates about Lantr. We respect your privacy and you can unsubscribe anytime.</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Join 500+ people already on the waitlist</p>
          <div className="flex justify-center items-center gap-2">
            <div className="flex -space-x-3">
              {['🎵', '🎤', '🎸', '🎹', '🎧'].map((emoji, i) => (
                <div key={i} className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#EC4899] rounded-full flex items-center justify-center border-2 border-black text-base hover:scale-125 transition-transform" style={{ animation: `float 3s ease-in-out ${i * 0.2}s infinite` }}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden hover:border-[#6366F1]/50 transition">
              <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/50 transition font-semibold text-left">
                <span>{faq.question}</span>
                <ChevronDown size={20} className={`transform transition ${openFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              {openFAQ === i && (
                <div className="px-6 py-4 border-t border-gray-800 text-gray-400 bg-gray-900/20">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent mb-4">lantr</h3>
              <p className="text-gray-400 text-sm mb-4">Connecting fans, artists, and venues through the power of live music.</p>
              <div className="flex gap-3">
                {[<Twitter size={20} />, <Instagram size={20} />, <Facebook size={20} />, <Mail size={20} />].map((icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-gray-900 hover:bg-[#6366F1]/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#6366F1] transition border border-gray-800">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, i) => (
                    <li key={i}>
                      {link.href.startsWith('#') ? (
                        <button onClick={() => scrollToSection(link.href)} className="text-gray-400 hover:text-[#6366F1] transition text-sm">
                          {link.name}
                        </button>
                      ) : (
                        <a href={link.href} className="text-gray-400 hover:text-[#6366F1] transition text-sm">
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© 2025 Lantr. All rights reserved.</p>
            <p>Made with <span className="text-[#EC4899]">♥</span> for the music community</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
