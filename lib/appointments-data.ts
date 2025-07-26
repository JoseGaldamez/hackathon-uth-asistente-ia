export interface Appointment {
  id: string
  doctorId: string
  fecha: string // YYYY-MM-DD
  hora: string // HH:MM
  duracion: number // en minutos
  pacienteNombre: string
  estado: "confirmada" | "cancelada" | "completada"
}

// Simulación de citas existentes
export const existingAppointments: Appointment[] = [
  {
    id: "apt001",
    doctorId: "doc001",
    fecha: "2024-01-27",
    hora: "09:00",
    duracion: 30,
    pacienteNombre: "Juan Pérez",
    estado: "confirmada",
  },
  {
    id: "apt002",
    doctorId: "doc001",
    fecha: "2024-01-27",
    hora: "09:30",
    duracion: 30,
    pacienteNombre: "María García",
    estado: "confirmada",
  },
  {
    id: "apt003",
    doctorId: "doc002",
    fecha: "2025-07-30",
    hora: "15:00",
    duracion: 60,
    pacienteNombre: "Pedro López",
    estado: "confirmada",
  },
  {
    id: "apt004",
    doctorId: "doc003",
    fecha: "2024-01-27",
    hora: "08:00",
    duracion: 45,
    pacienteNombre: "Ana Martínez",
    estado: "confirmada",
  },
  {
    id: "apt005",
    doctorId: "doc003",
    fecha: "2024-01-27",
    hora: "09:30",
    duracion: 45,
    pacienteNombre: "Carlos Ruiz",
    estado: "confirmada",
  },
  {
    id: "apt006",
    doctorId: "doc005",
    fecha: "2024-01-28",
    hora: "10:00",
    duracion: 30,
    pacienteNombre: "Laura Torres",
    estado: "confirmada",
  },
  {
    id: "apt007",
    doctorId: "doc008",
    fecha: "2024-01-29",
    hora: "14:00",
    duracion: 35,
    pacienteNombre: "Sofia Mendoza",
    estado: "confirmada",
  },
]

export function getAppointmentsByDoctorAndDate(doctorId: string, fecha: string): Appointment[] {
  return existingAppointments.filter(
    (apt) => apt.doctorId === doctorId && apt.fecha === fecha && apt.estado === "confirmada",
  )
}
