import { createWebHashHistory, createRouter } from 'vue-router'
import { constantRoute } from './routes'



const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute
})

export default router