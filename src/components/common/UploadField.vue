<template>
  <div class="relative">
    <div
      class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors bg-cover bg-center bg-no-repeat min-h-[200px] flex flex-col justify-center"
      :style="previewUrl ? { backgroundImage: `url(${previewUrl})` } : {}"
      :class="[
        status === 'valid'
          ? 'border-green-500'
          : status === 'invalid'
            ? 'border-red-500'
            : 'border-gray-300 hover:border-primary-300',
      ]"
      @click="triggerFileInput"
    >
      <div v-if="previewUrl" class="absolute inset-0 backdrop-blur-xs rounded-lg bg-black/30"></div>

      <div class="relative z-10 rounded-lg" :class="textColors">
        <input
          type="file"
          ref="fileInput"
          :accept="accept"
          @change="handleFileChange"
          class="hidden"
        />
        <i class="fas fa-cloud-upload-alt text-3xl mb-2"></i>
        <p class="font-medium">{{ label }}</p>
        <p class="text-sm text-opacity-75">Formato {{ accept.replace('.', '').toUpperCase() }}</p>
        <p v-if="value" class="text-sm mt-2">{{ value.name }}</p>
        <p v-else class="text-sm mt-2 text-opacity-75">Haz clic para seleccionar un archivo</p>
      </div>
    </div>
    <div
      class="absolute right-3 top-3 text-lg"
      :class="[status === 'valid' ? 'text-green-500' : 'text-red-500']"
    >
      <i v-if="status === 'valid'" class="fas fa-check-circle"></i>
      <i v-else-if="status === 'invalid'" class="fas fa-times-circle"></i>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'FileUploadField',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [File, null],
      default: null,
    },
    status: {
      type: String,
      default: 'untouched',
      validator: (value) => ['untouched', 'valid', 'invalid'].includes(value),
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png',
    },
  },
  emits: ['update:value', 'blur'],
  setup(props, { emit }) {
    const fileInput = ref(null)

    const previewUrl = computed(() => {
      return props.value ? URL.createObjectURL(props.value) : null
    })

    const textColors = computed(() => ({
      'text-white': previewUrl.value,
      'text-gray-600': !previewUrl.value,
    }))

    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        const acceptedTypes = props.accept.split(',').map((type) => type.trim())
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase()

        if (acceptedTypes.includes(fileExtension)) {
          emit('update:value', file)
          emit('blur')
        } else {
          alert(
            `Por favor, selecciona un archivo con formato ${props.accept.replace('.', '').toUpperCase()}`,
          )
          event.target.value = ''
        }
      }
    }

    return {
      fileInput,
      previewUrl,
      triggerFileInput,
      handleFileChange,
      textColors,
    }
  },
}
</script>
