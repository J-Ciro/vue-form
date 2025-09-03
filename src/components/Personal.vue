<template>
  <div class="fade">
    <h2 class="text-2xl font-bold text-primary-800 mb-6 flex items-center">
      <span
        class="bg-primary-500 text-gray rounded-full w-8 h-8 flex items-center justify-center mr-3"
        >1.</span
      >
      Información Personal
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div class="lg:col-span-6">
        <FormField
          label="País *"
          fieldType="select"
          :options="countries"
          :value="formData.country"
          :status="getFieldStatus('country')"
          @update:value="updateField('country', $event)"
          @blur="validateField('country')"
        />
      </div>
      <div class="lg:col-span-6">
        <FormField
          label="Género *"
          fieldType="select"
          :options="genderOptions"
          :value="formData.gender"
          :status="getFieldStatus('gender')"
          @update:value="updateField('gender', $event)"
          @blur="validateField('gender')"
        />
      </div>

      <div class="lg:col-span-6">
        <FormField
          label="Primer Nombre *"
          fieldType="text"
          :value="formData.firstName"
          :status="getFieldStatus('firstName')"
          @update:value="updateField('firstName', $event)"
          @blur="validateField('firstName')"
        />
      </div>
      <div class="lg:col-span-6">
        <FormField
          label="Segundo Nombre *"
          fieldType="text"
          :value="formData.secondName"
          :status="getFieldStatus('secondName')"
          @update:value="updateField('secondName', $event)"
          @blur="validateField('secondName')"
        />
      </div>

      <div class="lg:col-span-6">
        <FormField
          label="Fecha de Nacimiento *"
          fieldType="date"
          :value="formData.birthDate"
          :status="getFieldStatus('birthDate')"
          @update:value="updateField('birthDate', $event)"
          @blur="validateField('birthDate')"
        />
      </div>
      <div class="lg:col-span-6">
        <FormField
          label="Tipo Documento *"
          fieldType="select"
          :options="documentTypes"
          :value="formData.documentType"
          :status="getFieldStatus('documentType')"
          @update:value="updateField('documentType', $event)"
          @blur="validateField('documentType')"
        />
      </div>

      <div class="lg:col-span-12">
        <FormField
          label="Número Documento *"
          fieldType="text"
          :value="formData.documentNumber"
          :status="getFieldStatus('documentNumber')"
          @update:value="updateField('documentNumber', $event)"
          @blur="validateField('documentNumber')"
        />
      </div>

      <div class="lg:col-span-6">
        <FileUploadField
          label="Foto Documento - Frente"
          :value="formData.documentFront"
          :status="getFieldStatus('documentFront')"
          @update:value="updateField('documentFront', $event)"
          @blur="validateField('documentFront')"
          accept=".jpg,.jpeg"
        />
      </div>
      <div class="lg:col-span-6">
        <FileUploadField
          label="Foto Documento - Reverso"
          :value="formData.documentBack"
          :status="getFieldStatus('documentBack')"
          @update:value="updateField('documentBack', $event)"
          @blur="validateField('documentBack')"
          accept=".jpg,.jpeg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { GENDER_OPTIONS, DOCUMENT_TYPES } from '../utils/constants'
import FormField from './common/FormField.vue'
import FileUploadField from './common/UploadField.vue'

export default {
  name: 'PersonalForm',
  components: {
    FormField,
    FileUploadField,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    getFieldStatus: {
      type: Function,
      required: true,
    },
  },
  emits: ['update:field', 'validate:field'],
  setup(props, { emit }) {
    const countries = ref([])
    const updateField = (field, value) => {
      emit('update:field', field, value)
    }

    const validateField = (field) => {
      emit('validate:field', field)
    }
    onMounted(async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name')
        const data = await response.json()
        countries.value = data.map((country) => country.name.common).sort()
      } catch (error) {
        console.error('Error al cargar países:', error)
      }
    })

    return {
      countries,
      genderOptions: GENDER_OPTIONS,
      documentTypes: DOCUMENT_TYPES,
      updateField,
      validateField,
    }
  },
}
</script>
