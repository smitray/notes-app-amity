import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Notes from '../pages/Notes.vue'
import NoteEditor from '../pages/NoteEditor.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/notes', component: Notes },
  { path: '/notes/:id', component: NoteEditor, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/notes' }
]

export function createAppRouter(history = createWebHistory()) {
  const router = createRouter({ history, routes })
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (!userStore.initialized) await userStore.fetchUser()
    if (to.path.startsWith('/notes') && !userStore.user) {
      next('/login')
    } else {
      next()
    }
  })
  return router
}

export default createAppRouter()
