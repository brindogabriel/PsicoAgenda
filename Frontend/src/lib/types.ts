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

export const mockPatients: Patient[] = [
  {
    id: "1",
    nombre: "Carlos",
    apellido: "Mendez",
    email: "carlos.mendez@email.com",
    telefono: "+54 11 5555-0001",
    fechaNacimiento: "1990-03-15",
    tipoTerapia: "Terapia individual",
    notas: "Sesiones semanales los lunes.",
    estado: "activo",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    nombre: "Maria",
    apellido: "Garcia",
    email: "maria.garcia@email.com",
    telefono: "+54 11 5555-0002",
    fechaNacimiento: "1985-07-22",
    tipoTerapia: "Evaluacion inicial",
    notas: "Primera consulta realizada. Seguimiento semanal.",
    estado: "activo",
    createdAt: "2025-02-05",
  },
  {
    id: "3",
    nombre: "Ana",
    apellido: "Lopez",
    email: "ana.lopez@email.com",
    telefono: "+54 11 5555-0003",
    fechaNacimiento: "1998-11-02",
    tipoTerapia: "Seguimiento",
    notas: "Terapia cognitivo-conductual.",
    estado: "activo",
    createdAt: "2025-01-20",
  },
  {
    id: "4",
    nombre: "Jorge",
    apellido: "Ramirez",
    email: "jorge.ramirez@email.com",
    telefono: "+54 11 5555-0004",
    fechaNacimiento: "1978-05-10",
    tipoTerapia: "Terapia de pareja",
    notas: "Sesiones quincenales.",
    estado: "activo",
    createdAt: "2025-03-01",
  },
  {
    id: "5",
    nombre: "Laura",
    apellido: "Fernandez",
    email: "laura.fernandez@email.com",
    telefono: "+54 11 5555-0005",
    fechaNacimiento: "1992-09-18",
    tipoTerapia: "Terapia individual",
    notas: "",
    estado: "inactivo",
    createdAt: "2024-11-15",
  },
  {
    id: "6",
    nombre: "Diego",
    apellido: "Torres",
    email: "diego.torres@email.com",
    telefono: "+54 11 5555-0006",
    fechaNacimiento: "2001-01-30",
    tipoTerapia: "Evaluacion inicial",
    notas: "Derivado por medico clinico.",
    estado: "activo",
    createdAt: "2025-03-10",
  },
]

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
