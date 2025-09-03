<template>
  <div class="fade">
    <h2 class="text-2xl font-bold text-primary-800 mb-6 flex items-center">
      <span
        class="bg-primary-500 text-gray-950 rounded-full w-8 h-8 flex items-center justify-center mr-3"
        >3.</span
      >
      Información de Dirección
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Dirección de Residencia *"
        fieldType="text"
        :value="formData.address"
        :status="getFieldStatus('address')"
        @update:value="updateField('address', $event)"
        @blur="validateField('address')"
        class="md:col-span-2"
      />

      <FormField
        label="Código Postal *"
        fieldType="text"
        :value="formData.postalCode"
        :status="getFieldStatus('postalCode')"
        @update:value="updateField('postalCode', $event)"
        @blur="validateField('postalCode')"
      />
    </div>

    <div class="mt-6 flex items-start">
      <div class="flex items-center h-5">
        <input
          id="terms"
          type="checkbox"
          :checked="formData.terms"
          @change="updateField('terms', $event.target.checked)"
          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
        />
      </div>
      <div class="ml-3 text-sm">
        <label for="terms" class="font-medium text-gray-700"
          >Acepto los términos y condiciones</label
        >
        <p class="text-gray-500">
          Acepto el procesamiento de mis datos de acuerdo con la Política de Privacidad.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import FormField from './common/FormField.vue'

export default {
  name: 'AddressForm',
  components: {
    FormField,
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
    const updateField = (field, value) => {
      emit('update:field', field, value)
    }

    const validateField = (field) => {
      emit('validate:field', field)
    }

    return {
      updateField,
      validateField,
    }
  },
}
</script>
