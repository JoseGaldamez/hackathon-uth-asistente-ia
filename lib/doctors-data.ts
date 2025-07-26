export interface Doctor {
  id: string
  nombre: string
  apellido: string
  especialidad: string
  experiencia: number
  horarioInicio: string
  horarioFin: string
  diasTrabajo: number[] // 1=Lunes, 2=Martes, etc. 0=Domingo
  duracionCita: number // en minutos
  foto?: string
}

export const doctorsDatabase: Doctor[] = [
  // Medicina General
  {
    id: "doc001",
    nombre: "Dr. Carlos",
    apellido: "Rodríguez",
    especialidad: "Medicina General",
    experiencia: 15,
    horarioInicio: "08:00",
    horarioFin: "16:00",
    diasTrabajo: [1, 2, 3, 4, 5], // Lunes a Viernes
    duracionCita: 60,
  },
  {
    id: "doc002",
    nombre: "Dra. María",
    apellido: "González",
    especialidad: "Neumología",
    experiencia: 12,
    horarioInicio: "13:00",
    horarioFin: "17:00",
    diasTrabajo: [1, 2, 3, 4, 5], 
    duracionCita: 60,
  },

  // Cardiología
  {
    id: "doc003",
    nombre: "Dr. Roberto",
    apellido: "Martínez",
    especialidad: "Cardiología",
    experiencia: 20,
    horarioInicio: "08:00",
    horarioFin: "14:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 45,
  },
  {
    id: "doc004",
    nombre: "Dra. Ana",
    apellido: "López",
    especialidad: "Cardiología",
    experiencia: 18,
    horarioInicio: "14:00",
    horarioFin: "18:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 45,
  },

  // Dermatología
  {
    id: "doc005",
    nombre: "Dr. Luis",
    apellido: "Fernández",
    especialidad: "Dermatología",
    experiencia: 10,
    horarioInicio: "09:00",
    horarioFin: "15:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 30,
  },
  {
    id: "doc006",
    nombre: "Dra. Carmen",
    apellido: "Ruiz",
    especialidad: "Neumología",
    experiencia: 14,
    horarioInicio: "15:00",
    horarioFin: "19:00",
    diasTrabajo: [1, 2, 3, 4, 5, 6],
    duracionCita: 30,
  },

  // Gastroenterología
  {
    id: "doc007",
    nombre: "Dr. Miguel",
    apellido: "Torres",
    especialidad: "Gastroenterología",
    experiencia: 16,
    horarioInicio: "08:00",
    horarioFin: "14:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 40,
  },

  // Ginecología
  {
    id: "doc008",
    nombre: "Dra. Patricia",
    apellido: "Morales",
    especialidad: "Ginecología",
    experiencia: 13,
    horarioInicio: "08:00",
    horarioFin: "16:00",
    diasTrabajo: [1, 2, 3, 4, 5, 6],
    duracionCita: 35,
  },
  {
    id: "doc009",
    nombre: "Dra. Isabel",
    apellido: "Vargas",
    especialidad: "Ginecología",
    experiencia: 19,
    horarioInicio: "14:00",
    horarioFin: "18:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 35,
  },

  // Neurología
  {
    id: "doc010",
    nombre: "Dr. Fernando",
    apellido: "Castro",
    especialidad: "Neurología",
    experiencia: 22,
    horarioInicio: "09:00",
    horarioFin: "15:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 50,
  },

  // Oftalmología
  {
    id: "doc011",
    nombre: "Dr. Andrés",
    apellido: "Herrera",
    especialidad: "Oftalmología",
    experiencia: 11,
    horarioInicio: "08:00",
    horarioFin: "16:00",
    diasTrabajo: [1, 2, 3, 4, 5, 6],
    duracionCita: 25,
  },
  {
    id: "doc012",
    nombre: "Dra. Lucía",
    apellido: "Jiménez",
    especialidad: "Oftalmología",
    experiencia: 9,
    horarioInicio: "14:00",
    horarioFin: "18:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 25,
  },

  // Ortopedia
  {
    id: "doc013",
    nombre: "Dr. Ricardo",
    apellido: "Mendoza",
    especialidad: "Ortopedia",
    experiencia: 17,
    horarioInicio: "08:00",
    horarioFin: "14:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 40,
  },
  {
    id: "doc014",
    nombre: "Dr. Javier",
    apellido: "Peña",
    especialidad: "Ortopedia",
    experiencia: 14,
    horarioInicio: "15:00",
    horarioFin: "19:00",
    diasTrabajo: [1, 2, 3, 4, 5, 6],
    duracionCita: 40,
  },

  // Pediatría
  {
    id: "doc015",
    nombre: "Dra. Elena",
    apellido: "Ramírez",
    especialidad: "Pediatría",
    experiencia: 16,
    horarioInicio: "08:00",
    horarioFin: "16:00",
    diasTrabajo: [1, 2, 3, 4, 5, 6],
    duracionCita: 30,
  },
  {
    id: "doc016",
    nombre: "Dr. Pablo",
    apellido: "Silva",
    especialidad: "Pediatría",
    experiencia: 12,
    horarioInicio: "14:00",
    horarioFin: "18:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 30,
  },

  // Psiquiatría
  {
    id: "doc017",
    nombre: "Dr. Sergio",
    apellido: "Ortega",
    especialidad: "Psiquiatría",
    experiencia: 18,
    horarioInicio: "09:00",
    horarioFin: "17:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 60,
  },

  // Urología
  {
    id: "doc018",
    nombre: "Dr. Alejandro",
    apellido: "Vega",
    especialidad: "Urología",
    experiencia: 15,
    horarioInicio: "08:00",
    horarioFin: "14:00",
    diasTrabajo: [1, 2, 3, 4, 5],
    duracionCita: 35,
  },
  {
    id: "doc019",
    nombre: "Dr. Daniel",
    apellido: "Campos",
    especialidad: "Urología",
    experiencia: 13,
    horarioInicio: "15:00",
    horarioFin: "19:00",
    diasTrabajo: [1, 2, 3, 4, 5, 6],
    duracionCita: 35,
  },
]

export function getDoctorsBySpecialty(specialty: string): Doctor[] {
  return doctorsDatabase.filter((doctor) => doctor.especialidad === specialty)
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctorsDatabase.find((doctor) => doctor.id === id)
}
