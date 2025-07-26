export interface Patient {
  cedula: string
  nombre: string
  apellido: string
  telefono: string
  email: string
  fechaNacimiento: string
  direccion?: string
  contactoEmergencia?: string
  telefonoEmergencia?: string
  ultimaVisita?: string
  historialMedico?: string
}

// Base de datos simulada de pacientes existentes
export const patientsDatabase: Patient[] = [
  {
    cedula: "12345678",
    nombre: "Juan Carlos",
    apellido: "Pérez González",
    telefono: "(555) 123-4567",
    email: "juan.perez@email.com",
    fechaNacimiento: "1985-03-15",
    direccion: "Calle Principal 123, Ciudad",
    contactoEmergencia: "María Pérez",
    telefonoEmergencia: "(555) 123-4568",
    ultimaVisita: "2023-11-15",
    historialMedico: "Hipertensión, Diabetes Tipo 2",
  },
  {
    cedula: "87654321",
    nombre: "María Elena",
    apellido: "García López",
    telefono: "(555) 987-6543",
    email: "maria.garcia@email.com",
    fechaNacimiento: "1990-07-22",
    direccion: "Avenida Central 456, Ciudad",
    contactoEmergencia: "Carlos García",
    telefonoEmergencia: "(555) 987-6544",
    ultimaVisita: "2023-12-08",
  },
  {
    cedula: "11223344",
    nombre: "Pedro Antonio",
    apellido: "Martínez Ruiz",
    telefono: "(555) 456-7890",
    email: "pedro.martinez@email.com",
    fechaNacimiento: "1978-12-03",
    direccion: "Plaza Mayor 789, Ciudad",
    contactoEmergencia: "Ana Martínez",
    telefonoEmergencia: "(555) 456-7891",
    ultimaVisita: "2023-10-20",
  },
  {
    cedula: "55667788",
    nombre: "Ana Sofía",
    apellido: "López Fernández",
    telefono: "(555) 321-6547",
    email: "ana.lopez@email.com",
    fechaNacimiento: "1992-05-18",
    direccion: "Calle Secundaria 321, Ciudad",
    contactoEmergencia: "Luis López",
    telefonoEmergencia: "(555) 321-6548",
    ultimaVisita: "2023-09-12",
  },
  {
    cedula: "99887766",
    nombre: "Carlos Eduardo",
    apellido: "Rodríguez Silva",
    telefono: "(555) 654-3210",
    email: "carlos.rodriguez@email.com",
    fechaNacimiento: "1988-01-30",
    direccion: "Avenida Norte 654, Ciudad",
    contactoEmergencia: "Elena Rodríguez",
    telefonoEmergencia: "(555) 654-3211",
    ultimaVisita: "2023-08-25",
  },
]

export function findPatientByCedula(cedula: string): Patient | null {
  return patientsDatabase.find((patient) => patient.cedula === cedula) || null
}
