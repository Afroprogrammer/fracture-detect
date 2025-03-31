"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type AnalysisResult = {
  prediction: string
  confidence: number
} | null

export default function AnalysisArea() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      handleFile(droppedFile)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG)")
      return
    }

    setFile(file)
    setError(null)
    setResult(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setIsAnalyzing(false)
    setProgress(0)
    setResult(null)
    setError(null)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const startAnalysis = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setProgress(0)
    setError(null)
    setResult(null)

    // Create form data
    const formData = new FormData()
    formData.append("image", file)

    try {
      // Simulate progress while making the actual API call
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5
          return newProgress < 90 ? newProgress : prev
        })
      }, 200)

      // Use the provided API endpoint
      const apiUrl = "http://54.87.17.33:5000/predict"

      console.log("Sending request to:", apiUrl)
      console.log("File being sent:", file.name, file.type, file.size)

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      // Parse the JSON response
      const data = await response.json()
      console.log("Raw response:", data)

      setProgress(100)
      setResult({
        prediction: data.prediction,
        confidence: data.confidence,
      })
    } catch (err) {
      console.error("Error during analysis:", err)
      setError(err instanceof Error ? err.message : "An error occurred during analysis")
      setProgress(0)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleBrowseClick = () => {
    // Programmatically click the file input
    fileInputRef.current?.click()
  }

  return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 gradient-text">Analyze X-Ray for Fracture</h1>
          <p className="text-muted-foreground">Upload an X-ray image to detect potential fractures using AI analysis</p>
        </div>

        {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {!file ? (
            <Card
                className={`border-2 border-dashed ${isDragging ? "border-primary" : "border-muted"} hover:border-primary transition-colors shadow-sm`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full gradient-bg p-4 mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2">Drag & Drop X-Ray Image</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                  Drop your X-ray image here, or click to browse files (Supported formats: JPEG, PNG)
                </p>
                <div>
                  <input
                      type="file"
                      id="file-upload"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png"
                      onChange={handleFileInput}
                  />
                  <Button
                      variant="outline"
                      onClick={handleBrowseClick}
                      type="button"
                      className="border-primary text-primary hover:bg-primary/10"
                  >
                    Browse Files
                  </Button>
                </div>
              </CardContent>
            </Card>
        ) : (
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Uploaded Image</h3>
                    <Button variant="ghost" size="icon" onClick={clearFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="relative aspect-square max-h-[400px] overflow-hidden rounded-md bg-muted">
                    {preview && (
                        <img
                            src={preview || "/placeholder.svg"}
                            alt="X-ray preview"
                            className="object-contain w-full h-full"
                        />
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>

                    {isAnalyzing ? (
                        <div className="space-y-2">
                          <Progress
                              value={progress}
                              className="h-2 bg-muted"
                              indicatorClassName="bg-gradient-to-r from-primary to-secondary"
                          />
                          <p className="text-sm text-muted-foreground">Analyzing... {progress}%</p>
                        </div>
                    ) : (
                        <Button
                            className="mt-4 w-full bg-primary hover:bg-primary/90"
                            onClick={startAnalysis}
                            disabled={isAnalyzing}
                        >
                          Start Analysis
                        </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {result && (
                  <Card className="shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-medium mb-4">Analysis Results</h3>
                      <div className="p-4 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          {result.prediction.includes("not") ? (
                              <CheckCircle2 className="h-5 w-5 text-secondary" />
                          ) : (
                              <AlertCircle className="h-5 w-5 text-destructive" />
                          )}
                          <span className="font-medium">
                      {result.prediction.includes("not") ? "No fracture detected" : "Fracture detected"}
                    </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Confidence:{" "}
                          <span className="font-medium text-primary">{(result.confidence * 100).toFixed(2)}%</span>
                        </p>
                        <div className="mt-4 text-sm">
                          <p>
                            {result.prediction.includes("not")
                                ? "The analysis indicates no fracture in the X-ray image. However, please consult with a medical professional for a definitive diagnosis."
                                : "The analysis indicates a potential fracture in the X-ray image. Please consult with a medical professional for a definitive diagnosis."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              )}
            </div>
        )}
      </div>
  )
}

