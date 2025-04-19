import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import img from '../assets/img.jpg'

const Landing = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 py-4'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-green-600">PaddyOptimize</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">Testimonials</a>
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-md text-green-600 border border-green-600 hover:bg-green-50 transition-all"
              >
                Log In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white py-4 mt-2 rounded-lg shadow-lg">
              <div className="flex flex-col space-y-3 px-4">
                <a href="#features" className="text-gray-600 py-2 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="text-gray-600 py-2 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>How It Works</a>
                <a href="#testimonials" className="text-gray-600 py-2 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
                <div className="pt-2 flex flex-col space-y-3">
                  <button 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-md text-green-600 border border-green-600 hover:bg-green-50 transition-all"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/signup');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Smart <span className="text-green-600">Fertilizer</span> Recommendations for Better Yields
                </h1>
                <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-xl">
                  Our AI-powered system helps paddy farmers optimize their fertilizer use for higher yields, lower costs, and more sustainable farming.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 rounded-lg bg-green-600 text-white font-medium text-lg shadow-lg hover:bg-green-700 transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Start Free Trial
                  </button>
                  <a 
                    href="#how-it-works"
                    className="px-8 py-4 rounded-lg border border-gray-300 text-gray-700 font-medium text-lg hover:bg-gray-50 flex items-center justify-center transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    How It Works
                  </a>
                </div>
                
                <div className="mt-10 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center border-2 border-white text-green-600 font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Used by 5,000+ farmers</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={img} 
                    alt="Lush paddy field" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-xl">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Results</p>
                      <p className="font-bold text-gray-800">20-30% Yield Increase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 mb-6 text-sm uppercase tracking-wider font-medium">TRUSTED BY FARMING ORGANIZATIONS ACROSS THE COUNTRY</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {['AgriTech', 'FarmEasy', 'RiceMasters', 'GreenHarvest', 'PaddyPro'].map((org, index) => (
                <div key={index} className="text-xl font-bold text-gray-400">{org}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">FEATURES</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">Why Farmers Choose Our Platform</h2>
              <p className="mt-4 text-xl text-gray-600">Our smart fertilizer recommendation system offers multiple benefits for paddy farmers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Higher Yield</h3>
                <p className="text-gray-600">Increase your paddy yield by up to 30% with optimized fertilizer applications tailored to your specific soil and climate conditions.</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost Reduction</h3>
                <p className="text-gray-600">Save up to 25% on fertilizer costs by eliminating waste and applying exactly what your paddy needs, when it needs it.</p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Environmentally Friendly</h3>
                <p className="text-gray-600">Minimize environmental impact with precise fertilizer recommendations that reduce runoff, soil degradation, and water pollution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">PROCESS</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">How Our System Works</h2>
              <p className="mt-4 text-xl text-gray-600">A simple 4-step process to optimize your paddy fertilization</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Input Your Data",
                  description: "Enter details about your paddy variety, soil type, climate, and irrigation methods.",
                  icon: (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  )
                },
                {
                  step: 2,
                  title: "AI Analysis",
                  description: "Our AI system analyzes the data and compares it with proven agricultural practices.",
                  icon: (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  )
                },
                {
                  step: 3,
                  title: "Get Recommendations",
                  description: "Receive detailed fertilizer recommendations tailored to your specific conditions.",
                  icon: (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  )
                },
                {
                  step: 4,
                  title: "Apply & Monitor",
                  description: "Apply the recommended fertilizers and track your paddy's growth and health.",
                  icon: (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  )
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 flex-grow">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">TESTIMONIALS</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">What Farmers Say</h2>
              <p className="mt-4 text-xl text-gray-600">Don't just take our word for it - hear from farmers who have used our system</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Rice Farmer, Tamil Nadu",
                  quote: "The fertilizer recommendations are spot on! I've increased my yield by 25% while using less fertilizer. This tool is a game-changer for paddy farmers.",
                  rating: 5
                },
                {
                  name: "Lakshmi Devi",
                  role: "Paddy Farmer, Andhra Pradesh",
                  quote: "I was skeptical at first, but the results speak for themselves. My soil health has improved significantly and my costs have gone down. Highly recommend!",
                  rating: 5
                },
                {
                  name: "Harpreet Singh",
                  role: "Rice Farmer, Punjab",
                  quote: "The detailed information about each fertilizer has been invaluable. Now I understand not just what to use, but why and how to use it correctly.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 md:px-12 py-12 md:py-16 text-center md:text-left md:flex md:items-center md:justify-between">
                <div className="mb-8 md:mb-0 md:max-w-xl">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Optimize Your Paddy Cultivation?</h2>
                  <p className="text-green-50 text-lg">Join thousands of farmers who are maximizing their yields while minimizing costs. Get started today with our free trial.</p>
                </div>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg font-medium text-lg"
                  >
                    Get Started Free
                  </button>
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-transparent border border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold mb-4 md:mb-0">Paddy Fertilizer Recommendation System</p>
                  <p>© {new Date().getFullYear()} All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  );
};

export default Landing;