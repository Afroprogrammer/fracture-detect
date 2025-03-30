// app/api/predict/route.ts
import { NextRequest, NextResponse } from "next/server"

// Use dynamic rendering for streaming requests
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get("content-type") || ""
        const res = await fetch("http://54.87.17.33:5000/history", {
            method: "POST",
            headers: {
                "Content-Type": contentType,
            },
            // Forward the request body and specify the duplex option
            body: req.body,
            duplex: "half",
        })
        const data = await res.json()
        return NextResponse.json(data, { status: res.status })
    } catch (err: any) {
        console.error("Proxy error:", err)
        return NextResponse.json(
            { error: "Proxy request failed", details: err.message },
            { status: 500 }
        )
    }
}
