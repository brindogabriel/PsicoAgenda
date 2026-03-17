'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  Loader2,
} from 'lucide-react'
import type { Patient } from '@/lib/types'

interface PatientListProps {
  patients: Patient[]
  onAdd: () => void
  onEdit: (patient: Patient) => void
  onDelete: (patient: Patient) => void
  deletingId?: string // optional id currently being removed
}

function ActionMenu({
  onEdit,
  onDelete,
  disabled = false,
}: {
  onEdit: () => void
  onDelete: () => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-card-foreground transition-colors"
        aria-label="Acciones">
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onEdit()
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-card-foreground hover:bg-muted transition-colors">
            <Pencil className="h-3.5 w-3.5" /> Editar
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            disabled={disabled}
            className={
              'flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors' +
              (disabled ? ' opacity-50 cursor-not-allowed' : '')
            }>
            {disabled ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}{' '}
            Eliminar
          </button>
        </div>
      )}
    </div>
  )
}

export function PatientList({
  patients,
  onAdd,
  onEdit,
  onDelete,
  deletingId,
}: PatientListProps) {
  const [search, setSearch] = useState('')

  const filtered = patients.filter(p => {
    const term = search.toLowerCase()
    return (
      p.nombre.toLowerCase().includes(term) ||
      p.apellido.toLowerCase().includes(term) ||
      p.email.toLowerCase().includes(term)
    )
  })

  const estadoBadge = (estado: string) =>
    estado === 'activo'
      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
      : 'bg-muted text-muted-foreground border border-border'

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors">
          <Plus className="h-4 w-4" />
          Agregar paciente
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Telefono
                </th>
                {/* <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Terapia
                </th> */}
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Estado
                </th>
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground">
                    No se encontraron pacientes.
                  </td>
                </tr>
              ) : (
                filtered.map(patient => (
                  <tr
                    key={patient.id}
                    className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-card-foreground">
                      {patient.nombre} {patient.apellido}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {patient.email}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {patient.telefono}
                    </td>
                    {/* <td className="px-4 py-3 text-muted-foreground">
                      {patient.notas}
                    </td> */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${estadoBadge(patient.estado)}`}>
                        {patient.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ActionMenu
                        onEdit={() => onEdit(patient)}
                        onDelete={() => onDelete(patient)}
                        disabled={deletingId === patient.id}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No se encontraron pacientes.
          </p>
        ) : (
          filtered.map(patient => (
            <div
              key={patient.id}
              className="flex items-start justify-between rounded-xl border border-border bg-card p-4">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-card-foreground">
                  {patient.nombre} {patient.apellido}
                </p>
                <p className="text-sm text-muted-foreground">{patient.email}</p>
                <p className="text-sm text-muted-foreground">
                  {patient.telefono}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${estadoBadge(patient.estado)}`}>
                    {patient.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {patient.tipoTerapia}
                  </span>
                </div>
              </div>
              <ActionMenu
                onEdit={() => onEdit(patient)}
                onDelete={() => onDelete(patient)}
                disabled={deletingId === patient.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
