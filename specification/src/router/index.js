import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../views/Hello'
import Specification from '../views/Specification.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path:'/specification',
      name:'Specification',
      component:Specification
    }
  ]
})
