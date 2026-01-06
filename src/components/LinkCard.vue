<script setup>
import { useLinkStore } from 'src/stores/link-store'
import { useQuasar } from 'quasar'
import { useNotify } from 'src/composables/notifyHook'

const { errorNotify, successNotify } = useNotify()

const $q = useQuasar()
const linkStore = useLinkStore()
defineProps({
  link: {
    type: Object,
    required: true,
  },
})

const deleteLink = async (_id) => {
  $q.dialog({
    title: 'Confirma el borrado 👍',
    message: '¿Estás seguro de que quieres borrar este enlace?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    console.log('>>>> OK')
    try {
      const borrar = true
      if (borrar) await linkStore.removeLink(_id)
      console.log('Deleted link with id:', _id)
      successNotify('Link deleted successfully')
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((err) => {
          errorNotify(`Error: ${err.msg}`)
        })
      }

      errorNotify('Error deleting link: ' + error.message || error)
    }
  })
}

const updateLink = (link) => {
  console.log(link)
  $q.dialog({
    title: 'Actualizar LINK',
    message: 'Actualiza aquí tu enlace',
    prompt: {
      model: link.longLink,
      type: 'text', // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    try {
      // console.log('>>>> OK, received', data)
      const newLink = { ...link, longLink: data }
      await linkStore.modifiedLink(newLink) // Llama al método modifiedLink del store para actualizar el enlace
      successNotify('Link updated successfully')
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((err) => {
          errorNotify(`Error: ${err.msg}`)
        })
      }

      errorNotify('Error updating link: ' + error.message || error)
    }
  })
}

const copyLink = async (nanoLink) => {
  try {
    // const path = window.location.origin + '/'
    // const fullLink = path + nanoLink
    // console.log(process.env.FRONT_URI)
    const path = `${process.env.FRONT_URI}/${nanoLink}`
    await navigator.clipboard.writeText(path)
    successNotify('Link copied to clipboard!')
  } catch (error) {
    errorNotify('Failed to copy link: ' + error.message || error)
  }
}


</script>

<template>
  <q-card class="my-card q-mb-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      {{ link }}
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat round icon="mdi-trash-can-outline" color="red" @click="deleteLink(link._id)" />
      <q-btn flat round icon="mdi-pencil-outline" color="blue" @click="updateLink(link)" />
      <q-btn flat color="primary" @click="copyLink(link.nanoLink)">Copy</q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped></style>
