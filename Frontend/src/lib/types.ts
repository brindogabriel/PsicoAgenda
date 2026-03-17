"use client"

export interface Patient {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  fechaNacimiento: string
  tipoTerapia: string
  notas: string
  estado: "activo" | "inactivo"
  createdAt: string
}

export type PatientFormData = Pick<
  Patient,
  "nombre" | "apellido" | "email" | "telefono"
>

export interface Appointment {
  id: string
  pacienteId: string
  pacienteNombre: string
  tipo: string
  fecha: string
  horaInicio: string
  horaFin: string
  estado: "confirmada" | "pendiente" | "cancelada"
  notas: string
}



function getTodayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function getTomorrowStr() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function getYesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    pacienteId: "1",
    pacienteNombre: "Carlos Mendez",
    tipo: "Terapia individual",
    fecha: getTodayStr(),
    horaInicio: "09:00",
    horaFin: "09:50",
    estado: "confirmada",
    notas: "",
  },
  {
    id: "a2",
    pacienteId: "2",
    pacienteNombre: "Maria Garcia",
    tipo: "Evaluacion inicial",
    fecha: getTodayStr(),
    horaInicio: "10:30",
    horaFin: "11:30",
    estado: "confirmada",
    notas: "Primera sesion de evaluacion.",
  },
  {
    id: "a3",
    pacienteId: "3",
    pacienteNombre: "Ana Lopez",
    tipo: "Seguimiento",
    fecha: getTodayStr(),
    horaInicio: "12:00",
    horaFin: "12:50",
    estado: "pendiente",
    notas: "",
  },
  {
    id: "a4",
    pacienteId: "4",
    pacienteNombre: "Jorge Ramirez",
    tipo: "Terapia de pareja",
    fecha: getTodayStr(),
    horaInicio: "15:00",
    horaFin: "15:50",
    estado: "pendiente",
    notas: "",
  },
  {
    id: "a5",
    pacienteId: "6",
    pacienteNombre: "Diego Torres",
    tipo: "Evaluacion inicial",
    fecha: getTodayStr(),
    horaInicio: "17:00",
    horaFin: "18:00",
    estado: "confirmada",
    notas: "",
  },
  {
    id: "a6",
    pacienteId: "1",
    pacienteNombre: "Carlos Mendez",
    tipo: "Terapia individual",
    fecha: getTomorrowStr(),
    horaInicio: "09:00",
    horaFin: "09:50",
    estado: "pendiente",
    notas: "",
  },
  {
    id: "a7",
    pacienteId: "3",
    pacienteNombre: "Ana Lopez",
    tipo: "Seguimiento",
    fecha: getTomorrowStr(),
    horaInicio: "11:00",
    horaFin: "11:50",
    estado: "confirmada",
    notas: "",
  },
  {
    id: "a8",
    pacienteId: "2",
    pacienteNombre: "Maria Garcia",
    tipo: "Terapia individual",
    fecha: getYesterdayStr(),
    horaInicio: "10:00",
    horaFin: "10:50",
    estado: "confirmada",
    notas: "",
  },
]
