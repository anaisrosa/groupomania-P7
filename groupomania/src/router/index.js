import { createRouter, createWebHistory } from 'vue-router'
import NewPost from '../views/NewPost.vue'
import SignUp from '../views/Signup.vue'
import Feed from '../views/Feed.vue'
import DetailsPost from '../views/DetailsPost.vue'
import ModifyPost from '../views/ModifyPost.vue'

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
  {
    path: '/modify-post',
    name: 'ModifyPost',
    component: ModifyPost
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
