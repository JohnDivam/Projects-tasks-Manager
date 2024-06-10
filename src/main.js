import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import routers from './routers'

const vuetify = createVuetify({
    components,
    directives,
});

app = createApp(App);
app.use(vuetify);
app.use(routers);
app.mount('#app');