import { reactive } from 'vue'
import { useValidation } from './useValidation'
import { validators } from '../utils/validators'

export function useForm() {
  const {
    validationState,
    touchedFields,
    touchField,
    validateField,
    validateStep,
    isFieldValid,
    isFieldTouched,
    getFieldStatus,
  } = useValidation()

  const formData = reactive({
    country: '',
    gender: '',
    firstName: '',
    secondName: '',
    birthDate: '',
    documentType: '',
    documentNumber: '',
    documentFront: null,
    documentBack: null,
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    cellphone: '',
    address: '',
    postalCode: '',
    terms: false,
  })

  const validationRules = {
    country: [validators.required],
    gender: [validators.required],
    firstName: [validators.required, validators.isAlpha],
    secondName: [validators.required, validators.isAlpha],
    birthDate: [validators.required, validators.isAdult],
    documentType: [validators.required],
    documentNumber: [
      validators.required,
      validators.isNumber,
      { validator: validators.minLength, params: [5] },
    ],
    documentFront: [validators.required],
    documentBack: [validators.required],
    email: [validators.required, validators.email],
    password: [validators.required, { validator: validators.minLength, params: [6] }],
    confirmPassword: [
      validators.required,
      {
        validator: validators.passwordsMatch,
        params: [() => formData.password],
      },
    ],
    cellphone: [validators.required, validators.isNumber],
    phone: [validators.required, validators.isNumber],
    address: [validators.required],
    postalCode: [validators.required, validators.isNumber],
  }

  const validateFormField = (field) => {
    touchField(field)
    return validateField(field, formData[field], validationRules[field])
  }

  const stepFields = {
    0: [
      'country',
      'gender',
      'firstName',
      'secondName',
      'birthDate',
      'documentType',
      'documentNumber',
      'documentFront',
      'documentBack',
    ],
    1: ['email', 'password', 'confirmPassword', 'cellphone'],
    2: ['address', 'postalCode'],
  }

  const isStepValid = (step) => {
    return validateStep(stepFields[step])
  }

  return {
    formData,
    validationState,
    touchedFields,
    validateFormField,
    isStepValid,
    isFieldValid,
    isFieldTouched,
    getFieldStatus,
  }
}
