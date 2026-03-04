'use client'

import Link from 'next/link'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import axios, { type AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik'
import { useAuth } from '@/hooks/auth'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import { useEffect, useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Values {
  email: string
  password: string
  remember: boolean
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Ingresa un correo electronico valido')
    .required('El correo electronico es obligatorio'),
  password: Yup.string().required('La contrasena es obligatoria'),
})

export function LoginForm() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  useEffect(() => {
    const resetToken = searchParams.get('reset')
    setStatus(resetToken ? atob(resetToken) : '')
  }, [searchParams])

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ) => {
    try {
      await login(values)
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
      setStatus('')
    }
  }

  const inputClasses =
    'flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  const errorInputClasses =
    'flex h-11 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <>
      <AuthSessionStatus className="mb-6" status={status} />

      <Formik
        onSubmit={submitForm}
        validationSchema={LoginSchema}
        initialValues={{ email: '', password: '', remember: false }}>
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-5" noValidate>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground">
                Correo electronico
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                autoComplete="email"
                className={
                  touched.email && errors.email
                    ? errorInputClasses
                    : inputClasses
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-accent hover:text-accent/80 transition-colors"
                  tabIndex={-1}>
                  Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
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
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
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
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Field
                type="checkbox"
                name="remember"
                id="remember"
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-background"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-foreground">
                Recordarme
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 mt-1 bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Iniciar sesion'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
