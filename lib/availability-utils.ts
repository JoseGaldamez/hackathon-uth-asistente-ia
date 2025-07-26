import type { Doctor } from "./doctors-data"
import { getAppointmentsByDoctorAndDate } from "./appointments-data"

export interface TimeSlot {
  hora: string
  disponible: boolean
  doctorId: string
}

export interface DoctorAvailability {
  doctor: Doctor
  slots: TimeSlot[]
  totalSlots: number
  availableSlots: number
}

export function generateTimeSlots(startTime: string, endTime: string, duration: number): string[] {
  const slots: string[] = []
  const start = new Date(`2000-01-01T${startTime}:00`)
  const end = new Date(`2000-01-01T${endTime}:00`)

  const current = new Date(start)
  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5))
    current.setMinutes(current.getMinutes() + duration)
  }

  return slots
}

export function isTimeSlotAvailable(doctorId: string, fecha: string, hora: string, duration: number): boolean {
  const appointments = getAppointmentsByDoctorAndDate(doctorId, fecha)

  const slotStart = new Date(`${fecha}T${hora}:00`)
  const slotEnd = new Date(slotStart.getTime() + duration * 60000)

  for (const appointment of appointments) {
    const aptStart = new Date(`${appointment.fecha}T${appointment.hora}:00`)
    const aptEnd = new Date(aptStart.getTime() + appointment.duracion * 60000)

    // Verificar si hay solapamiento
    if (slotStart < aptEnd && slotEnd > aptStart) {
      return false
    }
  }

  return true
}

export function getDoctorAvailability(doctor: Doctor, fecha: string): DoctorAvailability {
  const date = new Date(fecha + "T00:00:00")
  const dayOfWeek = date.getDay()

  // Verificar si el doctor trabaja este día
  if (!doctor.diasTrabajo.includes(dayOfWeek)) {
    return {
      doctor,
      slots: [],
      totalSlots: 0,
      availableSlots: 0,
    }
  }

  const timeSlots = generateTimeSlots(doctor.horarioInicio, doctor.horarioFin, doctor.duracionCita)

  const slots: TimeSlot[] = timeSlots.map((hora) => ({
    hora,
    disponible: isTimeSlotAvailable(doctor.id, fecha, hora, doctor.duracionCita),
    doctorId: doctor.id,
  }))

  return {
    doctor,
    slots,
    totalSlots: slots.length,
    availableSlots: slots.filter((slot) => slot.disponible).length,
  }
}

export function getAvailabilityForSpecialty(doctors: Doctor[], fecha: string): DoctorAvailability[] {
  return doctors
    .map((doctor) => getDoctorAvailability(doctor, fecha))
    .filter((availability) => availability.availableSlots > 0)
    .sort((a, b) => b.availableSlots - a.availableSlots)
}
