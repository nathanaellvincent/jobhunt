<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close', 'submit'])

const form = ref(defaultForm())

function defaultForm() {
  return { company: '', role: '', url: '', notes: '', stage: 'Wishlist' }
}

watch(() => props.open, open => {
  if (open) form.value = defaultForm()
})

function submit() {
  if (!form.value.company || !form.value.role) return
  emit('submit', { ...form.value })
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div class="w-full max-w-md rounded-xl bg-gray-900 border border-gray-700 p-6 shadow-2xl">
        <h2 class="text-lg font-semibold mb-4">Add Application</h2>

        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-400 mb-1">Company *</label>
            <input
              v-model="form.company"
              placeholder="e.g. Sea Labs"
              class="w-full rounded-lg bg-gray-800 border border-gray-600 px-3 py-2 text-sm focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">Role *</label>
            <input
              v-model="form.role"
              placeholder="e.g. Backend Engineer"
              class="w-full rounded-lg bg-gray-800 border border-gray-600 px-3 py-2 text-sm focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">Job URL</label>
            <input
              v-model="form.url"
              placeholder="https://..."
              class="w-full rounded-lg bg-gray-800 border border-gray-600 px-3 py-2 text-sm focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Tech stack, recruiter name, deadline…"
              class="w-full rounded-lg bg-gray-800 border border-gray-600 px-3 py-2 text-sm focus:outline-none focus:border-brand resize-none"
            />
          </div>
        </div>

        <div class="flex gap-2 mt-5">
          <button
            @click="submit"
            class="flex-1 rounded-lg bg-brand hover:bg-brand-dark py-2 text-sm font-medium transition-colors"
          >
            Add
          </button>
          <button
            @click="emit('close')"
            class="flex-1 rounded-lg bg-gray-700 hover:bg-gray-600 py-2 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
