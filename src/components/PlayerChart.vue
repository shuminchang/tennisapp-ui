<template>
  <div class="col-6 chart-container">
    <Pie v-if="chartData" :data="chartData" :options="options" />
  </div>
  <div class="col-6 chart-container">
    <Scatter v-if="scatterData" :data="scatterData" :options="scatterOptions" />
  </div>
  <div class="col-6 chart-container">
    <Bar v-if="barChartData" :data="barChartData" :options="barChartOptions" />
  </div>
  <div class="col-6 chart-container">
    <Scatter v-if="clusterData" :data="clusterData" :options="clusterOptions" />
  </div>
</template>

<script>
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, CategoryScale, BarElement } from 'chart.js'
import { Pie, Scatter, Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, CategoryScale, BarElement)

export default {
  name: 'PlayerChart',
  components: {
    Pie,
    Scatter,
    Bar
  },
  props : [ "baseURL"],
  data() {
    return {
      chartData: null,
      scatterData: null,
      barChartData: null,
      clusterData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      scatterOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Height (cm)' },
          },
          y: {
            title: { display: true, text: 'Age' }
          }
        }
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category', // Explicitly define the x-axis as a category scale
            title: { display: true, text: 'Height Range (cm)' }
          },
          y: {
            title: { display: true, text: 'Number of Players' }
          }
        }
      },
      clusterOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Age' }
                },
                y: {
                    title: { display: true, text: 'Height (cm)' }
                }
            }
        }
    }
  },
  mounted() {
    this.fetchChartData()
    this.fetchScatterData()
    this.fetchHeightDistribution()
    this.fetchPlayerHeightAgeHandClusters(3)
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
    },
    async fetchScatterData() {
      try {
        const response = await axios.get(`${this.baseURL}api/height-vs-age`)
        const apiData = response.data

        const data = apiData.map(item => ({
          x: item.height,
          y: item.age
        }))

        this.scatterData = {
          datasets: [
            {
              label: 'Height vs Age',
              data,
              backgroundColor: '#00D8FF'
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching scatter data:', error)
      }
    },
    async fetchHeightDistribution() {
      try {
        const response = await axios.get(`${this.baseURL}api/height-distribution`)
        const apiData = response.data

        const labels = Object.keys(apiData)
        const data = Object.values(apiData)

        this.barChartData = {
          labels,
          datasets: [
            {
              label: 'Player Height Distribution',
              backgroundColor: '#41B883',
              data
            }
          ]
        }
      } catch (error) {
        console.error('Error fetching height distribution:', error)
      }
    },
    async fetchPlayerHeightAgeHandClusters(numClusters = 3) {
        try {
            const response = await axios.get(`${this.baseURL}api/player-height-age-hand-clusters`, {
                params: { numClusters }
            });
            const apiData = response.data;

            // Group data by cluster
            const clusters = {};
            apiData.forEach(item => {
                const cluster = item.cluster;
                if (!clusters[cluster]) {
                    clusters[cluster] = { label: `Cluster ${cluster}`, data: [], backgroundColor: this.getRandomColor() };
                }
                clusters[cluster].data.push({ x: item.age, y: item.height });
            });

            this.clusterData = {
                datasets: Object.values(clusters)
            };
        } catch (error) {
            console.error('Error fetching player clusters:', error);
        }
    },
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
  }
}
</script>
<style>
.chart-container {
  margin: 20px 0;
  min-height: 400px; /* Increase height for better visibility */
}
</style>