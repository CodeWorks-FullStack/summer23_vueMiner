import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

// NOTE imports all of .vue files from the pages folder
function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}
// NOTE an array of all availabe routes that we can navigate to
const routes = [
  {
    // NOTE in order to access this route, this is what our url path needs to look like
    path: '/',
    // NOTE what we name our route that we can reference in our code
    name: 'Home',
    // NOTE which page component to load when the user accesses this route
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
