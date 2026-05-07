<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useApplicationsStore } from '@/stores/applications.js'

const store = useApplicationsStore()
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-gray-100">
    <!-- Navbar -->
    <nav class="border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <span class="font-bold tracking-tight">
        JobHunt
        <span class="text-xs text-gray-500 font-normal ml-1">by Vincent Nathanael</span>
      </span>

      <div class="flex items-center gap-1">
        <RouterLink
          to="/"
          class="px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-800"
          active-class="bg-gray-800 text-brand"
        >
          Board
        </RouterLink>
        <RouterLink
          to="/stats"
          class="px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-800"
          active-class="bg-gray-800 text-brand"
        >
          Stats
        </RouterLink>
        <span class="ml-3 text-xs text-gray-500">{{ store.stats.total }} apps</span>
      </div>
    </nav>

    <RouterView />
  </div>
</template>
