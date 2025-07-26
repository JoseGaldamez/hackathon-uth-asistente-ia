"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User } from "lucide-react"

interface DisponibilidadStepProps {
  data: {
    fecha: string
    hora: string
    especialidad: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
}

const especialidades = [
  "Medicina General",
  "Cardiología",
  "Dermatología",
  "Gastroenterología",
  "Ginecología",
  "Neurología",
  "Oftalmología",
  "Ortopedia",
  "Pediatría",
  "Psiquiatría",
  "Urología",
]

const horasDisponibles = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function DisponibilidadStep({ data, updateData }: DisponibilidadStepProps) {
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecciona fecha y hora</h2>
        <p className="text-gray-600">
          Elige la especialidad médica, fecha y hora que mejor se adapte a tu disponibilidad.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Especialidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="mr-2 h-5 w-5" />
              Especialidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="especialidad">Selecciona la especialidad</Label>
              <Select value={data.especialidad} onValueChange={(value) => updateData({ especialidad: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige una especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {especialidades.map((esp) => (
                    <SelectItem key={esp} value={esp}>
                      {esp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Fecha */}
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
              <Select value={data.fecha} onValueChange={(value) => updateData({ fecha: value })}>
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

        {/* Hora */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5" />
              Hora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="hora">Selecciona la hora</Label>
              <Select value={data.hora} onValueChange={(value) => updateData({ hora: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige una hora" />
                </SelectTrigger>
                <SelectContent>
                  {horasDisponibles.map((hora) => (
                    <SelectItem key={hora} value={hora}>
                      {hora}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-blue-900">Información importante:</h4>
              <ul className="text-sm text-blue-800 mt-1 space-y-1">
                <li>• Las citas están disponibles de lunes a sábado</li>
                <li>• Llega 15 minutos antes de tu cita</li>
                <li>• Trae tu documento de identidad y carnet de seguro médico</li>
                <li>• Si necesitas cancelar, hazlo con al menos 24 horas de anticipación</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
