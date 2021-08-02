import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../tabs/Main.vue'
import Me from '../tabs/Me.vue'
import Browse from '../tabs/Browse.vue'
import History from '../tabs/History.vue'
import More from '../tabs/More.vue'


import store from '@/dependencies/store'

function init(to, from, next){
  store.dispatch('init').then(ready=>{
    if(ready){
      next()
    }
    else{
      console.log('Not Initialized');
      next({name:'setup'})
    }
  })


}



// Browse Tab
const browse = [
  {
    name: 'browse',
    path: 'browse',
    beforeEnter:init,
    component: Browse,
    children:[
      {
        name:'category',
        path: 'category/:category',
        beforeEnter:init,
        component: () => import('@/_browse/category.vue')
      },
      {
        name:'subject',
        path: 'subject/:category-:subject',
        beforeEnter:init,
        component: () => import('@/_browse/subject.vue')
      },
      {
        name:'read',
        path: 'read/:category-:subject',
        beforeEnter:init,
        component: () => import('@/_browse/reader.vue')
      }
    ]
  },

]


const more = [
  {
    name:'more',
    path: 'more',
    component: More,
    beforeEnter:init,
    children:[
      {
        name:'whoami',
        path:'more/whoami',
        component: () => import('@/_more/whoami.vue')
      },
      {
        name:'calso',
        path:'more/calso',
        component: () => import('@/_more/calso.vue')
      },
      {
        name:'sprout',
        path:'more/sprout',
        component: () => import('@/_more/sprout.vue')
      },
      {
        name:'thanks',
        path:'more/thanks',
        component: () => import('@/_more/thanks.vue')
      },
    ]
  },
]


const mcq = {
    name:'mcq',
    path: '/mcq',
    component: () => import('@/main/mcq.vue'),
    beforeEnter:(to,from,next)=>{
      if(window.MCQ.ready){
        next()
      }
      else{
        next({name:'browse'})
      }
    }
}




const routes = [
  {
    path: '/',
    redirect: '/app/'
  },
  mcq,
  {
    name:'setup',
    path: '/setup',
    component: () => import('@/main/setup.vue')
  },
  {
    path: '/app/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/app/me'
      },
      {
        name:'me',
        path: 'me',
        component: Me,
        beforeEnter:init,
        children:[
          {
            name:'ssss',
            path: 'setup',
            component: () => import('@/main/setup.vue')
          },
        ],
      },
      {
        name:'history',
        path: 'history',
        component: History,
        beforeEnter:init,
        children:[
          {
            name:'sss',
            path: 'setup',
            component: () => import('@/main/setup.vue')
          },

        ]
      },

      ...browse,
      ...more
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
