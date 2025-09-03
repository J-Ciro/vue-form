<template>
  <transition name="modal">
    <div
      v-show="isVisible"
      class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-center transform transition-all duration-300 modal-content"
      >
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <i class="fas fa-check text-green-500 text-2xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">¡Registro Exitoso!</h3>
        <p class="text-gray-600 mb-6">
          Tus datos han sido registrados con éxito en nuestro sistema.
        </p>
        <button
          @click="$emit('close')"
          class="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition"
        >
          Aceptar
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SuccessModal',
  emits: ['close'],
  props: {
    isVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
