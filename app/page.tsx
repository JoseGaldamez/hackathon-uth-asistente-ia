import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, Stethoscope, Phone, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Hospital San Rafael</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="#servicios" className="text-gray-600 hover:text-blue-600">
                Servicios
              </Link>
              <Link href="#especialidades" className="text-gray-600 hover:text-blue-600">
                Especialidades
              </Link>
              <Link href="#contacto" className="text-gray-600 hover:text-blue-600">
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Tu salud es nuestra prioridad</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Brindamos atención médica de calidad con tecnología de vanguardia y un equipo de profesionales altamente
            capacitados.
          </p>
          <Link href="/agendar-cita">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Cita Médica
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Urgencias 24/7</CardTitle>
                <CardDescription>Atención médica de emergencia las 24 horas del día</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Consulta Externa</CardTitle>
                <CardDescription>Citas programadas con especialistas</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Stethoscope className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Hospitalización</CardTitle>
                <CardDescription>Cuidados médicos especializados</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Contacto</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Teléfono
                </CardTitle>
                <CardDescription>
                  Emergencias: (555) 123-4567
                  <br />
                  Citas: (555) 123-4568
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Dirección
                </CardTitle>
                <CardDescription>
                  Av. Principal 123
                  <br />
                  Ciudad, Estado 12345
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Hospital San Rafael. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

