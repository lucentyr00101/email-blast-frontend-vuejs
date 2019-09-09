import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/authentication/login'),
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home'),
      meta: {
        forAuth: true
      }
    },
    {
      path: '/users',
      component: () => import('@/base/users'),
      meta: {
        forAuth: true
      },
      children: [
        {
          path: '',
          name: 'users-index',
          component: () => import('@/views/users/users-index')
        },
        {
          path: ':id/edit',
          name: 'users-edit',
          component: () => import('@/views/users/users-edit')
        }
      ]
    },
    {
      path: '/contacts',
      component: () => import('@/base/contacts'),
      meta: {
        forAuth: true
      },
      children: [
        {
          path: '',
          name: 'contacts-index',
          component: () => import('@/views/contacts/contacts-index')
        },
        {
          path: ':id/edit',
          name: 'contacts-edit',
          component: () => import('@/views/contacts/contacts-edit')
        }
      ]
    },
    {
      path: '/emails',
      component: () => import('@/base/emails'),
      meta: {
        forAuth: true
      },
      children: [
        {
          path: '',
          name: 'emails-index',
          component: () => import('@/views/emails/emails-index')
        },
        {
          path: 'create',
          name: 'emails-create',
          component: () => import('@/views/emails/emails-create')
        }
      ]
    },
    {
      path: '/groups',
      component: () => import('@/base/groups'),
      meta: {
        forAuth:true
      },
      children: [
        {
          path: '',
          component: () => import('@/views/groups/groups-index'),
          name: 'groups-index'
        },
        {
          path: ':id/edit',
          component: () => import('@/views/groups/groups-edit'),
          name: 'groups-edit'
        }
      ]
    }
  ]
})
