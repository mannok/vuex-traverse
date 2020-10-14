import { createApp } from 'vue';
import { router } from './router';
import store from './store';
import App from './App.vue';

const app = createApp(App);

app.use(router).use(store);

router.isReady().then(async () => {
	window.vm = app.mount('#app');
});
