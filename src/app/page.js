"use client"
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, CheckCircle, Circle, Music, Users, MapPin, Mail, User, UserPlus, Search, Calendar, Twitter, Instagram, Facebook } from 'lucide-react'

export default function LantrLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', userType: 'FAN' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError('');

    // Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    iframe.onload = () => {
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', userType: 'FAN' }); // Clear form fields
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);
    };

    iframe.onerror = () => {
      setSubmitError('Failed to submit form. Please try again.');
      setIsSubmitting(false);
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    };

    document.body.appendChild(iframe);

    // Create form with CORRECT Google Form IDs
    const form = document.createElement('form');
    form.action = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc21TBRAHS76qdnl99FG_uqjGd4wdXr35aqmUDFiSvI1-5D1g/formResponse';
    form.method = 'POST';
    form.target = 'hidden_iframe';

    // Add fields with CORRECT field IDs
    const fields = {
      'entry.2124340020': formData.name,      // Full Name field
      'entry.889440736': formData.email,      // Email field
      'entry.1347005299': formData.userType,  // Role field (FAN/ARTIST/VENUE)
      'fvv': '1',
      'partialResponse': '[null,null,"3347796408466419238"]',
      'pageHistory': '0', 
      'fbzx': '3347796408466419238',
      'submissionTimestamp': '-1'
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    
    try {
      form.submit();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Something went wrong. Please try again.');
      setIsSubmitting(false);
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }
  };

  const userTypes = [
    { value: 'FAN', label: 'Fan', description: 'I want to discover live music and connect with artists', icon: <Music size={24} className="text-[#0094FF]" /> },
    { value: 'ARTIST', label: 'Artist', description: 'I want to build my fanbase and perform at venues', icon: <UserPlus size={24} className="text-[#0094FF]" /> },
    { value: 'VENUE', label: 'Venue', description: 'I want to host events and connect with artists', icon: <Circle size={24} className="text-[#0094FF]" /> }
  ]

  const steps = [
    { icon: <UserPlus size={20} className="text-[#0094FF]" />, number: '01', title: 'Create Your Profile', description: 'Sign up as a fan, artist, or venue. Tell us about your music taste, availability, and what you\'re looking for.' },
    { icon: <Search size={20} className="text-[#0094FF]" />, number: '02', title: 'Discover & Connect', description: 'Browse upcoming shows, discover new artists, and connect with fans who share your passion for live music.' },
    { icon: <Calendar size={20} className="text-[#0094FF]" />, number: '03', title: 'Experience Live Music', description: 'Book tickets, attend shows, and build lasting connections within your local music community.' }
  ]

  const listings = [
    { type: 'artist', name: 'Luna Eclipse', genre: 'Indie Electronic', location: 'Sydney, NSW', followers: '2.4K', icon: <Music size={28} className="text-[#0094FF]" /> },
    { type: 'venue', name: 'The Echo Chamber', capacity: '300', location: 'Sydney, NSW', events: '24 upcoming', icon: <Circle size={28} className="text-[#0094FF]" /> },
    { type: 'fan', name: 'Alex Chen', interests: 'Jazz, R&B, Soul', location: 'Sydney, NSW', attended: '47 shows', icon: <Users size={28} className="text-[#0094FF]" /> },
    { type: 'artist', name: 'The Reverb Collective', genre: 'Post-Rock', location: 'Sydney, NSW', followers: '5.1K', icon: <Music size={28} className="text-[#0094FF]" /> }
  ]

  const faqs = [
    { question: 'What is Lantr?', answer: 'Lantr is a platform connecting fans, artists, and venues. We make it easy to discover live music, book shows, and build meaningful connections within your local music community.' },
    { question: 'When will Lantr launch?', answer: 'We\'re currently in development and planning to launch in early 2026. Join our waitlist to be notified when we go live and get early access to the platform.' },
    { question: 'Is Lantr free to use?', answer: 'Lantr is completely free for all users during early development. Premium features will be introduced later for specific user needs.' },
    { question: 'How do I sign up as an artist?', answer: 'Simply join our waitlist and select "Artist" as your user type. When we launch, you\'ll receive priority access to create your artist profile and start connecting with fans.' },
    { question: 'Can venues list their events?', answer: 'Absolutely! Venues can create profiles, list their events, and connect directly with artists looking for performance opportunities in their area.' },
    { question: 'What cities will Lantr be available in?', answer: 'We\'re starting with Sydney and other major Australian cities. We plan to expand nationally and internationally based on demand.' }
  ]

  const waitIcons = [Music, UserPlus, Users, Calendar, Music]

  const footerLinks = {
    product: [
      { name: 'Features', href: 'how-it-works' },
      { name: 'Examples', href: 'examples' },
      { name: 'Waitlist', href: 'waitlist' },
      { name: 'FAQ', href: 'faq' },
    ],
    company: [{ name: 'About', href: '#' }, { name: 'Blog', href: '#' }, { name: 'Careers', href: '#' }, { name: 'Press', href: '#' }],
    legal: [{ name: 'Privacy Policy', href: '#' }, { name: 'Terms of Service', href: '#' }, { name: 'Cookie Policy', href: '#' }]
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0B0C0E, #000 50%, #000 100%)' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0094FF]/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#33A9FF]/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur border-b border-[#1E2024]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center h-20">
          <button onClick={() => scrollToSection('hero')} className="text-2xl font-bold text-white">Lantr</button>
          
          <nav className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollToSection('how-it-works')} className="text-[#B3BAC0] hover:text-white transition text-sm font-medium">How it works</button>
            <button onClick={() => scrollToSection('waitlist')} className="text-[#B3BAC0] hover:text-white transition text-sm font-medium">Join</button>
            <button onClick={() => scrollToSection('faq')} className="text-[#B3BAC0] hover:text-white transition text-sm font-medium">FAQ</button>
            <button onClick={() => scrollToSection('waitlist')} className="px-6 py-2.5 bg-[#0094FF] hover:bg-[#33A9FF] rounded-lg font-semibold transition text-sm">Get early access</button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-[#1E2024] p-6 space-y-4">
            <button onClick={() => scrollToSection('how-it-works')} className="block text-[#B3BAC0] hover:text-white w-full text-left text-sm font-medium">How it works</button>
            <button onClick={() => scrollToSection('waitlist')} className="block text-[#B3BAC0] hover:text-white w-full text-left text-sm font-medium">Join</button>
            <button onClick={() => scrollToSection('faq')} className="block text-[#B3BAC0] hover:text-white w-full text-left text-sm font-medium">FAQ</button>
            <button onClick={() => scrollToSection('waitlist')} className="w-full px-6 py-2.5 bg-[#0094FF] hover:bg-[#33A9FF] rounded-lg font-semibold text-sm">Get early access</button>
          </div>
        )}
      </header>

      {mobileMenuOpen && <div className="md:hidden h-48" />}

      {/* Hero Section */}
      <section id="hero" className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div style={{ animation: 'slideUp 0.8s ease-out' }}>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-white">Where Music<br/>Finds Its People</h1>
            <p className="text-lg text-[#D1D5DB] mb-10 max-w-lg leading-relaxed font-light">Lantr connects fans, artists, and venues in one seamless platform. Discover live music, build your community, and make every night unforgettable.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={() => scrollToSection('waitlist')} className="px-8 py-4 bg-[#0094FF] hover:bg-[#33A9FF] rounded-lg font-semibold transition transform hover:-translate-y-0.5 text-base">Join the Waitlist</button>
              <button onClick={() => scrollToSection('how-it-works')} className="px-8 py-4 bg-transparent hover:bg-[#1D1F2F] rounded-lg font-semibold transition border border-[#1E2024] text-base">Learn More</button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-3 bg-[#0B0C0E]/60 backdrop-blur border border-[#1E2024] rounded-full">
                <Users size={18} className="text-[#0094FF]" />
                <span className="text-sm text-[#B3BAC0]">For Fans</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-[#0B0C0E]/60 backdrop-blur border border-[#1E2024] rounded-full">
                <Music size={18} className="text-[#33A9FF]" />
                <span className="text-sm text-[#B3BAC0]">For Artists</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-[#0B0C0E]/60 backdrop-blur border border-[#1E2024] rounded-full">
                <MapPin size={18} className="text-[#0094FF]" />
                <span className="text-sm text-[#B3BAC0]">For Venues</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-12" style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>
            {listings.slice(0, 2).map((listing, i) => (
              <div key={i} className="bg-[#141518]/50 border border-[#1E2024] rounded-lg p-6 hover:border-[#0094FF]/50 transition">
                <h3 className="font-semibold text-base mb-1 text-white">{listing.name}</h3>
                <p className="text-sm text-[#B3BAC0] mb-1">{listing.capacity || listing.genre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-4">How Lantr works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((item, i) => (
            <div key={i} className="bg-[#141518]/30 border border-[#1E2024] rounded-lg p-8 hover:border-[#0094FF]/50 transition" style={{ animation: `slideUp 0.8s ease-out ${i * 0.1}s both` }}>
              <div className="w-14 h-14 bg-[#0B0C0E] border border-[#1E2024] rounded-lg flex items-center justify-center mb-6 text-[#0094FF]">
                {item.icon}
              </div>
              <div className="text-4xl font-bold text-[#0094FF] mb-4">{item.number}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-[#B3BAC0] leading-relaxed font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Listings */}
      <section id="examples" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-4">Meet the Community</h2>
          <p className="text-[#B3BAC0] font-light">Connect with artists, venues, and fans across Sydney</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing, i) => (
            <div key={i} className="bg-[#141518]/50 border border-[#1E2024] rounded-lg p-6 hover:border-[#0094FF]/50 transition" style={{ animation: `slideUp 0.8s ease-out ${i * 0.1}s both` }}>
              <div className="w-20 h-20 bg-[#0B0C0E] border border-[#1E2024] rounded-xl flex items-center justify-center mb-4 mx-auto text-[#0094FF]">
                {listing.icon}
              </div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-2">{listing.name}</h3>
                <span className="inline-block px-3 py-1 bg-[#0094FF]/20 text-[#0094FF] text-xs font-semibold rounded-full uppercase">{listing.type}</span>
              </div>
              <div className="space-y-2 text-sm">
                {listing.genre && <div className="flex items-center gap-2 text-[#B3BAC0]"><Music size={16} className="text-[#33A9FF]" /><span>{listing.genre}</span></div>}
                {listing.interests && <div className="flex items-center gap-2 text-[#B3BAC0]"><Music size={16} className="text-[#33A9FF]" /><span>{listing.interests}</span></div>}
                {listing.location && <div className="flex items-center gap-2 text-[#B3BAC0]"><MapPin size={16} className="text-[#0094FF]" /><span>{listing.location}</span></div>}
                {listing.followers && <div className="flex items-center gap-2 text-[#B3BAC0]"><Users size={16} className="text-[#0094FF]" /><span>{listing.followers} followers</span></div>}
                {listing.capacity && <div className="flex items-center gap-2 text-[#B3BAC0]"><Users size={16} className="text-[#0094FF]" /><span>Capacity: {listing.capacity}</span></div>}
                {listing.events && <div className="flex items-center gap-2 text-[#B3BAC0]"><Calendar size={16} className="text-[#0094FF]" /><span>{listing.events}</span></div>}
                {listing.attended && <div className="flex items-center gap-2 text-[#B3BAC0]"><Calendar size={16} className="text-[#0094FF]" /><span>{listing.attended}</span></div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">Join the Lantr beta</h2>
          <p className="text-lg text-[#B3BAC0] max-w-2xl mx-auto font-light">Be the first to know when Lantr launches. Get early access and exclusive updates.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {userTypes.map((type, idx) => (
            <div 
              key={type.value} 
              onClick={() => setFormData(prev => ({ ...prev, userType: type.value }))} 
              className={`bg-[#141518]/50 backdrop-blur border rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${formData.userType === type.value ? 'border-2 border-[#0094FF] bg-[#0094FF]/10' : 'border-[#1E2024] hover:border-[#0094FF]/50'}`} 
              style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}
            >
              <div className="text-center">
                <div className="mb-3 flex justify-center text-[#0094FF]">{type.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{type.label}</h3>
                <p className="text-sm text-[#B3BAC0] font-light">{type.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#141518]/50 border border-[#1E2024] rounded-2xl p-8 md:p-12" style={{ animation: 'slideUp 0.6s ease-out 0.3s both' }}>
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thanks — you're on the waitlist!</h3>
              <p className="text-[#B3BAC0]">We'll send you updates to <span className="text-[#0094FF] font-semibold">{formData.email}</span></p>
              <p className="text-sm text-[#9AA3AB] mt-4">You're registered as a <span className="capitalize text-[#33A9FF]">{formData.userType.toLowerCase()}</span></p>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', userType: 'FAN' });
                }}
                className="mt-6 px-6 py-2 bg-transparent hover:bg-[#1D1F2F] rounded-lg font-semibold transition border border-[#1E2024] text-sm"
              >
                Add Another Person
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-6 p-4 bg-[#0094FF]/10 border border-[#0094FF]/30 rounded-lg">
                <p className="text-sm text-[#B3BAC0]"><span className="text-[#0094FF] font-semibold">Registering as:</span> <span className="capitalize text-white">{formData.userType.toLowerCase()}</span></p>
              </div>

              {submitError && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{submitError}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-3">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-[#9AA3AB]" />
                  </div>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Enter your full name" 
                    className={`w-full pl-12 pr-4 py-4 bg-[#0B0C0E] border rounded-xl text-white placeholder-[#9AA3AB] focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.name ? 'border-red-500' : 'border-[#1E2024] focus:border-[#0094FF]'}`} 
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-[#9AA3AB]" />
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="your@email.com" 
                    className={`w-full pl-12 pr-4 py-4 bg-[#0B0C0E] border rounded-xl text-white placeholder-[#9AA3AB] focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? 'border-red-500' : 'border-[#1E2024] focus:border-[#0094FF]'}`} 
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={!formData.name || !formData.email || isSubmitting} 
                className="w-full px-8 py-4 bg-[#0094FF] hover:bg-[#33A9FF] text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base hover:-translate-y-0.5"
              >
                {isSubmitting ? 'Submitting...' : 'Request access'}
              </button>

              <p className="text-xs text-[#9AA3AB] text-center">By joining, you agree to receive updates about Lantr. We respect your privacy and you can unsubscribe anytime.</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#B3BAC0] mb-8 font-light">Join early supporters on the waitlist</p>
          <div className="flex justify-center items-center gap-2">
            <div className="flex -space-x-3">
              {waitIcons.map((Icon, i) => (
                <div key={i} className="w-10 h-10 bg-[#141518] rounded-full flex items-center justify-center border-2 border-[#1E2024] text-[#9AA3AB] hover:text-[#0094FF] transition-transform" style={{ animation: `float 3s ease-in-out ${i * 0.2}s infinite` }}>
                  <Icon size={16} className="text-current" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-4">FAQ</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#141518]/30 border border-[#1E2024] rounded-lg overflow-hidden hover:border-[#0094FF]/50 transition">
              <button 
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)} 
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#0B0C0E]/50 transition font-semibold text-left gap-4"
              >
                <span className="text-white text-sm">{faq.question}</span>
                <ChevronDown size={20} className={`transform transition shrink-0 text-[#0094FF] ${openFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              {openFAQ === i && (
                <div className="px-6 py-4 border-t border-[#1E2024] text-[#B3BAC0] bg-[#0B0C0E]/30 font-light">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>   

      {/* Footer */}
      <footer className="border-t border-[#1E2024] py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">Lantr</h3>
              <p className="text-[#B3BAC0] text-sm mb-6 leading-relaxed font-light">Connecting fans, artists, and venues through the power of live music.</p>
              <div className="flex gap-3">
                {[{ icon: <Twitter size={20} />, label: 'Twitter' }, { icon: <Instagram size={20} />, label: 'Instagram' }, { icon: <Facebook size={20} />, label: 'Facebook' }, { icon: <Mail size={20} />, label: 'Email' }].map((social, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-[#141518] hover:bg-[#0094FF]/20 rounded-lg flex items-center justify-center text-[#9AA3AB] hover:text-[#0094FF] transition border border-[#1E2024]">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-6 text-xs uppercase tracking-widest">{category}</h4>
                <ul className="space-y-4">
                  {links.map((link, i) => (
                    <li key={i}>
                      {link.href.startsWith('#') ? (
                        <button onClick={() => scrollToSection(link.href)} className="text-[#9CA3AF] hover:text-[#0094FF] transition text-sm font-light">
{link.name}
</button>
) : (
<button onClick={() => scrollToSection(link.href)} className="text-[#9CA3AF] hover:text-[#0094FF] transition text-sm font-light">
{link.name}
</button>
)}
</li>
))}
</ul>
</div>
))}
</div>
      <div className="pt-16 border-t border-[#1E2024] flex flex-col md:flex-row justify-between items-center gap-4 text-[#9AA3AB] text-sm font-light">
        <p>© 2025 Lantr — connecting local rooms with the right acts.</p>
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