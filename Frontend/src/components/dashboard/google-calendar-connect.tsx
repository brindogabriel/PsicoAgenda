"use client"

import { useState } from "react"
import { CalendarDays, Check, ExternalLink, Unplug } from "lucide-react"

export function GoogleCalendarConnect() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleConnect() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setConnected(true)
    setLoading(false)
  }

  async function handleDisconnect() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setConnected(false)
    setLoading(false)
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="hsl(var(--accent))" strokeWidth="1.5" />
              <path d="M3 9h18" stroke="hsl(var(--accent))" strokeWidth="1.5" />
              <path d="M9 4V2" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15 4V2" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="7" y="12" width="3" height="2" rx="0.5" fill="hsl(var(--accent))" />
              <rect x="7" y="16" width="3" height="2" rx="0.5" fill="hsl(var(--accent))" />
              <rect x="13" y="12" width="3" height="2" rx="0.5" fill="hsl(var(--accent))" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-card-foreground">Google Calendar</h3>
            <p className="text-sm text-muted-foreground">Sincroniza tus citas con Google Calendar</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            connected
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              : "bg-muted text-muted-foreground border border-border"
          }`}
        >
          {connected ? "Conectado" : "No conectado"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <h4 className="text-sm font-medium text-card-foreground">
            {connected ? "Integracion activa" : "Que permite esta integracion?"}
          </h4>
          {connected ? (
            <div className="mt-2 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Tu cuenta esta vinculada. Las citas se sincronizaran automaticamente.
              </p>
              <div className="flex items-center gap-2 text-sm text-accent">
                <Check className="h-4 w-4" />
                <span>doctor.demo@gmail.com</span>
              </div>
            </div>
          ) : (
            <ul className="mt-2 flex flex-col gap-1.5">
              {[
                "Ver tus citas de PsicoAgenda en Google Calendar",
                "Sincronizar automaticamente nuevas citas",
                "Enviar invitaciones por email a tus pacientes",
                "Recibir recordatorios y notificaciones de Google",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {connected ? (
            <button
              type="button"
              onClick={handleDisconnect}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-card-foreground hover:bg-muted disabled:opacity-50 transition-colors"
            >
              <Unplug className="h-4 w-4" />
              {loading ? "Desconectando..." : "Desconectar cuenta"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConnect}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              {loading ? "Conectando..." : "Conectar con Google Calendar"}
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          La conexion requiere autorizar a PsicoAgenda a acceder a tu Google Calendar.
          Podras desconectarla en cualquier momento.
        </p>
      </div>
    </div>
  )
}
