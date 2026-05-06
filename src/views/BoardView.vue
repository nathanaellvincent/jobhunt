<script setup>
import { ref } from 'vue'
import { STAGES, useApplicationsStore } from '@/stores/applications.js'
import AppCard from '@/components/AppCard.vue'
import AddModal from '@/components/AddModal.vue'

const store = useApplicationsStore()
const showModal = ref(false)
</script>

<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold">Pipeline</h1>
      <button
        @click="showModal = true"
        class="rounded-lg bg-brand hover:bg-brand-dark px-4 py-2 text-sm font-medium transition-colors"
      >
        + Add Application
      </button>
    </div>

    <!-- Kanban board — horizontal scroll on small screens -->
    <div class="flex gap-3 overflow-x-auto pb-4">
      <div
        v-for="stage in STAGES"
        :key="stage"
        class="flex-shrink-0 w-56"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">{{ stage }}</span>
          <span class="text-xs bg-gray-800 rounded-full px-2 py-0.5 text-gray-300">
            {{ store.byStage[stage]?.length ?? 0 }}
          </span>
        </div>

        <div class="space-y-2 min-h-[4rem]">
          <AppCard
            v-for="app in store.byStage[stage]"
            :key="app.id"
            :app="app"
          />
          <p
            v-if="!store.byStage[stage]?.length"
            class="text-xs text-gray-600 italic text-center py-4 border border-dashed border-gray-800 rounded-lg"
          >
            Empty
          </p>
        </div>
      </div>
    </div>

    <AddModal :open="showModal" @close="showModal = false" @submit="store.add" />
  </div>
</template>
