<template>
    <div id="app" style="text-align: center;">
      <div class="container">
        <h1>ATP Player</h1>
        <div class="row">
          <PlayerChart :baseURL="baseURL"/>
        </div>
        <div class="row">
          <div class="col-12">
            <AtpPlayerList />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import AtpPlayerList from "./AtpPlayerList.vue";
// import Chart from '../components/Chart.vue';
import PlayerChart from '../components/PlayerChart.vue'

export default {
  name: "HomeView",
  components: {
    AtpPlayerList,
    // Chart,
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