<template>
  <div id="app">
    <router-view
      :baseURL="baseURL"
      >
    </router-view>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      baseURL: "http://localhost:8080/",
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>
