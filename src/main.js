// Bootstrap's CSS comes from npm now instead of a CDN link
import 'bootstrap/dist/css/bootstrap.min.css';
// Our few custom styles load AFTER Bootstrap so they win any ties
import '@/assets/app.css';

import { createApp } from 'vue';
import App from '@/App.vue';

createApp(App).mount('#app');
