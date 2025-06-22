
import { toast } from "react-hot-toast"
import { useCart } from "../cartContext"
import * as React from "react"
import {  offersData, allProductsData } from "../data"
import Header from "./header"

function Landing(props: { handleNextPage: () => void,setTotal?:any }) {
  const { total, cartItems, addToCart } = useCart()

  const handleAddtoCart = (items: any) => {
    addToCart(items)
    console.log(React.cache)
    toast.success("Product added successfully")
  }

  return (
    <div style={{ zoom: 0.9 }} dir="ltr" className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="fixed ">
        <div className="fixed bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50"></div>
        <div className="fixed bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      </div>
      <header className="hidden sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="relative w-[120px] h-12 block">
                <img src="/22.PNG" alt="National Fish Company" className="object-contain w-full h-full" />
              </a>
            </div>

            <div className="hidden md:flex flex-1 mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full py-2 px-10 border rounded-md text-left"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
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
              className="flex items-center px-4 py-2 rounded-md bg-blue-900 text-white"
            >
              <span className="mr-2">BHD {total.toFixed(2)}</span>
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
   
      <section className=" overflow-hidden mb-6">

    
        {/* Hero Section */}
        <Header/>
        </section>

        {/* Store Info */}
        <section className="bg-white rounded-t-3xl overflow-hidden mb-6">
          <div className="relative h-48 w-full">
            <img src="/mb.jpg" alt="National Fish Company Menu" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">30% OFF</div>
              <div className="bg-blue-900 text-white px-2 py-1 rounded-md text-xs">Support Local</div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-sm flex items-center">
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
                className="mr-1"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>40 minutes</span>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-2xl font-bold mb-1">National Fish Company Menu</h2>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <div className="flex items-center mr-3">
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
                  className="mr-1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>4.9</span>
              </div>
              <span>Fresh and frozen fish and premium seafood</span>
            </div>

            <div className="grid grid-cols-4 gap-4 py-3 border-t border-b mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Delivery Time</p>
                <p className="font-semibold">40 minutes</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Rating</p>
                <p className="font-semibold">4.7</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Distance</p>
                <p className="font-semibold">15 km</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Working Hours</p>
                <p className="font-semibold text-blue-900">Open</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Order now through our website and get fast delivery service within 28 minutes.
            </p>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-8" id="cart">
          <h2 className="text-xl font-bold mb-4">Today's Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {offersData.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-60">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold text-lg">BHD {product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-700 mb-3">{product.name}</p>
                  <button
                    onClick={() =>
                      handleAddtoCart({
                        id: product.id,
                        name: product.name,
                        price: product.price.toString(),
                        img: product.image,
                      })
                    }
                    className="w-full py-1 border border-blue-900 text-blue-900 rounded-md text-sm hover:bg-blue-900 hover:text-white transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regular Products */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Other Products</h2>
          <div className="space-y-4">
            {[...allProductsData, ...offersData.slice(4)].map((product) => (
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
                    <p className="text-sm text-gray-600">{product.description || product.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">BHD {product.price.toFixed(2)}</p>
                    <button
                      onClick={() =>
                        handleAddtoCart({
                          id: product.id,
                          name: product.description || product.name,
                          price: product.price.toString(),
                          img: product.image,
                        })
                      }
                      className="px-4 py-1 border border-blue-900 text-blue-900 rounded-md text-sm hover:bg-blue-900 hover:text-white transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-white text-blue-900 w-6 h-6 rounded-full flex items-center justify-center mr-2">
            <span className="text-sm">{cartItems.length}</span>
          </div>
          <span className="font-bold">BHD {total.toFixed(2)}</span>
        </div>
        <button onClick={props.handleNextPage} className="flex items-center">
          <span className="mr-2">Go to Cart</span>
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
          <a href="#" className="mr-4">
            Terms & Conditions
          </a>
          <a href="#">Privacy Policy</a>
        </div>
        <p>© 2024 National Fish Company</p>
      </footer>
    </div>
  )
}

export default Landing
