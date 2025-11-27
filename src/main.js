import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

import "./assets/styles/styles.less";

const app = createApp(App);

app.use(createPinia()); //  (一定要在 app.use(router) 之前或者之后都行，挂上就行)
app.use(router);
app.mount("#app");
