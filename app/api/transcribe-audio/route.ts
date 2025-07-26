import { type NextRequest, NextResponse } from "next/server"
import { experimental_transcribe as transcribe } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Convertir el archivo a ArrayBuffer y luego a Buffer
     const audioBuffer = await audioFile.arrayBuffer()
    const audioUint8Array = new Uint8Array(audioBuffer)

    // Transcribir el audio usando Whisper
    console.log("Iniciando transcripción con Whisper...")
    const transcriptionResult = await transcribe({
      model: openai.transcription("whisper-1"),
      audio: audioUint8Array,
      providerOptions: {
        openai: {
          language: "es", // Especificar español para mejor precisión
          temperature: 0.2, // Menor temperatura para más precisión
        },
      },
    })

    const transcriptionText = transcriptionResult.text

    return NextResponse.json({ text: transcriptionText, success: true })
  } catch (error) {
    console.error("Error transcribing audio:", error)
    return NextResponse.json({ error: "Error al transcribir el audio" }, { status: 500 })
  }
}
