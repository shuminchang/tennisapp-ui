<template>
  <div>
    <Pie v-if="chartData" :data="chartData" :options="options" />
  </div>
</template>

<script>
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PlayerChart',
  components: {
    Pie
  },
  props : [ "baseURL"],
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get(`${this.baseURL}api/player-by-hand`) // Adjust the URL if necessary
        const apiData = response.data

        // Transform API response to Chart.js format
        const labels = apiData.map(item => item.hand)
        const data = apiData.map(item => item.count)

        this.chartData = {
          labels,
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'], // Adjust colors as needed
              data
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }
  }
}
</script>
