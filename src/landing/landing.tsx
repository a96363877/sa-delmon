"use client"

import { toast } from "react-hot-toast"
import { useCart } from "../cartContext"
import React from "react"

function Landing(props: { handleNextPage: () => void }) {
  const { total, cartItems, addToCart } = useCart()

  const handleAddtoCart = (items: any) => {
    addToCart(items)
    toast.success("تم اضافة المنتج")
  }

  return (
    <div style={{ zoom: 0.9 }} dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="relative w-[90px] h-12 block">
                <img src="/logggd.png" alt="لحوم دلمون" className="object-contain w-full h-full" />
              </a>
            
            </div>

            <div className="hidden md:flex flex-1 mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  className="w-full py-2 px-10 border rounded-md text-right"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={props.handleNextPage}
              className="flex items-center px-4 py-2 rounded-md bg-[#00aa4a] text-white"
            >
              <span className="ml-2">{total.toFixed(2)} ر.س</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        {/* Hero Section */}
        <section className="py-6">
          <h1 className="text-3xl font-bold mb-2">لحوم السعودية</h1>
          <p className="text-gray-600 mb-6">
            اكتشف منتجاتنا عالية الجودة من اللحوم السعودية الطازجة والمستوردة والدواجن المميزة، اطلب الآن مع أفضل وأسرع
            خدمة توصيل في المملكة.
          </p>

          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 gap-4">
            <div className="flex flex-col items-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-gray-100 mb-2 relative">
                <img src="/1.png" alt="عروض" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-sm">عروض</span>
            </div>
            <div className="flex flex-col items-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-gray-100 mb-2 relative">
                <img src="/3.png" alt="لحم بقري" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-sm">لحم بقري</span>
            </div>
            <div className="flex flex-col items-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-gray-100 mb-2 relative">
                <img src="/2.png" alt="دجاج طازج" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-sm">دجاج طازج</span>
            </div>
            <div className="flex flex-col items-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-gray-100 mb-2 relative">
                <img src="/4.png" alt="لحم غنم" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-sm">لحم غنم</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 my-4">
            <div className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
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
                className="ml-1"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              <span>توصيل مجاني</span>
            </div>
            <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              <span>خلال 40 دقيقة</span>
            </div>
            <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              <span>نقل مخصص</span>
            </div>
          </div>
        </section>

        {/* Store Info */}
        <section className="bg-white rounded-t-3xl overflow-hidden mb-6">
          <div className="relative h-48 w-full">
            <img src="/min.png" alt="قائمة لحوم دلمون" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">خصم %30</div>
              <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">ادعم المحلي</div>
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-sm flex items-center">
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
                className="ml-1"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>40 دقيقة</span>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-2xl font-bold mb-1">قائمة لحوم السعودية</h2>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <div className="flex items-center ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#f3c117"
                  stroke="#f3c117"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>4.9</span>
              </div>
              <span>اللحوم السعودية الطازجة والمستوردة والدواجن المميزة</span>
            </div>

            <div className="grid grid-cols-4 gap-4 py-3 border-t border-b mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">وقت التوصيل</p>
                <p className="font-semibold">40 دقيقة</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">التقييم</p>
                <p className="font-semibold">4.7</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">المسافة</p>
                <p className="font-semibold">15 كيلو</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">ساعات العمل</p>
                <p className="font-semibold text-green-500">مفتوح</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">أطلب الآن عبر موقعنا واحصل على خدمة توصيل سريعة في غضون 28 دقيقة.</p>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-8" id="cart">
          <h2 className="text-xl font-bold mb-4">عروض اليوم</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <img src="/kardl.webp" alt="خروف سعودي كامل" className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="font-bold text-lg">899.00 ر.س</p>
                <p className="text-sm text-gray-700 mb-3">خروف سعودي كامل - نعيمي فاخر</p>
                <button
                  onClick={() =>
                    handleAddtoCart({
                      id: 1,
                      name: "خروف سعودي كامل - نعيمي فاخر",
                      price: "899.00",
                      img: "/kardl.webp",
                    })
                  }
                  className="w-full py-1 border border-[#00aa4a] text-[#00aa4a] rounded-md text-sm hover:bg-[#00aa4a] hover:text-white transition-colors"
                >
                  إضافة
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <img
                  src="https://cdn.salla.sa/XYzRj/xiyM7mdnGrPa1OsDrg7qSR1HDxHN3pLBD56YBeJI.png"
                  alt="لحم بقري سعودي"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="font-bold text-lg">149.00 ر.س</p>
                <p className="text-sm text-gray-700 mb-3">لحم بقري سعودي طازج - 5 كيلو</p>
                <button
                  onClick={() =>
                    handleAddtoCart({
                      id: 2,
                      name: "لحم بقري سعودي طازج - 5 كيلو",
                      price: "149.00",
                      img: "/placeholder.svg?height=200&width=200",
                    })
                  }
                  className="w-full py-1 border border-[#00aa4a] text-[#00aa4a] rounded-md text-sm hover:bg-[#00aa4a] hover:text-white transition-colors"
                >
                  إضافة
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <img
                  src="https://cdn.salla.sa/XRVjV/7c4401c0-ec89-4dd2-af3c-82f31bac4262-1000x1000-4XAOOzl8EA3wmJi0iNFjClPvor7yQf7WMiDZItAS.png"
                  alt="صدور دجاج سعودي"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="font-bold text-lg">79.00 ر.س</p>
                <p className="text-sm text-gray-700 mb-3">صدور دجاج سعودي طازجة - 3 كيلو</p>
                <button
                  onClick={() =>
                    handleAddtoCart({
                      id: 3,
                      name: "صدور دجاج سعودي طازجة - 3 كيلو",
                      price: "79.00",
                      img: "/placeholder.svg?height=200&width=200",
                    })
                  }
                  className="w-full py-1 border border-[#00aa4a] text-[#00aa4a] rounded-md text-sm hover:bg-[#00aa4a] hover:text-white transition-colors"
                >
                  إضافة
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <img
                  src="https://cdn.salla.sa/XYzRj/laSFQqoW46mEVlZqYxeSbs7vu2zcDqMTS81DPuRG.jpg"
                  alt="لحم غنم سعودي"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="font-bold text-lg">119.00 ر.س</p>
                <p className="text-sm text-gray-700 mb-3">لحم غنم سعودي طازج - 2 كيلو</p>
                <button
                  onClick={() =>
                    handleAddtoCart({
                      id: 4,
                      name: "لحم غنم سعودي طازج - 2 كيلو",
                      price: "119.00",
                      img: "/placeholder.svg?height=200&width=200",
                    })
                  }
                  className="w-full py-1 border border-[#00aa4a] text-[#00aa4a] rounded-md text-sm hover:bg-[#00aa4a] hover:text-white transition-colors"
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Regular Products */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">&nbsp;</h2>
          <div className="space-y-4">
            {[
              {
                id: 5,
                name: "عرض اللحوم السعودية",
                description: "5 كيلو لحم بقري سعودي ممتاز طازج",
                price: "159.00",
                image: "https://cdn.salla.sa/XYzRj/xiyM7mdnGrPa1OsDrg7qSR1HDxHN3pLBD56YBeJI.png",
              },
              {
                id: 6,
                name: "عرض الحاشي",
                description: "لحم حاشي سعودي طازج - 1 كيلو",
                price: "89.00",
                image: "https://cdn.salla.sa/XYzRj/laSFQqoW46mEVlZqYxeSbs7vu2zcDqMTS81DPuRG.jpg",
              },
              {
                id: 7,
                name: "عرض الدجاج",
                description: "دجاج سعودي طازج مقطع - 2 كيلو",
                price: "59.00",
                image:
                  "https://cdn.salla.sa/XRVjV/7c4401c0-ec89-4dd2-af3c-82f31bac4262-1000x1000-4XAOOzl8EA3wmJi0iNFjClPvor7yQf7WMiDZItAS.png",
              },
              {
                id: 8,
                name: "لحم بقري استرالي",
                description: "لحم بقري استرالي مبرد - 3 كيلو",
                price: "129.00",
                image: "https://ozostore.net/wp-content/uploads/2024/09/1000150127.jpg",
              },
              {
                id: 9,
                name: "لحم نعيمي سعودي",
                description: "لحم نعيمي سعودي طازج - 1 كيلو",
                price: "99.00",
                image: "https://aloolahma.com/2023/02/20/63f365c64eaaf.png",
              },
              {
                id: 10,
                name: "دجاج سعودي كامل",
                description: "دجاج سعودي كامل طازج - 1.5 كيلو",
                price: "45.00",
                image: "https://cdn.salla.sa/alpwW/p4PWkDMkUUU4bAZLAY04Zr7LJJIu1fg0V14J9TIg.png",
              },
            ].map((product) => (
              <div key={product.id} className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-1/3 h-32">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{product.price} ر.س</p>
                    <button
                      onClick={() =>
                        handleAddtoCart({
                          id: product.id,
                          name: product.description.replace(".", ""),
                          price: product.price,
                          img: "/placeholder.svg?height=200&width=200",
                        })
                      }
                      className="px-4 py-1 border border-[#00aa4a] text-[#00aa4a] rounded-md text-sm hover:bg-[#00aa4a] hover:text-white transition-colors"
                    >
                      إضافة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#00aa4a] text-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white text-[#00aa4a] w-6 h-6 rounded-full flex items-center justify-center mr-2">
            <span className="text-sm">{cartItems.length}</span>
          </div>
          <span className="font-bold">{total.toFixed(2)} ر.س</span>
        </div>
        <button onClick={props.handleNextPage} className="flex items-center">
          <span className="ml-2">اذهب الى السلة</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 px-4 text-center text-sm text-gray-600 mt-20">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="ml-4">
            الشروط والأحكام
          </a>
          <a href="#">سياسة الخصوصية</a>
        </div>
        <p>© 2024 شركة لحوم السعودية</p>
      </footer>
    </div>
  )
}

export default Landing
