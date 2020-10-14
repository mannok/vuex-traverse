import { createStore, Dispatch } from 'vuex';

import { router } from '../router';

import { markRaw, shallowReactive, toRaw, unref } from 'vue';

export const state = {
	obj: null
};

export default createStore({
	strict: true,
	modules: {
		// stock
	},
	state,
	getters: {},
	mutations: {
		setObj(state: any, obj: any[]): void {
			state.obj = obj;
		}
	},
	actions: {
		setObj({ commit }, obj): void {
			commit('setObj', obj);
		}
	}
});
