import { type NextRequest, NextResponse } from "next/server"
import { getDoctorsBySpecialty } from "@/lib/doctors-data"
import { getAvailabilityForSpecialty } from "@/lib/availability-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const especialidad = searchParams.get("especialidad")
    const fecha = searchParams.get("fecha")

    if (!especialidad || !fecha) {
      return NextResponse.json({ error: "Especialidad y fecha son requeridos" }, { status: 400 })
    }

    const doctors = getDoctorsBySpecialty(especialidad)
    const availability = getAvailabilityForSpecialty(doctors, fecha)

    return NextResponse.json({ availability })
  } catch (error) {
    console.error("Error getting doctor availability:", error)
    return NextResponse.json({ error: "Error al obtener disponibilidad de médicos" }, { status: 500 })
  }
}
