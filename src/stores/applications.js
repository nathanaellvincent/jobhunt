import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const STAGES = [
  'Wishlist',
  'Applied',
  'Phone Screen',
  'Technical',
  'Final Round',
  'Offer',
  'Rejected',
]

const STORAGE_KEY = 'jobhunt:applications'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export const useApplicationsStore = defineStore('applications', () => {
  const items = ref(load())

  function add(app) {
    items.value.push({
      id: crypto.randomUUID(),
      stage: 'Wishlist',
      createdAt: new Date().toISOString(),
      notes: '',
      ...app,
    })
    save(items.value)
  }

  function move(id, stage) {
    const app = items.value.find(a => a.id === id)
    if (app) {
      app.stage = stage
      app.updatedAt = new Date().toISOString()
      save(items.value)
    }
  }

  function update(id, patch) {
    const app = items.value.find(a => a.id === id)
    if (app) {
      Object.assign(app, patch, { updatedAt: new Date().toISOString() })
      save(items.value)
    }
  }

  function remove(id) {
    items.value = items.value.filter(a => a.id !== id)
    save(items.value)
  }

  // Grouped by stage — drives the Kanban board
  const byStage = computed(() =>
    Object.fromEntries(
      STAGES.map(s => [s, items.value.filter(a => a.stage === s)])
    )
  )

  // Summary stats
  const stats = computed(() => {
    const total = items.value.length
    const active = items.value.filter(
      a => !['Offer', 'Rejected'].includes(a.stage)
    ).length
    const offers = items.value.filter(a => a.stage === 'Offer').length
    const rejected = items.value.filter(a => a.stage === 'Rejected').length
    const conversionRate =
      total > 0 ? Math.round((offers / total) * 100) : 0

    return { total, active, offers, rejected, conversionRate }
  })

  return { items, add, move, update, remove, byStage, stats }
})
