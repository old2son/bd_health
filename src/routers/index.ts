import { createRouter, createWebHashHistory } from 'vue-router';

const modules = import.meta.glob('@/views/**/*.vue');
const staticRoutes = [
	{
		path: '/',
		redirect: 'home',
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/Home.vue'),
	},
	/* {
		path: '/template/dr_202403041930',
		name: 'dr_202403041930',
		component: () => import('../views/template/dr_202403041930.vue'),
	}, */
];
const templateRoutes = [];
for (const path in modules) {
	const matchResult = path.match(/\/([^/]+)\.vue$/);
	if (matchResult) {
		const name = matchResult[1];
		templateRoutes.push({
			path: `/template/${name}`,
			name: name,
			component: modules[path]
		});
	} 
	else {
	  // Handle the case where there is no match
	}
	
}

const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRoutes, ...templateRoutes],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});



router.beforeEach((to, from, next) => {
	if (to.matched.length === 0) {
		next({ name : 'home' });
	}
	else {
		next();
	}
});

export default router;
