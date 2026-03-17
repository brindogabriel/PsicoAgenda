'use client'

import * as Yup from 'yup'
import axios, { type AxiosError } from 'axios'
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  type FormikHelpers,
  useFormikContext,
} from 'formik'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { Eye, EyeOff, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Values {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres')
    .required('El nombre es obligatorio'),
  email: Yup.string()
    .email('Ingresa un correo electronico valido')
    .required('El correo electronico es obligatorio'),
  password: Yup.string()
    .min(8, 'La contrasena debe tener al menos 8 caracteres')
    .matches(/[a-z]/, 'Debe contener al menos una letra minuscula')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayuscula')
    .matches(/[0-9]/, 'Debe contener al menos un numero')
    .required('La contrasena es obligatoria'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contrasenas no coinciden')
    .required('Confirma tu contrasena'),
})

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
          met ? 'bg-accent text-accent-foreground' : 'border border-border'
        }`}>
        {met && <Check className="h-2.5 w-2.5" />}
      </div>
      <span
        className={`text-xs transition-colors ${met ? 'text-foreground' : 'text-muted-foreground'}`}>
        {text}
      </span>
    </div>
  )
}

function PasswordStrengthIndicator() {
  const { values } = useFormikContext<Values>()
  const password = values.password

  if (!password || password.length === 0) return null

  const requirements = [
    { met: password.length >= 8, text: 'Al menos 8 caracteres' },
    { met: /[a-z]/.test(password), text: 'Una letra minuscula' },
    { met: /[A-Z]/.test(password), text: 'Una letra mayuscula' },
    { met: /[0-9]/.test(password), text: 'Un numero' },
  ]

  return (
    <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2.5">
      {requirements.map(req => (
        <PasswordRequirement key={req.text} met={req.met} text={req.text} />
      ))}
    </div>
  )
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ) => {
    try {
      await register(values)
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        (error as AxiosError<{ errors: Record<string, string[]> }>).response
          ?.status === 422
      ) {
        const backendErrors = (
          error as AxiosError<{ errors: Record<string, string[]> }>
        ).response?.data?.errors
        if (backendErrors) {
          const formikErrors: Record<string, string> = {}
          for (const [key, messages] of Object.entries(backendErrors)) {
            formikErrors[key] = messages[0]
          }
          setErrors(formikErrors)
        }
      }
    } finally {
      setSubmitting(false)
    }
  }

  const inputClasses =
    'flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  const errorInputClasses =
    'flex h-11 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <Formik
      onSubmit={submitForm}
      validationSchema={RegisterSchema}
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }}>
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-5" noValidate>
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground">
              Nombre completo
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Juan Perez"
              autoComplete="name"
              className={
                touched.name && errors.name ? errorInputClasses : inputClasses
              }
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-xs text-destructive"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="register-email"
              className="text-sm font-medium text-foreground">
              Correo electronico
            </label>
            <Field
              id="register-email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              className={
                touched.email && errors.email ? errorInputClasses : inputClasses
              }
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-xs text-destructive"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="register-password"
              className="text-sm font-medium text-foreground">
              Contrasena
            </label>
            <div className="relative">
              <Field
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Crea una contrasena segura"
                autoComplete="new-password"
                className={
                  touched.password && errors.password
                    ? errorInputClasses
                    : inputClasses
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'
                }
                tabIndex={-1}>
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="text-xs text-destructive"
            />
            <PasswordStrengthIndicator />
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password_confirmation"
              className="text-sm font-medium text-foreground">
              Confirmar contrasena
            </label>
            <div className="relative">
              <Field
                id="password_confirmation"
                name="password_confirmation"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeti tu contrasena"
                autoComplete="new-password"
                className={
                  touched.password_confirmation && errors.password_confirmation
                    ? errorInputClasses
                    : inputClasses
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showConfirm ? 'Ocultar contrasena' : 'Mostrar contrasena'
                }
                tabIndex={-1}>
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password_confirmation"
              component="p"
              className="text-xs text-destructive"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 mt-1 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
