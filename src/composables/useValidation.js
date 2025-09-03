import { ref } from 'vue'
export function useValidation() {
  const validationState = ref({})
  const touchedFields = ref({})

  const setValidationState = (field, isValid) => {
    validationState.value[field] = isValid
  }

  const touchField = (field) => {
    touchedFields.value[field] = true
  }

  const validateField = (field, value, rules = []) => {
    let isValid = true

    for (const rule of rules) {
      if (typeof rule === 'function') {
        isValid = rule(value)
      } else if (typeof rule === 'object') {
        isValid = rule.validator(value, ...(rule.params || []))
      }

      if (!isValid) break
    }

    setValidationState(field, isValid)
    return isValid
  }

  const validateStep = (stepFields) => {
    return stepFields.every((field) => validationState.value[field] === true)
  }

  const isFieldValid = (field) => {
    return validationState.value[field] === true
  }

  const isFieldTouched = (field) => {
    return touchedFields.value[field] === true
  }

  const getFieldStatus = (field) => {
    if (!isFieldTouched(field)) return 'untouched'
    return isFieldValid(field) ? 'valid' : 'invalid'
  }

  return {
    validationState,
    touchedFields,
    setValidationState,
    touchField,
    validateField,
    validateStep,
    isFieldValid,
    isFieldTouched,
    getFieldStatus,
  }
}
