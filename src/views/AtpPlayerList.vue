<template>
    <div>
      <h1>ATP Player List</h1>
      <ul>
        <li v-for="player in players" :key="player.id">
          {{ player.nameFirst }} {{ player.nameLast }} ({{ player.hand }})
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: "AtpPlayerList",
    data() {
      return {
        baseURL: "http://localhost:8080/",
        players: null,
      };
    },
    methods: {
      async fetchData() {
        await axios.get(`${this.baseURL}api/players`)
        .then((res) => {
          this.players = res.data;
        })
        .catch((err) => console.log(err));
      }
    },
    mounted() {
      this.fetchData();
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: #42b983;
  }
  </style>
  