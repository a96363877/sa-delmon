import * as React from "react";

export default function FullPageLoader() {
    React.useEffect(()=>{},[])
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="inline-block relative w-16 h-16 mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#00aa4a] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-bold text-[#00aa4a]">Processing ...</p>
        </div>
      </div>
    )
  }
  