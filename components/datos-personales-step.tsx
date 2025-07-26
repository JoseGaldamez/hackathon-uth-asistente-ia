"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Phone, Search, Loader2, CheckCircle, UserPlus } from "lucide-react"
import type { Patient } from "@/lib/patients-data"

interface DatosPersonalesStepProps {
  data: {
    nombre: string
    apellido: string
    telefono: string
    email: string
    cedula: string
    fechaNacimiento: string
    esNuevoPaciente?: boolean
    pacienteEncontrado?: boolean
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
}

export default function DatosPersonalesStep({ data, updateData }: DatosPersonalesStepProps) {
  const [searchingPatient, setSearchingPatient] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(data.pacienteEncontrado || data.esNuevoPaciente || false)
  const [cedulaInput, setCedulaInput] = useState(data.cedula || "")

  const searchPatient = async () => {
    if (!cedulaInput.trim()) {
      setSearchError("Por favor ingresa tu número de cédula")
      return
    }

    setSearchingPatient(true)
    setSearchError(null)

    try {
      const response = await fetch(`/api/search-patient?cedula=${encodeURIComponent(cedulaInput.trim())}`)

      if (!response.ok) {
        throw new Error("Error al buscar paciente")
      }

      const result = await response.json()

      if (result.found) {
        // Paciente encontrado - cargar sus datos
        const patient: Patient = result.patient
        updateData({
          cedula: patient.cedula,
          nombre: patient.nombre,
          apellido: patient.apellido,
          telefono: patient.telefono,
          email: patient.email,
          fechaNacimiento: patient.fechaNacimiento,
          pacienteEncontrado: true,
          esNuevoPaciente: false,
        })
        setShowForm(true)
      } else {
        // Paciente no encontrado - mostrar formulario para nuevo paciente
        updateData({
          cedula: cedulaInput.trim(),
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          fechaNacimiento: "",
          pacienteEncontrado: false,
          esNuevoPaciente: true,
        })
        setShowForm(true)
      }
    } catch (error) {
      console.error("Error searching patient:", error)
      setSearchError("Hubo un error al buscar el paciente. Por favor, intenta de nuevo.")
    } finally {
      setSearchingPatient(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchPatient()
    }
  }

  const resetSearch = () => {
    setShowForm(false)
    setCedulaInput("")
    updateData({
      cedula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      fechaNacimiento: "",
      pacienteEncontrado: false,
      esNuevoPaciente: false,
    })
    setSearchError(null)
  }

  if (!showForm) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Identificación del paciente</h2>
          <p className="text-gray-600">
            Ingresa tu número de cédula para verificar si ya tienes un historial médico con nosotros.
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Search className="mr-2 h-5 w-5" />
              Buscar paciente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cedula-search">Número de cédula</Label>
              <Input
                id="cedula-search"
                value={cedulaInput}
                onChange={(e) => setCedulaInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ej: 12345678"
                disabled={searchingPatient}
              />
            </div>

            <Button onClick={searchPatient} disabled={searchingPatient || !cedulaInput.trim()} className="w-full">
              {searchingPatient ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar paciente
                </>
              )}
            </Button>

            {searchError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{searchError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-blue-900">¿Por qué necesitamos tu cédula?</h4>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• Para verificar si ya tienes un historial médico con nosotros</li>
                  <li>• Para cargar automáticamente tus datos personales</li>
                  <li>• Para agilizar el proceso de registro</li>
                  <li>• Para mantener un registro médico completo y seguro</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Datos personales</h2>
        <p className="text-gray-600">
          {data.pacienteEncontrado
            ? "Hemos encontrado tu información. Puedes verificar y actualizar tus datos si es necesario."
            : "Completa tu información personal para finalizar el agendamiento de tu cita médica."}
        </p>
      </div>

      {/* Estado del paciente */}
      <Card className={`${data.pacienteEncontrado ? "border-green-200 bg-green-50" : "border-blue-200 bg-blue-50"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {data.pacienteEncontrado ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <UserPlus className="h-6 w-6 text-blue-600" />
              )}
              <div>
                <h4 className={`font-medium ${data.pacienteEncontrado ? "text-green-900" : "text-blue-900"}`}>
                  {data.pacienteEncontrado ? "Paciente encontrado" : "Nuevo paciente"}
                </h4>
                <p className={`text-sm ${data.pacienteEncontrado ? "text-green-800" : "text-blue-800"}`}>
                  Cédula: {data.cedula}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetSearch}>
              Cambiar cédula
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="mr-2 h-5 w-5" />
              Información básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={data.nombre}
                onChange={(e) => updateData({ nombre: e.target.value })}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                value={data.apellido}
                onChange={(e) => updateData({ apellido: e.target.value })}
                placeholder="Tu apellido"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                value={data.fechaNacimiento}
                onChange={(e) => updateData({ fechaNacimiento: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Información de contacto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Información de contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                type="tel"
                value={data.telefono}
                onChange={(e) => updateData({ telefono: e.target.value })}
                placeholder="(555) 123-4567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => updateData({ email: e.target.value })}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cedula-display">Cédula de identidad</Label>
              <Input id="cedula-display" value={data.cedula} disabled className="bg-gray-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional para pacientes encontrados */}
      {data.pacienteEncontrado && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Bienvenido de vuelta!</h4>
                <p className="text-sm text-green-800 mt-1">
                  Hemos cargado tu información desde nuestros registros. Si algún dato ha cambiado, puedes actualizarlo
                  antes de continuar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información adicional para nuevos pacientes */}
      {data.esNuevoPaciente && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <UserPlus className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Nuevo paciente</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Como es tu primera visita, necesitamos que completes toda tu información personal. Estos datos se
                  guardarán de forma segura para futuras citas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de privacidad */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-yellow-900">Privacidad y seguridad:</h4>
              <p className="text-sm text-yellow-800 mt-1">
                Toda tu información personal está protegida y será utilizada únicamente para fines médicos. Cumplimos
                con todas las normativas de protección de datos personales.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
