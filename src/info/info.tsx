"use client"

import type * as React from "react"

import { useState } from "react"
import { useCart } from "../cartContext"

function Info(props: {
  handleNextPage: () => void
  setName: (name: string) => void
  setPhone: (phone: string) => void
}) {
  const { total, cartItems } = useCart()
  const [isChecked, setIsChecked] = useState("payfull")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    props.handleNextPage()
  }

  return (
    <div style={{ zoom: 0.9 }} dir="ltr">
      <div id="the_cart" style={{ background: "#000" }}>
        <div className="p-4 bg-white rounded-lg">
          <form onSubmit={handleSubmit} id="model_data" method="post">
            <div className="mb-6">
              <div style={{ marginTop: 30 }}>
                <h3 className="text-xl font-bold mb-5">Delivery Information</h3>
                <div className="space-y-3">
                  <div>
                    <input
                      name="name"
                      className="w-full p-3 rounded-md"
                      type="text"
                      onChange={(e) => props.setName(e.target.value)}
                      style={{ border: "1px #f2f2f2 solid", margin: 2, background: "#f2f2f2" }}
                      defaultValue=""
                      autoComplete="off"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      style={{ border: "1px #f2f2f2 solid", margin: 2, background: "#f2f2f2" }}
                      name="address"
                      className="w-full p-3 rounded-md"
                      type="text"
                      placeholder="Street Address"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <input
                      style={{ border: "1px #f2f2f2 solid", margin: 2, background: "#f2f2f2" }}
                      name="apartment"
                      className="w-full p-3 rounded-md"
                      type="text"
                      defaultValue=""
                      placeholder="Apartment/Building Number"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      name="phone"
                      className="w-full p-3 rounded-md"
                      onChange={(e) => props.setPhone(e.target.value)}
                      type="tel"
                      style={{ border: "1px #f2f2f2 solid", margin: 2, background: "#f2f2f2" }}
                      maxLength={12}
                      defaultValue={"+973"}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      maxLength={200}
                      style={{ border: "1px #f2f2f2 solid", margin: 4, background: "#f2f2f2" }}
                      name="notes"
                      className="w-full p-3 rounded-md"
                      placeholder="Special delivery instructions for driver"
                      autoComplete="off"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">Select Location Type</h3>
              <div className="grid grid-cols-3 gap-1 text-center mb-6">
                <div className="bg-black text-white p-3 rounded-3xl flex items-center justify-center gap-2">
                  <img src="/home.png" alt="home" height={20} width={20} />
                  <span>Home</span>
                </div>
                <div className="bg-[#f2f2f2] p-3 rounded-3xl flex items-center justify-center gap-2">
                  <img src="/work2.png" alt="work" height={20} width={20} />
                  <span>Office</span>
                </div>
                <div className="bg-[#f2f2f2] p-3 rounded-3xl flex items-center justify-center gap-2">
                  <img src="/loc.png" alt="location" height={20} width={20} />
                  <span>Other</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">Payment Method</h3>
              <div className="bg-[#f2f2f2] p-4 rounded-md flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <img alt="mastercard" src="/master.svg" style={{ width: 20, height: 20, margin: 2 }} />
                    <img alt="visa" src="/vite.svg" style={{ width: 20, height: 20, margin: 2 }} />
                    <img alt="benefit" src="/logo.webp" style={{ width: 20, height: 20, margin: 2 }} />
                  </div>
                  <span>Credit/Debit Card & Benefit</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>

              <div className="bg-white p-4 rounded-md mb-4">
                <div className="mb-2">
                  <h5 className="font-bold">National Fish Company Cart</h5>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">
                    Items (<strong>{cartItems.length}</strong>)
                  </p>
                  <p className="text-sm">
                    <span>BHD {total.toFixed(2)}</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Delivery Fee</p>
                  <p className="text-sm">BHD 0.00</p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <div className="bg-[#f2f2f2] p-4 rounded-md flex">
                  <input
                    id="payFull1"
                    value={20}
                    checked={isChecked === "payfull"}
                    name="payFull"
                    type="radio"
                    onChange={() => setIsChecked("payfull")}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="payFull1" className="flex-1">
                    <div>
                      <p className="font-medium text-lg mb-1">Pay Full Order Amount</p>
                      <p className="text-sm text-gray-600">
                        Pay the complete order total now through Benefit Pay and enjoy free delivery
                      </p>
                    </div>
                  </label>
                </div>

                <div className="bg-[#f2f2f2] p-4 rounded-md flex">
                  <input
                    id="payFull2"
                    value="10"
                    name="payFull"
                    type="radio"
                    onChange={() => setIsChecked("notfull")}
                    checked={isChecked === "notfull"}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="payFull2" className="flex-1">
                    <div>
                      <p className="font-medium text-lg mb-1">Pay BHD 1.00 to Confirm Your Order</p>
                      <p className="text-sm text-gray-600">
                        Amount will be deducted from total. Pay remaining balance on delivery plus BHD 4.00 delivery
                        charge
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Total Amount</h3>
                <h3 className="text-lg font-bold">BHD {isChecked === "payfull" ? total.toFixed(2) : "1.00"}</h3>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 py-4 rounded-md text-white font-bold"
              >
                Continue to Payment (BHD {isChecked === "payfull" ? total.toFixed(2) : "1.00"})
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Info
