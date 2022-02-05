import { createRouter, createWebHistory } from 'vue-router'
import NewPost from '../views/NewPost.vue'
import SignUp from '../views/Signup.vue'
import Feed from '../views/Feed.vue'
import DetailsPost from '../views/DetailsPost.vue'

const routes = [
  {
    path: '/new-post',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/posts/:id',
    name: 'DetailsPost',
    component: DetailsPost
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
