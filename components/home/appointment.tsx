"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Loader2, Check } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { consultationSchema, type ConsultationFormData } from "@/validation/consultationschema"
import { submitConsultation } from "@/app/actions/consultation-actions"

// Contact Card Component
const ContactCard = ({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) => (
  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center gap-4">
    <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center">{icon}</div>
    <div>
      <p className="text-sm text-white/60">{title}</p>
      <p className="font-semibold">{detail}</p>
    </div>
  </div>
)

export default function Appointment() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    detail: "",
    service: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  })

  const onSubmit = async (data: ConsultationFormData) => {
    setIsLoading(true)

    try {
      const response = await fetch("https://localhost:8000/api/v1/getConsultation/requestAConsultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // const response = await submitConsultation(data)

      const responseData = await response.json();
      if (responseData.success) {
        setIsSubmitted(true)
        setResponseMessage(responseData.message)
        reset()

        // Reset success message after 8 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 8000)
      } else {
        setResponseMessage(responseData.message)
      }
    } catch (error) {
      console.error("Error submitting consultation request:", error)
      setResponseMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  

  return (
    <section className="relative py-16 mb-32 md:py-24 dark:bg-white">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url(${process.env.NEXT_PUBLIC_IMAGE_PATH}/4.png)`,
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <span className="inline-block text-sm text-[#FF6B35] font-semibold mb-4">MAKE A CONSULTATION</span>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
              We Provide Best Advice For Your Future
            </h2>
            <p className="text-white/80 mb-12 max-w-xl">
              Get expert advice tailored to your needs. Book a consultation with our professionals to discuss your
              project and take the next steps toward success.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <ContactCard
                icon={<Phone className="w-6 h-6 text-white" />}
                title="CALL AVAILABLE"
                detail="+1 (916) 699-0091"
              />
              <ContactCard
                icon={<Mail className="w-6 h-6 text-white" />}
                title="WRITE A QUICK MAIL"
                detail="b2b@dekoshurcrafts.com"
              />
              <ContactCard
                icon={<MapPin className="w-6 h-6 text-white" />}
                title="VISIT OFFICE"
                detail="4445 Corporation Ln Ste 264, Virginia Beach, Virginia 23462 - USA"
              />
              <ContactCard
                icon={<MapPin className="w-6 h-6 text-white" />}
                title="VISIT GERMAN OFFICE"
                detail="Kaiserbleek 4 Goslar"
              />
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#003087] p-8 rounded-lg w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Book Your Consultation</h3>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Consultation Request Submitted!</h3>
                <p className="text-green-700">{responseMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Full Name</label>
                  <Input
                    {...register("name")}
                    className="w-full px-4 py-2 rounded-lg"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Email Address</label>
                  <Input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-2 rounded-lg"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-2 rounded-lg"
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Address</label>
                  <Input {...register("address")} className="w-full px-4 py-2 rounded-lg" />
                  {errors.address && <p className="text-red-300 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Consultation Date</label>
                  <Input
                    type="datetime-local"
                    {...register("date")}
                    className="w-full px-4 py-2 rounded-lg"
                    aria-invalid={errors.date ? "true" : "false"}
                  />
                  {errors.date && <p className="text-red-300 text-sm mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Consultation Subject</label>
                  <Input
                    {...register("subject")}
                    className="w-full px-4 py-2 rounded-lg"
                    aria-invalid={errors.subject ? "true" : "false"}
                  />
                  {errors.subject && <p className="text-red-300 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Message</label>
                  <Textarea
                    {...register("message")}
                    className="w-full px-4 py-2 rounded-lg"
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {responseMessage && !isSubmitted && <div className="text-red-300 text-sm">{responseMessage}</div>}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#FF6B35] text-white hover:bg-[#003087] hover:text-white px-6 py-3 rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <strong>Submit Consultation Request</strong>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
