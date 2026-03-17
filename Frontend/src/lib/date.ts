export function formatFechaDMY(fecha: string) {
  // Formato interno esperado: YYYY-MM-DD (sin zona horaria)
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const [y, m, d] = fecha.split('-')
    return `${d}/${m}/${y}`
  }

  const parsed = new Date(fecha)
  if (Number.isNaN(parsed.getTime())) return fecha

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsed)
}

