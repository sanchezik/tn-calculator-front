import Vue from 'vue';
import VueRouter from 'vue-router';
import PageProfile from '../components/PageProfile.vue';
import PageCalc from '../components/PageCalc.vue';
import PageHistory from '../components/PageHistory.vue';

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
