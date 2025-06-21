import { Fish, Truck, Award, Clock } from "lucide-react"

export default function Header() {
  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Company Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Fish className="w-4 h-4" />
          Premium Seafood Provider
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
          National Fish Company
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-gray-700 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover our premium collection of fresh and frozen fish with exceptional seafood quality
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience Bahrain's finest seafood delivery service, bringing ocean-fresh quality directly to your doorstep
          with unmatched speed and reliability.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full shadow-sm">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Premium Quality</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full shadow-sm">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full shadow-sm">
            <Truck className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Bahrain Wide</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          Order Fresh Seafood Now
        </button>

        {/* Trust Indicator */}
        <p className="text-sm text-gray-500 mt-6">Trusted by thousands of customers across Bahrain</p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </div>
  )
}
