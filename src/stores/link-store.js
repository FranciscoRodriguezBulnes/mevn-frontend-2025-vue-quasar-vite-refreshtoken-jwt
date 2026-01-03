import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useUserStore } from './user-store'

export const useLinkStore = defineStore('link', () => {
  const userStore = useUserStore()

  const links = ref([])

  const createLink = async (longLink) => {
    console.log(longLink)
    try {
      const res = await api({
        url: '/links',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userStore.token,
        },
        data: {
          longLink,
        },
      })
      console.log(res.data)
      links.value.push(res.data.newLink)
    } catch (error) {
      throw error.response?.data || error
    }
  }

  const getLinks = async () => {
    try {
      console.log('llamando a todos los links 🎁')
      const res = await api({
        url: '/links',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userStore.token,
        },
      })
      // console.log(res.data)
      // links.value.push(res.data.newLink)
      // links.value = [...res.data.links]
      links.value = res.data.links.map((item) => item)
      // links.value = res.data.links
    } catch (error) {
      // console.log(error.response?.data || error)
      return error.response?.data || error
    }
  }

  getLinks()

  return {
    createLink,
    getLinks,
    links,
  }
})
