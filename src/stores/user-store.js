import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

  const register = async (email, password, repassword) => {
    try {
      // console.log('has pulsado click')
      const res = await api.post('/auth/register', {
        email: email,
        password: password,
        repassword: repassword
      })
      // console.log(res.data)
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
      // console.log(token)
      // console.log(expiresIn)
    } catch (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado
        // que esta fuera del rango de 2xx
        console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
        //con este throw le mando el error al catch del la llamada del login
        throw( error.response.data)
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
        // http.ClientRequest en node.js
        console.log(error.request)
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        console.log('Error', error.message)
      }
      console.log(error.config)
      // console.log(error)
    }
  }








  const access = async (email, password) => {
    try {
      // console.log('has pulsado click')
      const res = await api.post('/auth/login', {
        email: email,
        password: password,
      })
      // console.log(res.data)
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
      // console.log(token)
      // console.log(expiresIn)
    } catch (error) {
      if (error.response) {
        // La respuesta fue hecha y el servidor respondió con un código de estado
        // que esta fuera del rango de 2xx
        console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
        //con este throw le mando el error al catch del la llamada del login
        throw( error.response.data)
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
        // http.ClientRequest en node.js
        console.log(error.request)
      } else {
        // Algo paso al preparar la petición que lanzo un Error
        console.log('Error', error.message)
      }
      console.log(error.config)
      // console.log(error)
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

  const logout = async () => {
    try {
      await api.get('/auth/logout')
    } catch (error) {
      console.log(error)
    } finally {
      resetStore()
      sessionStorage.removeItem('user')
    }
  }

  const resetStore = () => {
    token.value = null
    expiresIn.value = null
  }

  const refreshToken = async () => {
    console.log('RefreshToken')
    try {
      const res = await api.get('/auth/refresh')
      // console.log(res.data)

      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
    } catch (error) {
      console.log(error)
      sessionStorage.removeItem('user')
    }
  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register,
  }
})
