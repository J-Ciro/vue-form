<template>
  <div
    id="app"
    class="bg-stone-300 background-img bg-gradient-to-br from-primary-50 to-primary-100 min-h-screen flex items-center justify-center p-4 font-sans"
  >
    <div class="w-full max-w-4xl">
      <FormTimeline :current-step="currentStep" :steps="steps" :progress-width="progressWidth" />

      <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div class="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white text-center">
          <h1 class="text-3xl font-bold text-gray-950">REGISTRO DE USUARIO</h1>
          <p class="mt-2 text-gray-950">Completa tus datos en nuestro sistema</p>
        </div>

        <form @submit.prevent="submitForm" class="p-8">
          <PersonalForm
            v-if="currentStep === 0"
            :form-data="formData"
            :get-field-status="getFieldStatus"
            @update:field="updateField"
            @validate:field="validateField"
          />

          <ContactForm
            v-if="currentStep === 1"
            :form-data="formData"
            :get-field-status="getFieldStatus"
            @update:field="updateField"
            @validate:field="validateField"
          />

          <AddressForm
            v-if="currentStep === 2"
            :form-data="formData"
            :get-field-status="getFieldStatus"
            @update:field="updateField"
            @validate:field="validateField"
          />

          <div class="flex justify-between mt-8">
            <button
              type="button"
              @click="prevStep"
              v-if="currentStep > 0"
              class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition flex items-center"
            >
              <i class="fas fa-arrow-left mr-2"></i> Anterior
            </button>
            <div v-else></div>

            <button
              type="button"
              @click="nextStep"
              v-if="currentStep < 2"
              :class="[
                isStepValid()
                  ? 'bg-green-500 hover:bg-primary-600 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed',
              ]"
              class="px-6 py-3 text-white rounded-lg font-medium transition flex items-center"
              :disabled="!isStepValid()"
            >
              Siguiente <i class="fas fa-arrow-right ml-2"></i>
            </button>

            <button
              type="submit"
              v-if="currentStep === 2"
              :class="[
                isStepValid && formData.terms
                  ? ' hover:bg-green-600 text-white bg-green-500 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed ',
              ]"
              class="px-6 py-3 text-gray-600 rounded-lg font-medium transition flex items-center"
              :disabled="!isStepValid || !formData.terms"
            >
              Enviar Registro <i class="fas fa-paper-plane ml-2"></i>
            </button>
          </div>
        </form>
      </div>

      <SuccessModal :is-visible="showSuccessModal" @close="showSuccessModal = false" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useForm } from './composables/useForm'
import { STEPS } from './utils/constants'
import FormTimeline from './components/FormTimeline.vue'
import AddressForm from './components/Address.vue'
import ContactForm from './components/Contact.vue'
import PersonalForm from './components/Personal.vue'
import SuccessModal from './components/SuccessModal.vue'

export default {
  name: 'App',
  components: {
    FormTimeline,
    PersonalForm,
    ContactForm,
    AddressForm,
    SuccessModal,
  },
  setup() {
    const currentStep = ref(0)
    const showSuccessModal = ref(false)

    const { formData, validateFormField, isStepValid, getFieldStatus } = useForm()
    const steps = STEPS

    const progressWidth = computed(() => {
      return ((currentStep.value + 1) / steps.length) * 100 + '%'
    })

    const updateField = (field, value) => {
      formData[field] = value
    }

    const validateField = (field) => {
      validateFormField(field)
    }

    const nextStep = () => {
      if (isStepValid(currentStep.value)) {
        currentStep.value++
      }
    }

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--
      }
    }

    const fileJsonfy = (key, value) => {
      if (value instanceof File) {
        return {
          name: value.name,
          size: value.size,
          type: value.type,
          lastModified: value.lastModified,
          lastModifiedDate: value.lastModifiedDate?.toString(),
          _isFile: true,
        }
      }
      return value
    }

    const submitForm = () => {
      if (isStepValid(currentStep.value) && formData.terms) {
        console.log('---------- Datos del formulario: ----------')
        console.log(JSON.stringify(formData, fileJsonfy, 2))

        showSuccessModal.value = true
      }
    }

    return {
      currentStep,
      showSuccessModal,
      formData,
      steps,
      progressWidth,
      updateField,
      validateField,
      getFieldStatus,
      isStepValid: () => isStepValid(currentStep.value),
      nextStep,
      prevStep,
      submitForm,
    }
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.progress-bar {
  transition: width 0.5s ease-in-out;
}
.floating-label {
  transform: translateY(-50%);
  transition: all 0.3s ease;
}
.input-focused ~ label,
.input-filled ~ label {
  top: 0;
  left: 0.75rem;
  font-size: 0.75rem;
  background: white;
  padding: 0 0.5rem;
  color: #7dd3fc;
}
</style>
