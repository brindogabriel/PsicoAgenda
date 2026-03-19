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
            <svg
              width="512"
              height="512"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#google_calendar__clip0_5072_3766)">
                <path
                  d="M390.736 121.264H121.264V390.736H390.736V121.264Z"
                  fill="white"
                />
                <path
                  d="M390.736 512L512 390.736L451.368 380.392L390.736 390.736L379.67 446.196L390.736 512Z"
                  fill="#EA4335"
                />
                <path
                  d="M0 390.736V471.578C0 493.912 18.088 512 40.42 512H121.264L133.714 451.368L121.264 390.736L55.198 380.392L0 390.736Z"
                  fill="#188038"
                />
                <path
                  d="M512 121.264V40.42C512 18.088 493.912 0 471.58 0H390.736C383.36 30.072 379.671 52.2027 379.67 66.392C379.67 80.58 383.359 98.8707 390.736 121.264C417.556 128.944 437.767 132.784 451.368 132.784C464.969 132.784 485.18 128.945 512 121.264Z"
                  fill="#1967D2"
                />
                <path
                  d="M512 121.264H390.736V390.736H512V121.264Z"
                  fill="#FBBC04"
                />
                <path
                  d="M390.736 390.736H121.264V512H390.736V390.736Z"
                  fill="#34A853"
                />
                <path
                  d="M390.736 0H40.422C18.088 0 0 18.088 0 40.42V390.736H121.264V121.264H390.736V0Z"
                  fill="#4285F4"
                />
                <path
                  d="M176.54 330.308C166.468 323.504 159.494 313.568 155.688 300.428L179.066 290.796C181.186 298.88 184.891 305.145 190.182 309.592C195.436 314.038 201.836 316.228 209.314 316.228C216.959 316.228 223.527 313.903 229.018 309.254C234.51 304.606 237.272 298.678 237.272 291.504C237.272 284.16 234.375 278.164 228.582 273.516C222.788 268.868 215.512 266.544 206.822 266.544H193.314V243.404H205.44C212.917 243.404 219.216 241.382 224.336 237.338C229.456 233.298 232.016 227.772 232.016 220.732C232.016 214.468 229.726 209.482 225.146 205.744C220.566 202.004 214.77 200.118 207.73 200.118C200.858 200.118 195.402 201.938 191.36 205.608C187.319 209.289 184.282 213.937 182.534 219.116L159.394 209.482C162.458 200.792 168.084 193.112 176.336 186.476C184.588 179.84 195.132 176.506 207.932 176.506C217.398 176.506 225.92 178.326 233.466 181.996C241.01 185.668 246.938 190.754 251.216 197.222C255.496 203.722 257.616 210.998 257.616 219.082C257.616 227.334 255.63 234.308 251.656 240.034C247.682 245.76 242.796 250.138 237.002 253.204V254.584C244.483 257.669 250.982 262.735 255.798 269.238C260.682 275.806 263.142 283.654 263.142 292.818C263.142 301.978 260.816 310.164 256.168 317.338C251.52 324.514 245.088 330.172 236.934 334.282C228.75 338.392 219.554 340.482 209.348 340.482C197.524 340.514 186.612 337.112 176.54 330.308ZM320.132 214.298L294.466 232.858L281.632 213.39L327.678 180.176H345.328V336.842H320.132V214.298Z"
                  fill="#4285F4"
                />
              </g>
              <defs>
                <clipPath id="google_calendar__clip0_5072_3766">
                  <rect width="512" height="512" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-card-foreground">
              Google Calendar
            </h3>
            <p className="text-sm text-muted-foreground">
              Sincroniza tus citas con Google Calendar
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            connected
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-muted text-muted-foreground border border-border'
          }`}>
          {connected ? 'Conectado' : 'No conectado'}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <h4 className="text-sm font-medium text-card-foreground">
            {connected ? 'Integracion activa' : 'Que permite esta integracion?'}
          </h4>
          {connected ? (
            <div className="mt-2 flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Tu cuenta esta vinculada. Las citas se sincronizaran
                automaticamente.
              </p>
              <div className="flex items-center gap-2 text-sm text-accent">
                <Check className="h-4 w-4" />
                <span>doctor.demo@gmail.com</span>
              </div>
            </div>
          ) : (
            <ul className="mt-2 flex flex-col gap-1.5">
              {[
                'Ver tus citas de PsicoAgenda en Google Calendar',
                'Sincronizar automaticamente nuevas citas',
                'Enviar invitaciones por email a tus pacientes',
                'Recibir recordatorios y notificaciones de Google',
              ].map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground">
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
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-card-foreground hover:bg-muted disabled:opacity-50 transition-colors">
              <Unplug className="h-4 w-4" />
              {loading ? 'Desconectando...' : 'Desconectar cuenta'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConnect}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors">
              <ExternalLink className="h-4 w-4" />
              {loading ? 'Conectando...' : 'Conectar con Google Calendar'}
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          La conexion requiere autorizar a PsicoAgenda a acceder a tu Google
          Calendar. Podras desconectarla en cualquier momento.
        </p>
      </div>
    </div>
  )
}
