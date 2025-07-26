"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import SintomasStep from "@/components/sintomas-step"
import DisponibilidadStep from "@/components/disponibilidad-step"
import FechaHoraStep from "@/components/fecha-hora-step"
import DatosPersonalesStep from "@/components/datos-personales-step"
import ResumenStep from "@/components/resumen-step"
import CitaCompletadaStep from "@/components/cita-completada-step"

const steps = [
  { id: 1, title: "Síntomas", description: "Describe tus síntomas" },
  { id: 2, title: "Especialista", description: "Selecciona tu médico" },
  { id: 3, title: "Fecha y Hora", description: "Agenda tu cita" },
  { id: 4, title: "Datos Personales", description: "Información del paciente" },
  { id: 5, title: "Resumen", description: "Confirma tu cita" },
  { id: 6, title: "Completado", description: "Cita agendada" },
]

export default function AgendarCitaPage() {
  const [formData, setFormData] = useState({
    sintomas: {
      tipo: "", // "texto" o "audio"
      contenido: "",
      audioBlob: null as Blob | null,
      especialidadRecomendada: "",
      analisisCompleto: false,
      textoTranscrito: "",
    },
    disponibilidad: {
      especialidad: "",
      doctorId: "",
      doctorNombre: "",
    },
    fechaHora: {
      fecha: "",
      hora: "",
    },
    datosPersonales: {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      cedula: "",
      fechaNacimiento: "",
    },
  })

  const [currentStep, setCurrentStep] = useState(1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data },
    }))
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / 6) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SintomasStep data={formData.sintomas} updateData={(data) => updateFormData("sintomas", data)} />
      case 2:
        return (
          <DisponibilidadStep
            data={formData.disponibilidad}
            updateData={(data) => updateFormData("disponibilidad", data)}
            especialidadRecomendada={formData.sintomas.especialidadRecomendada}
          />
        )
      case 3:
        return (
          <FechaHoraStep
            data={formData.fechaHora}
            updateData={(data) => updateFormData("fechaHora", data)}
            doctorInfo={{
              doctorId: formData.disponibilidad.doctorId,
              doctorNombre: formData.disponibilidad.doctorNombre,
              especialidad: formData.disponibilidad.especialidad,
            }}
          />
        )
      case 4:
        return (
          <DatosPersonalesStep
            data={formData.datosPersonales}
            updateData={(data) => updateFormData("datosPersonales", data)}
          />
        )
      case 5:
        return (
          <ResumenStep
            formData={{
              sintomas: formData.sintomas,
              disponibilidad: {
                ...formData.disponibilidad,
                fecha: formData.fechaHora.fecha,
                hora: formData.fechaHora.hora,
              },
              datosPersonales: formData.datosPersonales,
            }}
          />
        )
      case 6:
        return <CitaCompletadaStep />
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.sintomas.analisisCompleto && formData.sintomas.especialidadRecomendada
      case 2:
        return formData.disponibilidad.doctorId && formData.disponibilidad.especialidad
      case 3:
        return formData.fechaHora.fecha && formData.fechaHora.hora
      case 4:
        return (
          formData.datosPersonales.nombre &&
          formData.datosPersonales.apellido &&
          formData.datosPersonales.telefono &&
          formData.datosPersonales.email &&
          formData.datosPersonales.cedula
        )
      case 5:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Agendar Cita Médica</h1>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle>
                Paso {currentStep} de 6: {steps[currentStep - 1].title}
              </CardTitle>
              <span className="text-sm text-gray-500">{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
        </Card>

        {/* Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-xs mt-2 text-center max-w-20">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-6">{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        {currentStep < 6 && (
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button onClick={nextStep} disabled={!canProceed()} className="bg-blue-600 hover:bg-blue-700">
              {currentStep === 5 ? "Confirmar Cita" : "Siguiente"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
