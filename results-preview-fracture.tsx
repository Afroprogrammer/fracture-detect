"use client"

import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ResultsPreviewFracture() {
  // This is a preview component to show how the results would look
  const result = {
    prediction: "fractured",
    confidence: 0.9234567890123456,
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Analysis Results Preview</h1>
        <p className="text-muted-foreground">This is how the results would appear after analyzing an X-ray</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Uploaded Image</h3>
            </div>

            <div className="relative aspect-square max-h-[400px] overflow-hidden rounded-md bg-muted">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="X-ray preview"
                className="object-contain w-full h-full"
              />
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-1">arm_xray.jpg (1.78 MB)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Analysis Results</h3>
            <div className="p-4 bg-muted rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span className="font-medium">Fracture detected</span>
              </div>
              <p className="text-sm text-muted-foreground">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
              <div className="mt-4 text-sm">
                <p>
                  The analysis indicates a potential fracture in the X-ray image. Please consult with a medical
                  professional for a definitive diagnosis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

