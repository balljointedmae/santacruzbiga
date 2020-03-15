import Vue from "vue";
import VueApollo from 'vue-apollo'
import App from "./Hello";
import { apolloClient } from "./apollo";

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  el: "#app",
  apolloProvider,
  template: "<App/>",
  components: { App }
});
