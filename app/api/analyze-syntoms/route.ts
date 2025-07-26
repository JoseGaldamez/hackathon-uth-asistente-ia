import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const analysisSchema = z.object({
  especialidad: z.string().describe("La especialidad médica recomendada"),
  confianza: z.number().min(0).max(100).describe("Nivel de confianza del 0 al 100"),
  razonamiento: z.string().describe("Explicación del por qué se recomienda esta especialidad"),
})

const especialidadesDisponibles = [
  "Medicina General",
  "Cardiología",
  "Dermatología",
  "Gastroenterología",
  "Ginecología",
  "Neurología",
  "Neumología",
  "Oftalmología",
  "Ortopedia",
  "Pediatría",
  "Psiquiatría",
  "Urología",
]

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json()

    if (!symptoms || symptoms.trim().length === 0) {
      return NextResponse.json({ error: "No symptoms provided" }, { status: 400 })
    }

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: analysisSchema,
      prompt: `
        Eres un asistente médico especializado en triaje. Analiza los siguientes síntomas y determina la especialidad médica más apropiada.

        ESPECIALIDADES DISPONIBLES:
        ${especialidadesDisponibles.join(", ")}

        SÍNTOMAS DEL PACIENTE:
        "${symptoms}"

        INSTRUCCIONES:
        1. Analiza cuidadosamente los síntomas descritos
        2. Selecciona la especialidad más apropiada de la lista disponible
        3. Si los síntomas son generales o no específicos, recomienda "Medicina General"
        4. Proporciona un nivel de confianza basado en qué tan específicos son los síntomas
        5. Explica brevemente por qué recomiendas esa especialidad

        IMPORTANTE: 
        - Solo usa especialidades de la lista proporcionada
        - Si hay dudas, es mejor derivar a Medicina General
        - Sé conservador en el nivel de confianza
        - No hagas diagnósticos, solo recomienda la especialidad apropiada
      `,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("Error analyzing symptoms:", error)
    return NextResponse.json({ error: "Error al analizar los síntomas" }, { status: 500 })
  }
}
