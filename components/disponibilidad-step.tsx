"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Stethoscope, Clock, Calendar, Star } from "lucide-react"
import { getDoctorsBySpecialty } from "@/lib/doctors-data"
import type { Doctor } from "@/lib/doctors-data"

interface DisponibilidadStepProps {
  data: {
    especialidad: string
    doctorId?: string
    doctorNombre?: string
    doctorEmail?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
  especialidadRecomendada?: string
}

export default function DisponibilidadStep({ data, updateData, especialidadRecomendada }: DisponibilidadStepProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<string>(data.doctorId || "")

  // Establecer especialidad recomendada por defecto
  useEffect(() => {
    if (especialidadRecomendada && !data.especialidad) {
      updateData({ especialidad: especialidadRecomendada })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [especialidadRecomendada])

  // Cargar médicos cuando cambie la especialidad
  useEffect(() => {
    if (data.especialidad) {
      const specialtyDoctors = getDoctorsBySpecialty(data.especialidad)
      setDoctors(specialtyDoctors)
    }
  }, [data.especialidad])

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor.id)
    updateData({
      doctorId: doctor.id,
      doctorNombre: `${doctor.nombre} ${doctor.apellido}`,
      doctorEmail: doctor.doctorEmail,
    })
  }

  const getDiasTrabajoTexto = (diasTrabajo: number[]) => {
    const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    return diasTrabajo.map((dia) => dias[dia]).join(", ")
  }

  const getExperienciaColor = (experiencia: number) => {
    if (experiencia >= 20) return "text-green-600"
    if (experiencia >= 15) return "text-blue-600"
    if (experiencia >= 10) return "text-yellow-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecciona tu médico especialista</h2>
        <p className="text-gray-600">
          Elige el médico de {data.especialidad || especialidadRecomendada} que prefieras para tu consulta.
        </p>
      </div>

      {/* Especialidad seleccionada */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">
                Especialidad: {data.especialidad || especialidadRecomendada}
              </h3>
              <p className="text-sm text-blue-700">
                {especialidadRecomendada && data.especialidad === especialidadRecomendada
                  ? "Especialidad recomendada por nuestro análisis de IA"
                  : "Especialidad seleccionada"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de médicos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <User className="mr-2 h-5 w-5" />
          Médicos Disponibles ({doctors.length})
        </h3>

        {doctors.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No hay médicos disponibles para esta especialidad.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedDoctor === doctor.id
                    ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => handleDoctorSelect(doctor)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {doctor.nombre.charAt(0)}
                          {doctor.apellido.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">
                            {doctor.nombre} {doctor.apellido}
                          </h4>
                          <p className="text-blue-600 font-medium">{doctor.especialidad}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-medium ${getExperienciaColor(doctor.experiencia)}`}>
                            {doctor.experiencia} años de experiencia
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">
                            {doctor.horarioInicio} - {doctor.horarioFin}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{getDiasTrabajoTexto(doctor.diasTrabajo)}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className="text-xs">
                            Cita: {doctor.duracionCita} min
                          </Badge>
                          {doctor.experiencia >= 15 && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Especialista Senior
                            </Badge>
                          )}
                        </div>

                        <Button
                          variant={selectedDoctor === doctor.id ? "default" : "outline"}
                          size="sm"
                          className={
                            selectedDoctor === doctor.id
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "hover:bg-blue-50 hover:border-blue-300"
                          }
                        >
                          {selectedDoctor === doctor.id ? "Seleccionado" : "Seleccionar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Información del médico seleccionado */}
      {selectedDoctor && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <h4 className="font-medium text-green-900">Médico seleccionado:</h4>
                <p className="text-green-800">
                  <strong>{data.doctorNombre}</strong> - {data.especialidad}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  En el siguiente paso podrás seleccionar la fecha y hora para tu cita.
                </p>
              </div>
            </div>
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
                <li>• Todos nuestros médicos están certificados y colegiados</li>
                <li>• Puedes cambiar de médico hasta 24 horas antes de tu cita</li>
                <li>• Los horarios mostrados son los horarios generales de consulta</li>
                <li>• En el siguiente paso verás la disponibilidad específica de fechas y horas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
