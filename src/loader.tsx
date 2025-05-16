import React from "react"

interface FullPageLoaderProps {
    text?: string
}

export function FullPageLoader({ text = "برجى الانتظار..." }: FullPageLoaderProps) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
<img src="/rrrfc.gif"  width={90} alt=""/>            {text && <p className="mt-4 text-lg font-medium text-muted-foreground">{text}</p>}
        </div>
    )
}
