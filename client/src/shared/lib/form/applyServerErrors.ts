import type { FormInstance } from 'antd'
import { getFieldErrors } from '../../api'

export const applyServerErrors = (form: FormInstance, error: unknown) => {
  const fieldErrors = getFieldErrors(error)
  if (fieldErrors.length === 0) {
    return false
  }

  form.setFields(fieldErrors.map(({ field, message }) => ({ name: field, errors: [message] })))
  return true
}
