import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {get_csrf} from '../api/auth.js' ;

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/Auth.vue'),
    children:[
      {
        path: 'login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "auth" */ '@/components/Auth/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "auth" */ '@/components/Auth/Register.vue')
      },
    ]

  },


  {
  path:'/meds',
  component:{
    template:'<router-view />'
  },

  children:[
    {
      path:'',
      name:'med-list',
      component:() => import(/* webpackChunkName: "meds" */ '../components/Meds/MedList.vue'),
    },

    {
      path:'add',
      name:'add-med',
      component:() => import(/* webpackChunkName: "meds" */ '../views/AddMeds.vue'),
    },

    {
      path:'prescriptions',
      name:'prescriptions',
      props:true ,
      component:()=> import(/* webpackChunkName: "meds" */ '../views/Prescriptions.vue'),
    }
  ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  if(!sessionStorage.getItem('csrf'))
    {
    get_csrf()
      .then(function(){
        sessionStorage.setItem('csrf',1) ;
        next() ;
      })
    }
  else
    {
    next() ;
    }
})

export default router
