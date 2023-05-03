import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/full_virtual_machine.vue'),
      meta: { title: 'Full Virtual Machine' }
    },
    {
      path: '/vm',
      component: () => import('../views/micro_virtual_machine.vue'),
      meta: { title: 'Micro Virtual Machine' }
    },
    {
      path: '/kubernetes',
      component: () => import('../views/kubernetes_view.vue'),
      meta: { title: 'Kubernetes' }
    },
    {
      path: '/presearch',
      component: () => import('../views/presearch_view.vue'),
      meta: { title: 'Presearch' }
    },
    {
      path: '/contractslist',
      component: () => import('../views/contracts_list.vue'),
      meta: { title: 'Contracts List' }
    },
    {
      path: '/deployedlist',
      component: () => import('../views/deployment_list.vue'),
      meta: { title: 'Deployment List' }
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/not_yet_implemented.vue'),
      meta: { title: 'Not Yet Implemented' }
    }
  ]
})

export default router
