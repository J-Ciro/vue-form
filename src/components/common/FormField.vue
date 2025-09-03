<template>
  <div class="relative">
    <select
      v-if="fieldType === 'select'"
      :value="value"
      @change="$emit('update:value', $event.target.value)"
      @focus="handleFocus"
      @blur="handleBlur"
      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
      :class="fieldClasses"
    >
      <option value="" disabled selected></option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>

    <input
      v-else
      :type="fieldType"
      :value="value"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
      :class="fieldClasses"
      placeholder=" "
    />

    <label
      class="absolute left-4 text-gray-500 pointer-events-none transition-all duration-200"
      :class="{
        'opacity-0 scale-75': hasValue || isFocused,
        'opacity-100 top-1/2 transform -translate-y-1/2': !hasValue && !isFocused,
      }"
    >
      {{ label }}
    </label>

    <div class="absolute right-3 top-3.5 text-lg" :class="statusIconClass">
      <i v-if="status === 'valid'" class="fas fa-check-circle"></i>
      <i v-else-if="status === 'invalid'" class="fas fa-times-circle"></i>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'FormField',
  props: {
    label: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
      required: true,
      validator: (value) =>
        ['text', 'email', 'tel', 'password', 'date', 'select', 'checkbox'].includes(value),
    },
    value: {
      type: [String, Number, Boolean, Date],
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    status: {
      type: String,
      default: 'untouched',
      validator: (value) => ['untouched', 'valid', 'invalid'].includes(value),
    },
  },
  emits: ['update:value', 'focus', 'blur'],
  setup(props, { emit }) {
    const isFocused = ref(false)
    const hasValue = computed(() => {
      return props.value !== null && props.value !== undefined && props.value !== ''
    })

    const fieldClasses = computed(() => {
      switch (props.status) {
        case 'valid':
          return 'border-green-500'
        case 'invalid':
          return 'border-red-500'
        default:
          return 'border-gray-300'
      }
    })

    const statusIconClass = computed(() => {
      switch (props.status) {
        case 'valid':
          return 'text-green-500'
        case 'invalid':
          return 'text-red-500'
        default:
          return 'text-gray-400'
      }
    })

    const handleFocus = (event) => {
      isFocused.value = true
      emit('focus', event)
    }

    const handleBlur = (event) => {
      isFocused.value = false
      emit('blur', event)
    }

    const handleInput = (event) => {
      emit('update:value', event.target.value)
    }

    return {
      isFocused,
      hasValue,
      fieldClasses,
      statusIconClass,
      handleFocus,
      handleBlur,
      handleInput,
    }
  },
}
</script>
