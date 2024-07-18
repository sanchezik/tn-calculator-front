import Vue from 'vue';
import VueRouter from 'vue-router';
import PageProfile from '../components/PageOne.vue';
import PageCalc from '../components/PageOne.vue';
import PageHistory from '../components/PageOne.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/profile', component: PageProfile },
  { path: '/calculate', component: PageCalc },
  { path: '/history', component: PageHistory },
];

const router = new VueRouter({
  routes,
});

export default router;
