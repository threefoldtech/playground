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
      path: '/:pathMatch(.*)*',
      component: () => import('../views/not_yet_implemented.vue'),
      meta: { title: 'Not Yet Implemented' }
    }
  ]
})

export default router
