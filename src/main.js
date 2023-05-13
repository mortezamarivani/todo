import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// add by me
import  'bootstrap/dist/js/bootstrap.bundle'
import  'bootstrap/dist/css/bootstrap.min.css'

// main.js
// import './index.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

app.use(VueSweetalert2);
app.use(router)

app.mount('#app')
