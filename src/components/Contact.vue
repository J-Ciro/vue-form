<template>
  <div class="fade">
    <h2 class="text-2xl font-bold text-primary-800 mb-6 flex items-center">
      <span
        class="bg-primary-500 text-gray rounded-full w-8 h-8 flex items-center justify-center mr-3"
        >2.</span
      >
      Información de Contacto
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Correo Electrónico *"
        fieldType="email"
        :value="formData.email"
        :status="getFieldStatus('email')"
        @update:value="updateField('email', $event)"
        @blur="validateField('email')"
      />

      <div class="relative">
        <FormField
          label="Contraseña *"
          :fieldType="showPassword ? 'text' : 'password'"
          :value="formData.password"
          :status="getFieldStatus('password')"
          @update:value="updatePassword"
          @blur="validateField('password')"
        />
        <div class="absolute right-10 top-3.5 cursor-pointer" @click="showPassword = !showPassword">
          <i :class="[showPassword ? 'fas fa-eye-slash' : 'fas fa-eye']" class="text-gray-400"></i>
        </div>
      </div>

      <div class="relative">
        <FormField
          label="Confirmar Contraseña *"
          :fieldType="showConfirmPassword ? 'text' : 'password'"
          :value="formData.confirmPassword"
          :status="getFieldStatus('confirmPassword')"
          @update:value="updateField('confirmPassword', $event)"
          @blur="validateField('confirmPassword')"
        />
        <div
          class="absolute right-10 top-3.5 cursor-pointer"
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <i
            :class="[showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"
            class="text-gray-400"
          ></i>
        </div>
      </div>

      <FormField
        label="Teléfono Fijo"
        fieldType="tel"
        :value="formData.phone"
        :status="getFieldStatus('phone')"
        @update:value="updateField('phone', $event)"
        @blur="validateField('phone')"
      />

      <FormField
        label="Teléfono Celular *"
        fieldType="tel"
        :value="formData.cellphone"
        :status="getFieldStatus('cellphone')"
        @update:value="updateField('cellphone', $event)"
        @blur="validateField('cellphone')"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import FormField from './common/FormField.vue'

export default {
  name: 'ContactForm',
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
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)

    const updateField = (field, value) => {
      emit('update:field', field, value)
    }

    const updatePassword = (value) => {
      emit('update:field', 'password', value)
      if (props.formData.confirmPassword) {
        setTimeout(() => {
          emit('validate:field', 'confirmPassword')
        }, 100)
      }
    }

    const validateField = (field) => {
      emit('validate:field', field)
    }

    return {
      showPassword,
      showConfirmPassword,
      updateField,
      updatePassword,
      validateField,
    }
  },
}
</script>
