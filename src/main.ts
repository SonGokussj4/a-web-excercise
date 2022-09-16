import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "./assets/main.css";

import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
    expireTimes: "1h",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

const app = createApp(App);

app.use(router);

app.mount("#app");
