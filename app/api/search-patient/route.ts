import { type NextRequest, NextResponse } from "next/server"
import { findPatientByCedula } from "@/lib/patients-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cedula = searchParams.get("cedula")

    if (!cedula) {
      return NextResponse.json({ error: "Cédula es requerida" }, { status: 400 })
    }

    // Simular un pequeño delay para mostrar el loading
    await new Promise((resolve) => setTimeout(resolve, 500))

    const patient = findPatientByCedula(cedula)

    if (patient) {
      return NextResponse.json({ found: true, patient })
    } else {
      return NextResponse.json({ found: false, patient: null })
    }
  } catch (error) {
    console.error("Error searching patient:", error)
    return NextResponse.json({ error: "Error al buscar paciente" }, { status: 500 })
  }
}
