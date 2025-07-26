"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, FileText, Mic } from "lucide-react"

interface ResumenStepProps {
  formData: {
    sintomas: {
      tipo: string
      contenido: string
      audioBlob: Blob | null
    }
    disponibilidad: {
      fecha: string
      hora: string
      especialidad: string
    }
    datosPersonales: {
      nombre: string
      apellido: string
      telefono: string
      email: string
      cedula: string
      fechaNacimiento: string
    }
  }
}

export default function ResumenStep({ formData }: ResumenStepProps) {
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
        <h2 className="text-2xl font-bold mb-2">Resumen de tu cita</h2>
        <p className="text-gray-600">Revisa toda la información antes de confirmar tu cita médica.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Información de la cita */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Detalles de la cita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Especialidad:</span>
              <Badge variant="secondary">{formData.disponibilidad.especialidad}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Fecha:</span>
              <span className="font-medium">{formatearFecha(formData.disponibilidad.fecha)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Hora:</span>
              <span className="font-medium">{formData.disponibilidad.hora}</span>
            </div>
          </CardContent>
        </Card>

        {/* Información del paciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="mr-2 h-5 w-5" />
              Datos del paciente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Nombre:</span>
              <span className="font-medium">
                {formData.datosPersonales.nombre} {formData.datosPersonales.apellido}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cédula:</span>
              <span className="font-medium">{formData.datosPersonales.cedula}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Teléfono:</span>
              <span className="font-medium">{formData.datosPersonales.telefono}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{formData.datosPersonales.email}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Síntomas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            {formData.sintomas.tipo === "texto" ? (
              <FileText className="mr-2 h-5 w-5" />
            ) : (
              <Mic className="mr-2 h-5 w-5" />
            )}
            Síntomas reportados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.sintomas.tipo === "texto" ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{formData.sintomas.contenido}</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Mic className="h-4 w-4 text-blue-600" />
                <span className="text-gray-800">Audio grabado con descripción de síntomas</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Información importante */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-green-900">¿Todo está correcto?</h4>
              <p className="text-sm text-green-800 mt-1">
                Al confirmar tu cita, recibirás un correo electrónico y un mensaje de texto con los detalles. También te
                enviaremos un recordatorio 24 horas antes de tu cita.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
