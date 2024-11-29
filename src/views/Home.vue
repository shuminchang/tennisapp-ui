<template>
    <div id="app" style="text-align: center;">
      <div class="container">
        <h1>ATP Player</h1>
        <div class="row">
          <div class="col-md-6">
            <AtpPlayerList />
          </div>
          <div class="col-md-6">
            <div>
              <Chart />
            </div>
            <div>
              <PlayerChart :baseURL="baseURL"/>
            </div>
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