'use client'

import { useState } from 'react'
import { PatientList } from '@/components/dashboard/patient-list'
import { PatientFormDialog } from '@/components/dashboard/patient-form-dialog'
import { usePatients } from '@/hooks/use-patients'
import { Patient, PatientFormData } from '@/lib/types'
import axios from '@/lib/axios'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export default function PacientesPage() {
  const { patients, isLoading, error, mutate } = usePatients()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)

  // confirmation / deletion state
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedForDelete, setSelectedForDelete] = useState<Patient | null>(
    null,
  )
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined)

  function handleAdd() {
    setEditingPatient(null)
    setDialogOpen(true)
  }

  function handleEdit(patient: Patient) {
    setEditingPatient(patient)
    setDialogOpen(true)
  }

  /**
   * called by patient list when user requests deletion
   * opens the confirmation dialog with the selected patient
   */
  function requestDelete(patient: Patient) {
    setSelectedForDelete(patient)
    setConfirmOpen(true)
  }

  /**
   * after the user confirms, actually send the request
   */
  async function handleDelete() {
    if (!selectedForDelete) return
    setDeletingId(selectedForDelete.id)
    try {
      await axios.delete(`/api/pacientes/${selectedForDelete.id}`)
      await mutate()
    } catch (err) {
      console.error(err)
      // could show a toast here
    } finally {
      setDeletingId(undefined)
      setSelectedForDelete(null)
      setConfirmOpen(false)
    }
  }

  async function handleSave(values: PatientFormData) {
    try {
      if (editingPatient) {
        await axios.put(`/api/pacientes/${editingPatient.id}`, values)
      } else {
        await axios.post('/api/pacientes', values)
      }
      await mutate() // recarga la lista desde el servidor
    } catch (err) {
      console.error(err)
      // aquí podrías mostrar un toast de error
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Pacientes
        </h1>
        <p className="text-sm text-muted-foreground">
          Administra el listado de pacientes de tu consulta.
        </p>
      </div>

      <PatientList
        patients={patients}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={requestDelete} // pass full patient so we can confirm
        deletingId={deletingId}
      />

      {confirmOpen && selectedForDelete && (
        <ConfirmDialog
          open={confirmOpen}
          title="Eliminar paciente"
          description={`¿Seguro que querés borrar a ${selectedForDelete.nombre} ${selectedForDelete.apellido}?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
          isLoading={deletingId === selectedForDelete.id}
        />
      )}

      <PatientFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        patient={editingPatient}
        onSave={handleSave}
      />
    </div>
  )
}
