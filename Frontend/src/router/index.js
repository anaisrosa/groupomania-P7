import { createRouter, createWebHistory } from 'vue-router'
import NewPost from '../views/NewPost.vue'
import SignUp from '../views/Signup.vue'
import Feed from '../views/Feed.vue'
import DetailsPost from '../views/DetailsPost.vue'
import ModifyPost from '../views/ModifyPost.vue'
import ReportPost from '../views/ReportPost.vue'
import ReportComment from '../views/ReportComment.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'


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
    path: '/modify-post/:id',
    name: 'ModifyPost',
    component: ModifyPost
  },
  {
    path: '/report-post/:id',
    name: 'ReportPost',
    component: ReportPost
  },
  {
    path: '/report-comment/:id',
    name: 'ReportComment',
    component: ReportComment
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
