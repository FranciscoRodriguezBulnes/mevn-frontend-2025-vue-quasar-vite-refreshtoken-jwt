<template>
  <q-page padding>
    <q-btn @click="access">Acceder</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }} - {{ expiresIn }}
  </q-page>
</template>

<script setup>
// import axios from 'axios'
import { api } from 'src/boot/axios'
import { ref } from 'vue'

const token = ref('')
const expiresIn = ref('')

// const access = () => {
//   console.log('has pulsado click')
//   axios
//     .post('http://localhost:5000/api/v1/auth/login', {
//       email: 'frbacsa@gmail.com',
//       password: 'jacobo1!',
//     })
//     .then((res) => {
//       console.log(res.data)
//     })
//     .catch((e) => console.log(e))
// }

const access = async () => {
  try {
    console.log('has pulsado click')
    const res = await api.post('/auth/login', {
      email: 'frbacsa@gmail.com',
      password: 'jacobo1!',
    })
    // console.log(res.data)
    token.value = res.data.token
    expiresIn.value = res.data.expiresIn
    setTime()
    // console.log(token)
    // console.log(expiresIn)
  } catch (error) {
    console.log(error)
  }
}

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        Authorization: 'Bearer ' + token.value,
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

const setTime = () => {
  setTimeout(
    () => {
      refreshToken()
    },
    expiresIn.value * 1000 - 6000,
  )
}

const refreshToken = async () => {
  try {
    const res = await api.get('/auth/refresh')
    console.log(res.data)

    token.value = res.data.token
    expiresIn.value = res.data.expiresIn
    setTime()
  } catch (error) {
    console.log(error)
  }
}

// refreshToken()
</script>
