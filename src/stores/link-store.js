import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useUserStore } from './user-store'

import { useQuasar } from 'quasar'

export const useLinkStore = defineStore('link', () => {
  const $q = useQuasar()
  const userStore = useUserStore()

  const links = ref([])

  const createLink = async (longLink) => {
    console.log(longLink)
    try {
      $q.loading.show()
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
    } finally {
      $q.loading.hide()
    }
  }

  const getLinks = async () => {
    try {
      $q.loading.show()
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
    } finally {
      $q.loading.hide()
    }
  }

  getLinks()

  const removeLink = async (_id) => {
    console.log(_id)
    try {
      $q.loading.show()
      await api({
        url: `links/${_id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + userStore.token,
        },
      })
      links.value = links.value.filter((link) => link._id !== _id)
    } catch (error) {
      throw error.response?.data || error
    } finally {
      $q.loading.hide()
    }
  }

  const modifiedLink = async (newLink) => {
    try {
      $q.loading.show()
      const res = await api({
        url: `links/${newLink._id}`,
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + userStore.token,
        },
        data: {
          longLink: newLink.longLink,
        },
      })
      console.log(res.data)
      // Actualiza el enlace en el array links
      const index = links.value.findIndex((link) => link._id === newLink._id)
      if (index !== -1) {
        links.value[index] = res.data.link
      }
    } catch (error) {
      throw error.response?.data || error
    } finally {
      $q.loading.hide()
    }
  }

  return {
    createLink,
    getLinks,
    links,
    removeLink,
    modifiedLink,
  }
})
