'use client'
import Link from 'next/link'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'

import { ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { RegisterForm } from '@/components/register/register-form'

interface Values {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const RegisterPage = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      await register(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('The name field is required.'),
    email: Yup.string()
      .email('Invalid email')
      .required('The email field is required.'),
    password: Yup.string().required('The password field is required.'),
    password_confirmation: Yup.string()
      .required('Please confirm password.')
      .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
  })

  return (
    <div className="relative flex min-h-svh">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between bg-accent p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-foreground/20">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent-foreground">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
              <path d="M12 2c-2.76 0-5 4.48-5 10s2.24 10 5 10" />
              <path d="M2 12h10" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-accent-foreground">
            PsicoAgenda
          </span>
        </div>

        <div className="max-w-md">
          <h2 className="font-serif text-4xl leading-tight text-accent-foreground text-balance">
            Unite a la plataforma pensada para tu practica.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-accent-foreground/80">
            Crea tu cuenta y se parte de los profesionales de salud mental que
            organizan su consultorio de forma mas simple.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <FeaturePill text="Registro rapido y sin costo" />
            <FeaturePill text="Datos protegidos desde el inicio" />
            <FeaturePill text="Acceso anticipado a nuevas funciones" />
          </div>
        </div>

        <p className="text-sm text-accent-foreground/60">
          Proyecto en desarrollo activo
        </p>
      </div>

      {/* Right panel — register form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Top bar */}
        <div className="flex items-center justify-between p-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <ThemeToggle />
        </div>

        {/* Form area */}
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-foreground">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
                  <path d="M12 2c-2.76 0-5 4.48-5 10s2.24 10 5 10" />
                  <path d="M2 12h10" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                PsicoAgenda
              </span>
            </div>

            <div className="mb-8">
              <h1 className="font-serif text-3xl text-foreground">
                Crear cuenta
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Completa tus datos para registrarte en PsicoAgenda. dsad 
              </p>
            </div>

            <RegisterForm />

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                {'Ya tenes cuenta? '}
                <Link
                  href="/login"
                  className="font-medium text-accent hover:text-accent/80 transition-colors">
                  Iniciar sesion
                </Link>
              </p>
            </div>

            {/* Dev notice */}
            <div className="mt-8 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-center">
              <p className="text-xs leading-relaxed text-muted-foreground">
                Este sistema se encuentra en desarrollo activo. Tu registro sera
                procesado cuando la plataforma este disponible.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      

  )
}


function FeaturePill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-accent-foreground/10 px-4 py-2.5">
      <svg
        className="h-4 w-4 shrink-0 text-accent-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-sm font-medium text-accent-foreground">{text}</span>
    </div>
  )
}
export default RegisterPage
