<script setup>
import { ref } from 'vue'
import { STAGES, useApplicationsStore } from '@/stores/applications.js'

const props = defineProps({
  app: { type: Object, required: true },
})

const store = useApplicationsStore()
const expanded = ref(false)

const stageColors = {
  'Wishlist':     'bg-gray-700 text-gray-300',
  'Applied':      'bg-blue-900/60 text-blue-300',
  'Phone Screen': 'bg-yellow-900/60 text-yellow-300',
  'Technical':    'bg-orange-900/60 text-orange-300',
  'Final Round':  'bg-purple-900/60 text-purple-300',
  'Offer':        'bg-green-900/60 text-green-300',
  'Rejected':     'bg-red-900/60 text-red-300',
}
</script>

<template>
  <div
    class="rounded-lg bg-gray-800 border border-gray-700 hover:border-brand/50 p-3 cursor-pointer transition-all"
    @click="expanded = !expanded"
  >
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0">
        <p class="font-medium text-sm truncate">{{ app.company }}</p>
        <p class="text-xs text-gray-400 truncate">{{ app.role }}</p>
      </div>
      <span class="text-lg">{{ expanded ? '▲' : '▼' }}</span>
    </div>

    <div v-if="expanded" class="mt-3 space-y-2" @click.stop>
      <p v-if="app.notes" class="text-xs text-gray-400 leading-relaxed">{{ app.notes }}</p>

      <a
        v-if="app.url"
        :href="app.url"
        target="_blank"
        rel="noopener"
        class="text-xs text-brand hover:underline block truncate"
      >
        {{ app.url }}
      </a>

      <div>
        <label class="block text-xs text-gray-500 mb-1">Move to stage</label>
        <select
          :value="app.stage"
          @change="store.move(app.id, $event.target.value)"
          class="w-full rounded bg-gray-700 border border-gray-600 px-2 py-1 text-xs"
        >
          <option v-for="s in STAGES" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <button
        @click="store.remove(app.id)"
        class="text-xs text-red-400 hover:text-red-300 transition-colors"
      >
        Remove
      </button>
    </div>

    <div class="mt-2">
      <span class="inline-block rounded px-2 py-0.5 text-[10px] font-medium" :class="stageColors[app.stage]">
        {{ app.stage }}
      </span>
    </div>
  </div>
</template>
