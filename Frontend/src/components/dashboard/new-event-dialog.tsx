'use client'

import { useEffect, type ChangeEvent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { X, Send } from 'lucide-react'
import type { Patient, Appointment } from '@/lib/types'

const eventSchema = Yup.object({
  titulo: Yup.string().when('pacienteId', {
    is: (val: string) => !!val,
    then: schema => schema.required('El titulo es obligatorio'),
  }),
  pacienteId: Yup.string().required('Selecciona un paciente'),
  fecha: Yup.string().required('La fecha es obligatoria'),
  horaInicio: Yup.string().required('La hora de inicio es obligatoria'),
  duracion: Yup.number().required(),
  tipo: Yup.string().required('El tipo de sesion es obligatorio'),
  enviarInvitacion: Yup.boolean(),
  repetir: Yup.boolean(),
  frecuencia: Yup.string(),
  diasSemana: Yup.array(),
  fechaFinRepeticion: Yup.string(),
})

export interface NewEventValues {
  horaFin: string
  notas: string
  titulo: string
  pacienteId: string
  fecha: string
  horaInicio: string
  duracion: number
  enviarInvitacion: boolean
  repetir: boolean
  tipo: string
  frecuencia: string
  diasSemana: string[]
  fechaFinRepeticion: string
}

type NewEventInitialData = {
  fecha: string
  hora: string
}

interface NewEventDialogProps {
  open: boolean
  onClose: () => void
  patients: Patient[]
  defaultDate?: string
  defaultTime?: string
  initialData?: NewEventInitialData | null
  onSave: (values: NewEventValues) => void | Promise<void>
  editingAppointment?: Appointment | null
}

const inputBase =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-colors'

const selectBase =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-colors'

const calcularHoraFin = (horaInicio: string, duracion: number) => {
  const [h, m] = horaInicio.split(':').map(Number)
  const date = new Date()
  date.setHours(h)
  date.setMinutes(m + duracion)
  return date.toTimeString().slice(0, 5)
}

export function NewEventDialog({
  open,
  onClose,
  patients,
  defaultDate,
  defaultTime,
  initialData,
  onSave,
  editingAppointment,
}: NewEventDialogProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const resolvedDate =
    editingAppointment?.fecha ?? initialData?.fecha ?? defaultDate ?? ''
  const resolvedTime =
    editingAppointment?.horaInicio ?? initialData?.hora ?? defaultTime ?? '09:00'

  const initialValues: NewEventValues = {
    titulo: editingAppointment
      ? `Terapia - ${editingAppointment.pacienteNombre}`
      : '',
    pacienteId: editingAppointment
      ? String(editingAppointment.pacienteId)
      : '',
    fecha: resolvedDate,
    horaInicio: resolvedTime,
    duracion: editingAppointment?.duracion ?? 45,
    enviarInvitacion: true,
    repetir: false,
    frecuencia: 'semanal',
    tipo: editingAppointment?.tipo ?? '',
    diasSemana: [],
    fechaFinRepeticion: '',
    horaFin: '',
    notas: editingAppointment?.notas ?? '',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border bg-card p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1">
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-card-foreground">
          {editingAppointment ? 'Editar cita' : 'Nueva cita'}
        </h2>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={eventSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const horaFin = calcularHoraFin(
                values.horaInicio,
                values.duracion,
              )

              await onSave({
                ...values,
                horaFin,
              })

              onClose()
            } catch (error) {
              console.error('Error al guardar cita:', error)
            } finally {
              setSubmitting(false)
            }
          }}>
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* Título */}
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Titulo
                </label>
                <Field
                  name="titulo"
                  readOnly
                  className={`${inputBase} bg-muted cursor-not-allowed`}
                />
                <ErrorMessage
                  name="titulo"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Paciente */}
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Paciente
                </label>
                <select
                  name="pacienteId"
                  value={values.pacienteId}
                  className={selectBase}
                  onChange={e => {
                    const selectedId = e.target.value
                    setFieldValue('pacienteId', selectedId)

                    const paciente = patients.find(
                      p => String(p.id) === selectedId,
                    )

                    if (!paciente) {
                      setFieldValue('titulo', '')
                      return
                    }

                    const nuevoTitulo = `Terapia - ${paciente.nombre} ${paciente.apellido}`
                    setFieldValue('titulo', nuevoTitulo)
                  }}>
                  <option value="">Seleccionar paciente...</option>
                  {patients
                    .filter(p => p.estado === 'activo')
                    .map(p => (
                      <option key={p.id} value={String(p.id)}>
                        {p.nombre} {p.apellido}
                      </option>
                    ))}
                </select>
                <ErrorMessage
                  name="pacienteId"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Fecha */}
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Fecha
                </label>
                <Field type="date" name="fecha" className={inputBase} />
                <ErrorMessage
                  name="fecha"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Hora + duración */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground">
                    Hora de inicio
                  </label>
                  <Field type="time" name="horaInicio" className={inputBase} />
                  <ErrorMessage
                    name="horaInicio"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground">
                    Duracion
                  </label>
                  <Field as="select" name="duracion" className={selectBase}>
                    <option value={45}>45 minutos</option>
                    <option value={60}>60 minutos</option>
                  </Field>
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Tipo
                </label>
                <Field as="select" name="tipo" className={selectBase}>
                  <option value="">Seleccionar tipo...</option>
                  <option value="Terapia individual">Terapia individual</option>
                  <option value="Terapia de pareja">Terapia de pareja</option>
                  <option value="Evaluacion inicial">Evaluacion inicial</option>
                  <option value="Seguimiento">Seguimiento</option>
                </Field>
                <ErrorMessage
                  name="tipo"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              {/* Repetir — solo en creación */}
              {!editingAppointment && (
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="repetir" />
                  <span>Repetir semanalmente</span>
                </label>
              )}

              {/* Invitación */}
              <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-border bg-muted/50 p-3">
                <Field
                  name="enviarInvitacion"
                  type="checkbox"
                  checked={values.enviarInvitacion}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('enviarInvitacion', e.target.checked)
                  }
                />
                <div>
                  <span className="text-sm font-medium text-card-foreground">
                    Enviar invitacion al paciente
                  </span>

                  {values.pacienteId && (
                    <span className="block text-xs text-muted-foreground">
                      {
                        patients.find(p => String(p.id) === values.pacienteId)
                          ?.email
                      }
                    </span>
                  )}
                </div>
              </label>

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors">
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground disabled:opacity-50 hover:bg-accent/90 transition-colors">
                  <Send className="h-3.5 w-3.5" />
                  {editingAppointment
                    ? 'Guardar cambios'
                    : values.enviarInvitacion
                      ? 'Crear y enviar invitacion'
                      : 'Crear cita'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
