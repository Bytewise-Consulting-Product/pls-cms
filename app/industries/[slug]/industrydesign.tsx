"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronUp, Phone, Mail, MapPin, Clock, ChevronRight, ArrowRight } from "lucide-react"
import IndustrySection from "../[slug]/industrysection"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import ContactForm from "@/app/components/layout/contactform"

interface ServiceData {
  id: string
  title: string
  subtitle: string
  image?: string // Make sure image is defined in the interface
  description: {
    intro: string[]
    conclusion: string
  }
  industryStatus?: {
    title: string
    items: string[]
  }
  challenges: string[]
  requirements?: string[]
  solutions: {
    title: string
    items: string[]
  }[]
  benefits: {
    title: string
    description: string
  }[]
  features: {
    title: string
    description: string
    image?: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
}

interface Props {
  data: ServiceData
  type: "industry" | "service"
  parentTitle?: string
}

export default function IndustryDesign({ data, type, parentTitle }: Props) {
  // Add console log to debug the data
  console.log("IndustryDesign data:", data)

  const [isSticky, setIsSticky] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [hasError, setHasError] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    try {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsSticky(true)
          setShowBackToTop(true)
        } else {
          setIsSticky(false)
          setShowBackToTop(false)
        }

        // Check for elements with data-aos attribute
        const elements = document.querySelectorAll("[data-aos]")
        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top
          const elementBottom = element.getBoundingClientRect().bottom

          if (elementTop < window.innerHeight && elementBottom > 0) {
            setIsVisible((prev) => ({ ...prev, [element.id]: true }))
          }
        })
      }

      window.addEventListener("scroll", handleScroll)
      handleScroll() // Initial check
      return () => window.removeEventListener("scroll", handleScroll)
    } catch (error) {
      console.error("Error in scroll effect:", error)
      setHasError(true)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Ensure we have the required data or provide defaults
  const industryData = {
    title: data?.title || "Industry Title",
    subtitle: data?.subtitle || "Industry Subtitle",
    image: data?.image || "/placeholder.svg?height=500&width=800",
    description: data?.description || { intro: [], conclusion: "" },
    industryStatus: data?.industryStatus || { title: "", items: [] },
    challenges: data?.challenges || [],
    requirements: data?.requirements || [],
    solutions: data?.solutions || [],
    benefits: data?.benefits || [],
    features: data?.features || [],
    faq: data?.faq || [],
  }

  // Handle image error
  const handleImageError = () => {
    console.error("Failed to load image:", industryData.image)
    setImageError(true)
  }

  if (hasError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error Rendering Industry Design</h2>
        <p className="mt-4">There was an error rendering this component. Please check the console for details.</p>
      </div>
    )
  }

  return (
    <div className="font-sans text-gray-800 dark:bg-white">
      {/* Hero Section */}
      <div className="bg-[#003087] py-20 relative transition-all duration-500 ease-in-out animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white animate-slideUp">{industryData.title}</h1>
          <div
            className="flex items-center justify-center space-x-2 text-sm animate-slideUp"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/" className="text-white hover:text-orange-500 transition-colors duration-300">
              Home
            </Link>
            <ChevronRight size={16} className="text-white" />
            <Link href="/industries" className="text-white hover:text-orange-500 transition-colors duration-300">
              Industries
            </Link>
            {parentTitle && (
              <>
                <ChevronRight size={16} className="text-white" />
                <Link
                  href={`/industries/${parentTitle.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white hover:text-orange-500 transition-colors duration-300"
                >
                  {parentTitle}
                </Link>
              </>
            )}
            <ChevronRight size={16} className="text-white" />
            <span className="text-orange-500">{industryData.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1 animate-slideRight">
              <div className="bg-gray-100 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-300">All Services</h3>
                <ul className="space-y-4 ">
                  <li>
                    <Link
                      href="/services/healthcare-life-sciences"
                      className="flex items-center justify-between text-[#003087] bg-white hover:bg-[#003087] hover:text-[#FF6B35] p-4 rounded-md shadow-sm"
                    >
                      <span>Healthcare & Life Sciences</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/fintech-banking"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>Fintech & Banking</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ecommerce-retail"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>E-commerce & Retail</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/education-elearning"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>Education & E-Learning</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/manufacturing-logistics"
                      className="flex items-center justify-between text-gray-700 hover:text-[#FF6B35] p-4 transition-colors hover:bg-[#003087] rounded-md"
                    >
                      <span>Manufacturing & Logistics</span>
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className=" text-white p-8 rounded-lg transition-all duration-300 bg-[#003087]">
                <h3 className="text-xl text-white font-bold mb-6">Need Help?</h3>
                <p className="mb-6">Contact our customer support team if you have any questions.</p>
                <div className="flex items-center space-x-3 mb-4">
                  <Phone size={20} className="text-[#FF6B35]" />
                  <span>+1 800 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <Mail size={20} className="text-[#FF6B35]" />
                  <span>info@primelogic.com</span>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin size={20} className="text-[#FF6B35]" />
                  <span>123 Main Street, Anytown</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-[#FF6B35]" />
                  <span>Mon-Fri: 9:00 - 17:00</span>
                </div>
              </div>

              <div className="mt-8">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Healthcare Brochure"
                  width={300}
                  height={400}
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="space-y-8">
                {/* Hero Image */}
                <div
                  data-aos="fade-up"
                  id="section-1"
                  className={`transition-all duration-500 transform ${
                    isVisible["section-1"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  {/* Use regular img tag for better error handling */}
                  {!imageError ? (
                    <img
                      src={industryData.image || "/placeholder.svg"}
                      alt={industryData.title}
                      className="w-full h-auto rounded-lg mb-8 transition-transform duration-300 hover:scale-[1.02]"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-[500px] bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
                      <p className="text-gray-500">Image could not be loaded</p>
                    </div>
                  )}
                </div>

                {/* Introduction */}
                <div
                  data-aos="fade-up"
                  id="section-2"
                  className={`transition-all duration-500 delay-100 transform ${
                    isVisible["section-2"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <h2 className="text-3xl font-bold mb-6">{industryData.subtitle}</h2>
                  {industryData.description.intro.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Industry Status Section */}
                <div
                  data-aos="fade-up"
                  id="section-3"
                  className={`transition-all duration-500 delay-200 transform ${
                    isVisible["section-3"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <IndustrySection
                    title={industryData.title}
                    industryStatus={industryData.industryStatus}
                    challenges={industryData.challenges}
                    requirements={industryData.requirements}
                  />
                </div>

                {/* Solutions Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {industryData.solutions.map((solution, index) => (
                    <motion.div
                      key={index}
                      className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#003087] hover:border-[#003087] group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                        {solution.title}
                      </h4>
                      <ul className="space-y-2">
                        {solution.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-[#FF6B35] rounded-full mt-1 mr-3 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-gray-700 group-hover:text-white transition-colors duration-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Features Section */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {industryData.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#003087] hover:border-[#003087] group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="p-6">
                          <h4 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                            {feature.title}
                          </h4>
                          <p className="text-gray-700 mb-4 group-hover:text-white transition-colors duration-300">
                            {feature.description}
                          </p>
                          {feature.image && (
                            <div className="mt-4 overflow-hidden rounded-md">
                              <img
                                src={feature.image || "/placeholder.svg"}
                                alt={feature.title}
                                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                  console.error("Failed to load feature image:", feature.image)
                                  e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="border-t border-b border-gray-200 py-8 my-8">
                  <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="space-y-4">
                    {industryData.faq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="hover:bg-[#003087] hover:text-white p-4 rounded-lg transition-all duration-300 [&[data-state=open]]:bg-[#003087] [&[data-state=open]]:text-white">
                          <div className="flex items-center text-black hover:text-white gap-2 text-left">
                            <span className="text-xl font-bold">📌 {item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-2 pb-4">
                          <p className="text-gray-700">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0"
          size="icon"
          variant="default"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideRight {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slideDown { animation: slideDown 0.5s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-in-out; }
        .animate-slideRight { animation: slideRight 0.5s ease-in-out; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }

        /* Interactive elements transitions */
        a, button { transition: all 0.3s ease-in-out; }

        /* Enhanced hover effects */
        .hover-lift { transition: transform 0.3s ease-in-out; }
        .hover-lift:hover { transform: translateY(-5px); }

        /* Smooth scroll behavior */
        html { scroll-behavior: smooth; }

        /* Card hover effects */
        .card-hover {
          transition: all 0.3s ease-in-out;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  )
}
