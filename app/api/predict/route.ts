// app/api/predict/route.ts
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get("content-type") || ""
        const res = await fetch("http://54.224.10.171:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": contentType,
            },
            body: req.body,
            duplex: "half",
        })

        // Check if the response is JSON
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
