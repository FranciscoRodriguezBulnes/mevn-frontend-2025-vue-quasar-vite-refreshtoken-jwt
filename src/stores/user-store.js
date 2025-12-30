import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

  const access = async () => {
    try {
      // console.log('has pulsado click')
      const res = await api.post('/auth/login', {
        email: 'frbacsa@gmail.com',
        password: 'jacobo1!',
      })
      // console.log(res.data)
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
      // console.log(token)
      // console.log(expiresIn)
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
    console.log("RefreshToken")
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
  }
})
