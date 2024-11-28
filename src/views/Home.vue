<template>
    <div id="app">
      <AtpPlayerList />
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <Chart />
          </div>
          <div class="col-md-6">
            <PlayerChart :baseURL="baseURL"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import AtpPlayerList from "./AtpPlayerList.vue";
import Chart from '../components/Chart.vue';
import PlayerChart from '../components/PlayerChart.vue'

export default {
  name: "HomeView",
  components: {
    AtpPlayerList,
    Chart,
    PlayerChart
  },
  props : [ "baseURL"],
  data() {
    return {
    }
  },
  mounted() {
  }
};
</script>