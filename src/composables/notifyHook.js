import { useQuasar } from 'quasar'

export const useNotify = () => {
  const $q = useQuasar()

  const errorNotify = (message="Error de Servidor") => {
    $q.notify({
      message,
      color: 'negative',
      icon: 'report_problem',
      // timeout: 2000,
    })
  }
  const successNotify = (message="Operación exitosa") => {
    $q.notify({
      message,
      color: 'positive',
      icon: 'check_circle',
      // timeout: 2000,
    })

  }

  const showNotify = (message = 'Error de servidor', color = 'negative', icon) => {
    $q.notify({
      message,
      color,
      icon: icon || 'warning',
      timeout: 2000,
    })
  }

  return { showNotify, errorNotify, successNotify }
}
