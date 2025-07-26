"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Phone, Mail, Home } from "lucide-react"
import Link from "next/link"

export default function CitaCompletadaStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="text-3xl font-bold text-green-700">¡Cita agendada exitosamente!</h2>
        <p className="text-gray-600 max-w-md">
          Tu cita médica ha sido confirmada. Hemos enviado los detalles a tu correo electrónico y teléfono.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Número de confirmación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg">
            <span className="text-2xl font-bold text-blue-600">
              HSR-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Guarda este número para futuras referencias</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-4 text-center">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium">Confirmación por email</h4>
            <p className="text-sm text-gray-600">Revisa tu bandeja de entrada</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium">Recordatorio SMS</h4>
            <p className="text-sm text-gray-600">24 horas antes de tu cita</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium">Agregar al calendario</h4>
            <p className="text-sm text-gray-600">No olvides tu cita</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">Instrucciones importantes:</h4>
          <ul className="text-sm text-blue-800 text-left space-y-1">
            <li>• Llega 15 minutos antes de tu cita</li>
            <li>• Trae tu documento de identidad y carnet de seguro médico</li>
            <li>• Si tienes exámenes médicos previos, tráelos contigo</li>
            <li>• Para cancelar o reprogramar, llama al (555) 123-4568</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button variant="outline" className="flex items-center bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
        <Link href="/agendar-cita">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar otra cita
          </Button>
        </Link>
      </div>
    </div>
  )
}
