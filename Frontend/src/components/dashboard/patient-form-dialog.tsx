'use client'

import { useEffect, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { X } from 'lucide-react'
import type { Patient } from '@/lib/types'

const patientSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string()
    .email('Email invalido')
    .required('El email es obligatorio'),
  telefono: Yup.string().required('El telefono es obligatorio'),
})

interface PatientFormDialogProps {
  open: boolean
  onClose: () => void
  patient?: Patient | null
  onSave: (values: Omit<Patient, 'id' | 'estado' | 'createdAt'>) => void
}

const inputBase =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors'

export function PatientFormDialog({
  open,
  onClose,
  patient,
  onSave,
}: PatientFormDialogProps) {
  const isEditing = !!patient
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const initialValues = {
    nombre: patient?.nombre ?? '',
    apellido: patient?.apellido ?? '',
    email: patient?.email ?? '',
    telefono: patient?.telefono ?? '',
    fechaNacimiento: patient?.fechaNacimiento ?? '',
    tipoTerapia: patient?.tipoTerapia ?? '',
    notas: patient?.notas ?? '',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={() => {}}
        role="presentation"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-card-foreground transition-colors"
          aria-label="Cerrar">
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold text-card-foreground">
          {isEditing ? 'Editar paciente' : 'Nuevo paciente'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEditing
            ? 'Modifica los datos del paciente.'
            : 'Completa los datos para registrar un nuevo paciente.'}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={patientSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            onSave(values)
            setSubmitting(false)
            onClose()
          }}>
          {({ isSubmitting, touched, errors }) => (
            <Form className="mt-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nombre"
                    className="text-sm font-medium text-card-foreground">
                    Nombre
                  </label>
                  <Field
                    id="nombre"
                    name="nombre"
                    placeholder="Carlos"
                    className={`${inputBase} ${touched.nombre && errors.nombre ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <ErrorMessage
                    name="nombre"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="apellido"
                    className="text-sm font-medium text-card-foreground">
                    Apellido
                  </label>
                  <Field
                    id="apellido"
                    name="apellido"
                    placeholder="Mendez"
                    className={`${inputBase} ${touched.apellido && errors.apellido ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <ErrorMessage
                    name="apellido"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-card-foreground">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="carlos@email.com"
                  className={`${inputBase} ${touched.email && errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="telefono"
                    className="text-sm font-medium text-card-foreground">
                    Telefono
                  </label>
                  <Field
                    id="telefono"
                    name="telefono"
                    placeholder="+54 11 5555-0000"
                    className={`${inputBase} ${touched.telefono && errors.telefono ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <ErrorMessage
                    name="telefono"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div>
                {/* <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fechaNacimiento"
                    className="text-sm font-medium text-card-foreground">
                    Fecha de nacimiento
                  </label>
                  <Field
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    type="date"
                    className={`${inputBase} ${touched.fechaNacimiento && errors.fechaNacimiento ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <ErrorMessage
                    name="fechaNacimiento"
                    component="p"
                    className="text-xs text-red-500"
                  />
                </div> */}
              </div>

              {/* <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="tipoTerapia"
                  className="text-sm font-medium text-card-foreground">
                  Tipo de terapia
                </label>
                <Field
                  id="tipoTerapia"
                  name="tipoTerapia"
                  placeholder="Terapia individual, de pareja, etc."
                  className={`${inputBase} ${touched.tipoTerapia && errors.tipoTerapia ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                <ErrorMessage
                  name="tipoTerapia"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div> */}

              {/* <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="notas"
                  className="text-sm font-medium text-card-foreground">
                  Notas
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  name="notas"
                  rows={3}
                  placeholder="Observaciones, notas clinicas, etc."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors resize-none"
                />
              </div> */}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-card-foreground hover:bg-muted transition-colors">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors">
                  {isSubmitting
                    ? 'Guardando...'
                    : isEditing
                      ? 'Guardar cambios'
                      : 'Crear paciente'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
