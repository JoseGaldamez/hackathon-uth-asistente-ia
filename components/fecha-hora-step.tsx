"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Loader2 } from "lucide-react"
import type { DoctorAvailability } from "@/lib/availability-utils"

interface FechaHoraStepProps {
  data: {
    fecha: string
    hora: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
  doctorInfo: {
    doctorId: string
    doctorNombre: string
    especialidad: string
  }
}

export default function FechaHoraStep({ data, updateData, doctorInfo }: FechaHoraStepProps) {
  const [doctorAvailability, setDoctorAvailability] = useState<DoctorAvailability | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Generar fechas disponibles (próximos 30 días, excluyendo domingos)
  const getFechasDisponibles = () => {
    const fechas = []
    const hoy = new Date()

    for (let i = 1; i <= 30; i++) {
      const fecha = new Date(hoy)
      fecha.setDate(hoy.getDate() + i)

      // Excluir domingos (0 = domingo)
      if (fecha.getDay() !== 0) {
        fechas.push(fecha.toISOString().split("T")[0])
      }
    }

    return fechas
  }

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha + "T00:00:00")
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Cargar disponibilidad cuando cambie la fecha
  useEffect(() => {
    if (data.fecha && doctorInfo.doctorId) {
      loadDoctorAvailability()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fecha, doctorInfo.doctorId])

  const loadDoctorAvailability = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/doctor-availability?especialidad=${encodeURIComponent(doctorInfo.especialidad)}&fecha=${data.fecha}`,
      )

      if (!response.ok) {
        throw new Error("Error al cargar disponibilidad")
      }

      const result = await response.json()
      const doctorAvail = result.availability.find(
        (avail: DoctorAvailability) => avail.doctor.id === doctorInfo.doctorId,
      )
      setDoctorAvailability(doctorAvail || null)
    } catch (error) {
      console.error("Error loading doctor availability:", error)
      setDoctorAvailability(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTimeSelect = (hora: string) => {
    updateData({ hora })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecciona fecha y hora</h2>
        <p className="text-gray-600">
          Elige la fecha y hora que mejor se adapte a tu disponibilidad para la consulta con {doctorInfo.doctorNombre}.
        </p>
      </div>

      {/* Información del médico seleccionado */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Médico seleccionado:</h3>
              <p className="text-blue-800">
                <strong>{doctorInfo.doctorNombre}</strong> - {doctorInfo.especialidad}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Selección de Fecha */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Fecha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="fecha">Selecciona la fecha</Label>
              <Select value={data.fecha} onValueChange={(value) => updateData({ fecha: value, hora: "" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige una fecha" />
                </SelectTrigger>
                <SelectContent>
                  {getFechasDisponibles().map((fecha) => (
                    <SelectItem key={fecha} value={fecha}>
                      {formatearFecha(fecha)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Información de disponibilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5" />
              Disponibilidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!data.fecha ? (
              <p className="text-gray-500 text-center py-4">Selecciona una fecha para ver los horarios disponibles</p>
            ) : isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Cargando horarios...</span>
              </div>
            ) : !doctorAvailability || doctorAvailability.availableSlots === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay horarios disponibles para esta fecha</p>
            ) : (
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  {doctorAvailability.availableSlots} horarios disponibles
                </Badge>
                <p className="text-sm text-gray-600">Duración: {doctorAvailability.doctor.duracionCita} minutos</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Horarios Disponibles */}
      {data.fecha && doctorAvailability && doctorAvailability.availableSlots > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5" />
              Horarios Disponibles - {formatearFecha(data.fecha)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {doctorAvailability.slots.map((slot) => (
                <Button
                  key={slot.hora}
                  variant={data.hora === slot.hora ? "default" : "outline"}
                  size="sm"
                  disabled={!slot.disponible}
                  onClick={() => handleTimeSelect(slot.hora)}
                  className={`${
                    !slot.disponible
                      ? "opacity-50 cursor-not-allowed"
                      : data.hora === slot.hora
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "hover:bg-blue-50"
                  }`}
                >
                  {slot.hora}
                </Button>
              ))}
            </div>

            {data.hora && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ Horario seleccionado: {data.hora} del {formatearFecha(data.fecha)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Información adicional */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-blue-900">Información importante:</h4>
              <ul className="text-sm text-blue-800 mt-1 space-y-1">
                <li>• Los horarios mostrados están en tiempo real</li>
                <li>• Llega 15 minutos antes de tu cita</li>
                <li>• Trae tu documento de identidad y carnet de seguro médico</li>
                <li>• Para cancelar o reprogramar, llama al (555) 123-4568</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
