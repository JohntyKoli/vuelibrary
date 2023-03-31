import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AboutView from '../views/AboutView.vue';
import Books from '../views/Books.vue';
import BookEdit from '../views/BookEdit.vue'
import AddBook from '../views/BookAdd.vue';
import PageNotFound from '../views/PageNotFound.vue';
import BookView from '../views/BookView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Books
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { loggedIn: true }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/add-book',
    name: 'addBook',
    component: AddBook,
    meta: { requiresAuth: true }
  },
  {
    path: '/books',
    name: 'books',
    component: Books
  },
  {
    path: '/book/view/:id',
    name: 'bookView',
    component: BookView,
    // meta: { requiresAuth: true }
  },
  {
    path: '/book/edit/:id',
    name: 'bookEdit',
    component: BookEdit,
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: PageNotFound
  // }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  // console.log("sdfghjk");

  await store.dispatch('checkUser')
  if (to.meta.requiresAuth) {
    console.log("sdfghjk")

    if (!store.getters.isUserLoggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router


