import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Companies from './views/Companies.vue'
import People from './views/People.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies
    },
    {
      path: '/people',
      name: 'people',
      component: People
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
