import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ordered from "../views/Ordered";
import Search from "../views/Search";
import Orderdetails from "../views/Orderdetails";
import shoppingCart from "../components/shoppingCart";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/order',
    name: 'order',
    meta:{
      title:'提交订单'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
  },
  {
    path: '/ordered',
    name: 'ordered',
    component: Ordered,
    meta:{
      title:'下单成功'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta:{
      title:'搜索'
    }
  },
  {
    path: '/orderdetails',
    name: 'orderdetails',
    component: Orderdetails,
    meta:{
      title:'订单详情'
    }
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to,from,next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default router
