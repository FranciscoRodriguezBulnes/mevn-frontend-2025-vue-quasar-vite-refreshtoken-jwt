<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Acceder</q-btn> -->
    <q-btn @click="createLink">Crear Link</q-btn>
    <!-- <q-btn @click="userStore.logout">Cerrar Sesión</q-btn> -->
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
// import axios from 'axios'
import { api } from 'src/boot/axios'
import { useUserStore } from 'src/stores/user-store'

//Primero instancio el store
const userStore = useUserStore()

// ahora lo destructuro
// const { token, expiresIn, access, refreshToken } = userStore

// const userStore = useUserStore()
userStore.refreshToken()

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        Authorization: 'Bearer ' + userStore.token,
      },
      data: {
        longLink:
          'https://www.google.com/search?q=calzoncillos+con+relleno+gl%C3%BAteos+hombre&rlz=1C1GCEA_enES989ES1046&oq=&gs_lcrp=EgZjaHJvbWUqCQgBECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gLSAQkxNjE0ajBqMTWoAgiwAgHxBZKQZb6It8hZ8QWSkGW-iLfIWQ&sourceid=chrome&ie=UTF-8',
      },
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}
// }

// refreshToken()
</script>
