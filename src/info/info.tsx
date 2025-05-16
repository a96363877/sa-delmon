"use client"

import * as React from "react"

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
    <div style={{ zoom: 0.9 }} dir="rtl">
      <div id="the_cart" style={{ background: "#000" }}>
        <div className="p-4 bg-white rounded-lg">
          <form onSubmit={handleSubmit} id="model_data" method="post">
            <div className="mb-6">
              <div style={{ marginTop: 30 }}>
                <h3 className="text-xl font-bold mb-5">موقع التوصيل</h3>
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
                      placeholder="الاسم"
                      required
                    />
                  </div>
                  <div>
                    <input
                      style={{ border: "1px #f2f2f2 solid", margin: 2, background: "#f2f2f2" }}
                      name="address"
                      className="w-full p-3 rounded-md"
                      type="text"
                      placeholder="العنوان"
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
                      placeholder="الشقة/البناية السكنية"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">رقم الهاتف</label>
                    <input
                      name="phone"
                      className="w-full p-3 rounded-md"
                      onChange={(e) => props.setPhone(e.target.value)}
                      type="tel"
                      style={{ border: "1px #f2f2f2 solid", margin: 2, background: "#f2f2f2" }}
                      maxLength={12}
                      defaultValue={+973}
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
                      placeholder="ضع تعليمات توصيل للسائق"
                      autoComplete="off"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">حدد موقعك</h3>
              <div className="grid grid-cols-3 gap-1 text-center mb-6">
                <div className="bg-black text-white p-3 rounded-3xl flex items-center justify-center gap-2">
                  <img src="https://fasfsa.netlify.app/home.png" alt="home" height={20} width={20} />
                  <span>البيت</span>
                </div>
                <div className="bg-[#f2f2f2] p-3 rounded-3xl flex items-center justify-center gap-2">
                  <img src="https://fasfsa.netlify.app/work2.png" alt="work" height={20} width={20} />
                  <span>العمل</span>
                </div>
                <div className="bg-[#f2f2f2] p-3 rounded-3xl flex items-center justify-center gap-2">
                  <img src="https://fasfsa.netlify.app/loc.png" alt="location" height={20} width={20} />
                  <span>العميل</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">طريقة الدفع</h3>
              <div className="bg-[#f2f2f2] p-4 rounded-md flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <img alt="mastercard" src="/master.svg" style={{ width: 20, height: 20, margin: 2 }} />
                    <img alt="visa" src="/vite.svg" style={{ width: 20, height: 20, margin: 2 }} />
                    <img alt="visa" src="/mas.svg" style={{ width: 20, height: 20, margin: 2 }} />
                  </div>
                  <span>بطاقة السحب الآلي</span>
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
                  <h5 className="font-bold">سلة لحوم السعودية</h5>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm">
                    المنتجات (<strong>{cartItems.length}</strong>)
                  </p>
                  <p className="text-sm">
                    <span>{total}</span> ر.س
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">قيمة التوصيل</p>
                  <p className="text-sm">0 ر.س</p>
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
                    className="mt-1 ml-3"
                  />
                  <label htmlFor="payFull1" className="flex-1">
                    <div>
                      <p className="font-medium text-lg mb-1">دفع قيمة الطلب كاملة</p>
                      <p className="text-sm text-gray-600">
                        سدد اجمالي قيمة الطلب الآن وادفع من خلال بينفت- واحصل على توصيل مجاني
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
                    className="mt-1 ml-3"
                  />
                  <label htmlFor="payFull2" className="flex-1">
                    <div>
                      <p className="font-medium text-lg mb-1">دفع مبلغ 10 ر.س فقط لتأكيد طلبك</p>
                      <p className="text-sm text-gray-600">
                        يخصم من قيمة الطلب وادفع الباقي عند الاستلام مع دفع مصاريف توصيل بقيمة 11 ر.س
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">المجموع الكلي</h3>
                <h3 className="text-lg font-bold">{isChecked === "payfull" ? total : 10} ر.س</h3>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-md text-white font-bold"
                style={{ background: "#00aa4a" }}
              >
                متابعة الدفع ({isChecked === "payfull" ? total : 10} ر.س)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Info
