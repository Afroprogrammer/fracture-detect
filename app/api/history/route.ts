// app/history/route.ts
import { NextRequest, NextResponse } from "next/server"

// Use dynamic rendering for streaming requests
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
    try {
        const contentType = req.headers.get("content-type") || ""
        const res = await fetch("/api/predict", {
            method: "GET",
            headers: {
                "Content-Type": contentType,
            },
            // Forward the request body and specify the duplex option
            body: req.body,
            duplex: "half",
        })

        const resContentType = res.headers.get("content-type") || ""
        if (resContentType.includes("application/json")) {
            const data = await res.json()
            return NextResponse.json(data, { status: res.status })
        } else {
            const text = await res.text()
            console.error("Non-JSON response from external API:", text)
            return NextResponse.json(
                { error: "Non-JSON response", data: text },
                { status: res.status }
            )
        }
    } catch (err: any) {
        console.error("Proxy error:", err)
        return NextResponse.json(
            { error: "Proxy request failed", details: err.message },
            { status: 500 }
        )
    }
}
