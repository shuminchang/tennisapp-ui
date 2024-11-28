import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import CanvasJSChart from 'vue-chartjs';

const app = createApp(App)
app.use(router)
app.use(CanvasJSChart);
app.mount("#app");
