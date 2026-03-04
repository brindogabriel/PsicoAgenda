'use client'

import { useEffect, type ChangeEvent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { X, Send } from 'lucide-react'
import type { Patient } from '@/lib/types'

const eventSchema = Yup.object({
  titulo: Yup.string().required('El titulo es obligatorio'),
  pacienteId: Yup.string().required('Selecciona un paciente'),
  fecha: Yup.string().required('La fecha es obligatoria'),
  horaInicio: Yup.string().required('La hora de inicio es obligatoria'),
  horaFin: Yup.string().required('La hora de fin es obligatoria'),
  tipo: Yup.string().required('El tipo de sesion es obligatorio'),
  notas: Yup.string(),
  enviarInvitacion: Yup.boolean(),
  repetir: Yup.boolean(),
  frecuencia: Yup.string(),
  diasSemana: Yup.array(),
  fechaFinRepeticion: Yup.string(),
})

export interface NewEventValues {
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

interface NewEventDialogProps {
  open: boolean
  onClose: () => void
  patients: Patient[]
  defaultDate?: string
  defaultTime?: string
  onSave: (values: NewEventValues) => void
}

const inputBase =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-colors'

const selectBase =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-colors'

const emailpaciente = (values: NewEventValues, patients: Patient[]) =>
  values.pacienteId
    ? patients.find(p => p.id === values.pacienteId)?.email
    : null

export function NewEventDialog({
  open,
  onClose,
  patients,
  defaultDate,
  defaultTime,
  onSave,
}: NewEventDialogProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const initialValues: NewEventValues = {
    titulo: '',
    pacienteId: '',
    fecha: defaultDate ?? '',
    horaInicio: defaultTime ?? '09:00',
    duracion: 45,
    enviarInvitacion: true,
    repetir: false,
    frecuencia: 'semanal',
    tipo: 'Terapia individual',
    diasSemana: [],
    fechaFinRepeticion: '',
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

        <h2 className="text-lg font-semibold mb-4 leading-none text-card-foreground">
          Nueva cita
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={eventSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSave(values)
            setSubmitting(false)
            onClose()
          }}>
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* Título solo lectura */}
              <div>
                <label className="text-sm font-medium text-card-foreground">
                  Titulo
                </label>
                <Field
                  name="titulo"
                  readOnly
                  className={`${inputBase} bg-muted cursor-not-allowed`}
                />
              </div>

              {/* Paciente */}
              <div>
                <label className="text-sm font-medium leading-none text-card-foreground">
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
                      p => String(p.id) === String(selectedId),
                    )

                    if (!paciente) {
                      setFieldValue('titulo', '')
                      return
                    }

                    const nuevoTitulo = `Terapia - ${paciente.nombre} ${paciente.apellido}`

                    setFieldValue('titulo', nuevoTitulo)
                  }}>
                  <option
                    defaultValue={initialValues.pacienteId}
                    value=""
                    selected>
                    Seleccionar paciente...
                  </option>
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
              <label className="text-sm font-medium leading-none text-card-foreground">
                Fecha
              </label>
              <Field type="date" name="fecha" className={inputBase} />
              {/* Horas */}
              <div className="grid grid-cols-2 gap-4">
                <label className="text-sm font-medium leading-none text-card-foreground">
                  Hora de inicio
                  <Field
                    type="time"
                    name="horaInicio"
                    id="horaInicio"
                    className={inputBase}
                  />
                </label>
                <label className="text-sm font-medium leading-none text-card-foreground">
                  Duracion
                  <Field as="select" name="duracion" className={selectBase}>
                    <option value="45">45 minutos</option>
                    <option value="60">60 minutos</option>
                  </Field>
                </label>
              </div>

              {/* Tipo */}
              <label className="text-sm font-medium leading-none text-card-foreground">
                Tipo
                <Field as="select" name="tipo" className={selectBase}>
                  <option value="" selected>
                    Seleccionar tipo...
                  </option>
                  <option value="Terapia individual">Terapia individual</option>
                  <option value="Terapia de pareja">Terapia de pareja</option>
                  <option value="Evaluacion inicial">Evaluacion inicial</option>
                  <option value="Seguimiento">Seguimiento</option>
                </Field>
              </label>
              {/* Notas */}
              <label className="text-sm font-medium leading-none text-card-foreground">
                Notas
                <Field
                  as="textarea"
                  name="notas"
                  rows={2}
                  className={`${inputBase} w-full rounded-lg border px-3 py-2 text-sm
                text-card-foreground`}
                  placeholder="Notas"
                />
              </label>
              <ErrorMessage
                name="notas"
                component="p"
                className="text-xs text-red-500"
              />
              <label className={`${inputBase} flex items-center gap-2`}>
                <Field type="checkbox" name="repetir" />
                <span>Repetir semanalmente</span>
              </label>

              <label
                htmlFor="enviarInvitacion"
                className="flex items-start gap-3 cursor-pointer rounded-lg border border-border bg-muted/50 p-3">
                <Field
                  name="enviarInvitacion"
                  id="enviarInvitacion"
                  type="checkbox"
                  checked={values.enviarInvitacion}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFieldValue('enviarInvitacion', e.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-border text-accent accent-accent focus:ring-ring"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-card-foreground">
                    Enviar invitacion al paciente
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Se enviara una invitacion al evento, al paciente
                    seleccionado
                    {values.pacienteId && (
                      <span className="block mt-0.5 text-accent">
                        {patients.find(
                          p => String(p.id) === String(values.pacienteId),
                        )?.email + ' por favor, confirme la asistencia.'}
                      </span>
                    )}
                  </span>
                </div>
              </label>
              {/* Botones */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border px-4 py-2 text-sm text-card-foreground">
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors">
                  <Send className="h-3.5 w-3.5" />
                  {values.enviarInvitacion
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
