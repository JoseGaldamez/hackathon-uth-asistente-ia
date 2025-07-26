"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mic, MicOff, Play, Pause, FileText, Brain, Loader2 } from "lucide-react"

interface SintomasStepProps {
  data: {
    tipo: string
    contenido: string
    audioBlob: Blob | null
    especialidadRecomendada?: string
    analisisCompleto?: boolean
    textoTranscrito?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
}

export default function SintomasStep({ data, updateData }: SintomasStepProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    especialidad: string
    confianza: number
    razonamiento: string
  } | null>(null)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" })
        updateData({ audioBlob, tipo: "audio" })
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("No se pudo acceder al micrófono. Por favor, permite el acceso al micrófono.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const playAudio = () => {
    if (data.audioBlob) {
      const audioUrl = URL.createObjectURL(data.audioBlob)
      audioRef.current = new Audio(audioUrl)
      audioRef.current.play()
      setIsPlaying(true)

      audioRef.current.onended = () => {
        setIsPlaying(false)
        URL.revokeObjectURL(audioUrl)
      }
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true)
    setAnalysisError(null)

    try {
      let symptomsText = ""

      // Si es audio, primero convertir a texto
      if (data.tipo === "audio" && data.audioBlob) {
        const formData = new FormData()
        formData.append("audio", data.audioBlob, "symptoms.wav")

        const transcriptionResponse = await fetch("/api/transcribe-audio", {
          method: "POST",
          body: formData,
        })

        if (!transcriptionResponse.ok) {
          throw new Error("Error al transcribir el audio")
        }

        const transcriptionData = await transcriptionResponse.json()
        symptomsText = transcriptionData.text
      } else {
        symptomsText = data.contenido
      }

      console.log("Analizando síntomas:", symptomsText);
      

      // Analizar síntomas con OpenAI
      const analysisResponse = await fetch("/api/analyze-syntoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: symptomsText }),
      })

      if (!analysisResponse.ok) {
        throw new Error("Error al analizar los síntomas")
      }

      const result = await analysisResponse.json()
      setAnalysisResult(result)

      // Actualizar los datos con la especialidad recomendada
      updateData({
        especialidadRecomendada: result.especialidad,
        analisisCompleto: true,
        textoTranscrito: data.tipo === "audio" ? symptomsText : undefined,
      })
    } catch (error) {
      console.error("Error analyzing symptoms:", error)
      setAnalysisError("Hubo un error al analizar los síntomas. Por favor, intenta de nuevo.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Describe tus síntomas</h2>
        <p className="text-gray-600">
          Puedes escribir tus síntomas o grabar un mensaje de audio para que nuestros médicos puedan entender mejor tu
          situación.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Opción de Texto */}
        <Card className={`cursor-pointer transition-all ${data.tipo === "texto" ? "ring-2 ring-blue-500" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Escribir síntomas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant={data.tipo === "texto" ? "default" : "outline"}
                onClick={() => updateData({ tipo: "texto", audioBlob: null })}
                className="w-full"
              >
                Seleccionar esta opción
              </Button>

              {data.tipo === "texto" && (
                <div className="space-y-2">
                  <Label htmlFor="sintomas-texto">Describe tus síntomas</Label>
                  <Textarea
                    id="sintomas-texto"
                    placeholder="Describe detalladamente los síntomas que presentas, cuándo comenzaron, intensidad, etc."
                    value={data.contenido}
                    onChange={(e) => updateData({ contenido: e.target.value })}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-sm text-gray-500">{data.contenido.length}/500 caracteres</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Opción de Audio */}
        <Card className={`cursor-pointer transition-all ${data.tipo === "audio" ? "ring-2 ring-blue-500" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mic className="mr-2 h-5 w-5" />
              Grabar audio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant={data.tipo === "audio" ? "default" : "outline"}
                onClick={() => updateData({ tipo: "audio", contenido: "" })}
                className="w-full"
              >
                Seleccionar esta opción
              </Button>

              {data.tipo === "audio" && (
                <div className="space-y-4">
                  <div className="text-center">
                    {!isRecording && !data.audioBlob && (
                      <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700">
                        <Mic className="mr-2 h-4 w-4" />
                        Comenzar grabación
                      </Button>
                    )}

                    {isRecording && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-600 font-medium">Grabando... {formatTime(recordingTime)}</span>
                        </div>
                        <Button onClick={stopRecording} variant="outline">
                          <MicOff className="mr-2 h-4 w-4" />
                          Detener grabación
                        </Button>
                      </div>
                    )}

                    {data.audioBlob && !isRecording && (
                      <div className="space-y-2">
                        <p className="text-green-600 font-medium">✓ Audio grabado exitosamente</p>
                        <div className="flex justify-center space-x-2">
                          <Button onClick={isPlaying ? pauseAudio : playAudio} variant="outline" size="sm">
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            {isPlaying ? "Pausar" : "Reproducir"}
                          </Button>
                          <Button onClick={() => updateData({ audioBlob: null })} variant="outline" size="sm">
                            Grabar de nuevo
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 text-center">
                    <p>• Habla claramente y describe tus síntomas</p>
                    <p>• Menciona cuándo comenzaron</p>
                    <p>• Indica la intensidad del dolor (1-10)</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botón de análisis */}
      {data.tipo && (data.contenido || data.audioBlob) && !data.analisisCompleto && (
        <Card className="mt-6">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Análisis de síntomas con IA</h3>
            <p className="text-gray-600 mb-4">
              Nuestro sistema de inteligencia artificial analizará tus síntomas para recomendarte la especialidad médica
              más adecuada.
            </p>
            <Button onClick={analyzeSymptoms} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analizando síntomas...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Analizar síntomas con IA
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resultados del análisis */}
      {analysisResult && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Brain className="mr-2 h-5 w-5" />
              Análisis completado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-900">Especialidad recomendada:</h4>
                <p className="text-lg font-bold text-green-800">{analysisResult.especialidad}</p>
              </div>

              <div>
                <h4 className="font-semibold text-green-900">Nivel de confianza:</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${analysisResult.confianza}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{analysisResult.confianza}%</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-green-900">Razonamiento:</h4>
                <p className="text-green-800">{analysisResult.razonamiento}</p>
              </div>

              {data.textoTranscrito && (
                <div>
                  <h4 className="font-semibold text-green-900">Transcripción del audio:</h4>
                  <p className="text-sm text-green-700 bg-white p-3 rounded border">{data.textoTranscrito}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error del análisis */}
      {analysisError && (
        <Alert className="mt-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{analysisError}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
