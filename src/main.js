import { createApp } from "vue";
import App from "./App.vue";
import components from "./components/ui";
import router from "./router/router";
import Vintersection from "./directives/Vintersection";
import directives from "./directives";
import store from "./store";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

directives.forEach((elem) => {
  app.directive(elem.name, elem);
});

app.use(router);
app.use(store);

app.mount("#app");
