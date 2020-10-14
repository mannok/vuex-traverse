<template>
	<div>hello world</div>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount, onMounted, reactive, markRaw } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setup(): any {
		const store = useStore();

		const vm = reactive({
			obj: null as any
		});

		onMounted(() => {
			const obj = { foo: {} };
			Object.defineProperty(obj.foo, 'parent', {
				get() {
					console.log('THIS MSG IS SHOWN WHEN IT WAS SET ON STATE!');
					return obj.foo;
				},
				enumerable: true
			});

			store.dispatch('setObj', markRaw(obj)); // THIS LINE MAKES VUEX TRAVERSE DOWN TO obj.foo.parent's GETTER SO THAT LOG MSG IS SHOWN
			// vm.obj = markRaw(obj); // (PLEASE UNCOMMENT THIS LINE)	// THIS LINE WON'T MAKE VUE TRAVERSE DOWN obj's PROPERTIES AND GETTER WON'T BE FIRED
		});

		return vm;
	}
};
</script>

<style scoped lang="scss"></style>
