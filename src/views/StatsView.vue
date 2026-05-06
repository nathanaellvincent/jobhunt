<script setup>
import { computed } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from 'chart.js'
import { STAGES, useApplicationsStore } from '@/stores/applications.js'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale, ArcElement)

const store = useApplicationsStore()

const barData = computed(() => ({
  labels: STAGES,
  datasets: [{
    label: 'Applications',
    data: STAGES.map(s => store.byStage[s]?.length ?? 0),
    backgroundColor: '#6366f1',
    borderRadius: 6,
  }],
}))

const barOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
    y: { ticks: { color: '#9ca3af', stepSize: 1 }, grid: { color: '#1f2937' } },
  },
}

const doughnutData = computed(() => ({
  labels: ['Active', 'Offers', 'Rejected'],
  datasets: [{
    data: [store.stats.active, store.stats.offers, store.stats.rejected],
    backgroundColor: ['#6366f1', '#22c55e', '#ef4444'],
    borderWidth: 0,
  }],
}))

const doughnutOptions = {
  responsive: true,
  plugins: { legend: { labels: { color: '#d1d5db' } } },
}
</script>

<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-xl font-bold mb-6">Statistics</h1>

    <!-- KPI cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      <div class="rounded-xl bg-gray-900 border border-gray-700 p-4 text-center">
        <p class="text-3xl font-bold text-brand">{{ store.stats.total }}</p>
        <p class="text-xs text-gray-400 mt-1">Total</p>
      </div>
      <div class="rounded-xl bg-gray-900 border border-gray-700 p-4 text-center">
        <p class="text-3xl font-bold text-indigo-400">{{ store.stats.active }}</p>
        <p class="text-xs text-gray-400 mt-1">Active</p>
      </div>
      <div class="rounded-xl bg-gray-900 border border-gray-700 p-4 text-center">
        <p class="text-3xl font-bold text-green-400">{{ store.stats.offers }}</p>
        <p class="text-xs text-gray-400 mt-1">Offers</p>
      </div>
      <div class="rounded-xl bg-gray-900 border border-gray-700 p-4 text-center">
        <p class="text-3xl font-bold text-yellow-400">{{ store.stats.conversionRate }}%</p>
        <p class="text-xs text-gray-400 mt-1">Conversion</p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="rounded-xl bg-gray-900 border border-gray-700 p-4">
        <p class="text-sm font-medium mb-3 text-gray-300">Applications per Stage</p>
        <Bar :data="barData" :options="barOptions" />
      </div>
      <div class="rounded-xl bg-gray-900 border border-gray-700 p-4 flex flex-col items-center">
        <p class="text-sm font-medium mb-3 text-gray-300 self-start">Status Breakdown</p>
        <Doughnut :data="doughnutData" :options="doughnutOptions" class="max-h-52" />
      </div>
    </div>
  </div>
</template>
