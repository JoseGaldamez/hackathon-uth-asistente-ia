"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { User, Phone } from "lucide-react"

interface DatosPersonalesStepProps {
  data: {
    nombre: string
    apellido: string
    telefono: string
    email: string
    cedula: string
    fechaNacimiento: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void
}

export default function DatosPersonalesStep({ data, updateData }: DatosPersonalesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Datos personales</h2>
        <p className="text-gray-600">
          Completa tu información personal para finalizar el agendamiento de tu cita médica.
        </p>
      </div>

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
              <Label htmlFor="cedula">Cédula de identidad *</Label>
              <Input
                id="cedula"
                value={data.cedula}
                onChange={(e) => updateData({ cedula: e.target.value })}
                placeholder="12345678"
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
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
