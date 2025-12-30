import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useUserStore } from 'src/stores/user-store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth
    const userStore = useUserStore()

    //si existe el token en memoria
    if (userStore.token) {
      return next()
    }

    //si  no existe el token (tengo que ponerlo 'decente')
    if (sessionStorage.getItem('user')) {
      await userStore.refreshToken()
      if (requiredAuth) {
        //validar al usuario o token
        if (userStore.token) {
          return next()
        }
        return next('/login')
      } else {
        return next()
      }
    } else {
      if (requiredAuth) {
        await userStore.refreshToken()
        if (userStore.token) {
          return next()
        }
        return next('/login')
      }
      next()
    }
  })

  return Router
})

// Router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore()
//   const requiresAuth = to.meta.auth
//   let allow = true

//   if (requiresAuth) {
//     if (!userStore.token) {
//       const hasSession = sessionStorage.getItem('user')

//       if (hasSession) {
//         await userStore.refreshToken()
//       }

//       if (!userStore.token) {
//         allow = false
//       }
//     }
//   }

//   next(allow ? undefined : '/login')
// })
