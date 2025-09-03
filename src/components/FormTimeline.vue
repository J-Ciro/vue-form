<template>
  <div
    class="bg-white rounded-2xl shadow-xs p-8 mb-8 relative overflow-hidden border border-gray-100"
  >
    <div
      class="absolute inset-0 bg-gradient-to-r from-primary-50/20 to-secondary-50/20 opacity-30"
    ></div>

    <div class="flex justify-between relative z-10">
      <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center relative">
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center mb-3 relative transition-all duration-300 z-10"
          :class="[
            currentStep > index
              ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg'
              : currentStep === index
                ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-gray-600 shadow-lg ring-3 ring-primary-100'
                : 'bg-white border-2 border-gray-300 text-gray-400 shadow',
          ]"
        >
          <span v-if="currentStep > index" class="text-xl">
            <i class="fas fa-check-circle"></i>
          </span>
          <span v-else class="text-lg font-semibold">
            {{ index + 1 }}
          </span>
        </div>

        <span
          class="text-sm font-semibold text-center transition-all duration-300"
          :class="[currentStep >= index ? 'text-gray-800' : 'text-gray-500']"
        >
          {{ step }}
        </span>
      </div>
    </div>

    <div class="text-center mt-6 text-sm text-gray-600 font-medium">
      Paso {{ currentStep + 1 }} de {{ steps.length }}: {{ steps[currentStep] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormTimeline',
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.progress-bar {
  transition: width 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}
</style>
