import { createRouter, createWebHistory } from 'vue-router';

// import store from '../store';
// import { plugin as axios } from '../plugins/axios';

import App from '@/App.vue';

// let initialized = false;

// const hist = new HTML5History()
// const hist = new HashHistory()
export const routerHistory = createWebHistory();

export const router = createRouter({
	history: routerHistory,
	routes: [
		{
			name: 'app',
			path: '/',
			component: App,
			meta: {}
		}
	]
});

// router.beforeEach(async (to, from, next) => {
// 	if (!initialized) {
// 		const token = Cookies.get('token');

// 		if (token) {
// 			await store.dispatch('renewToken', [token]);

// 			const userProfile = (await axios.get('api/user/Users')).data.data;
// 			await store.dispatch('setUserProfile', [userProfile]);
// 		}
// 	}

// 	initialized = true;

// 	next();
// });

const dirLog = {
	'': '？',
	back: '⏪',
	forward: '⏩'
};
routerHistory.listen((to, from, info) => {
	console.log(`${dirLog[info.direction]} as a ${info.type}`);
});
