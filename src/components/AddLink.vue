<script setup>
import { ref } from 'vue'
import { useLinkStore } from 'src/stores/link-store'
import { useNotify } from 'src/composables/notifyHook'

const link = ref('')
const loading = ref(false)
const useLink = useLinkStore()
const { showNotify } = useNotify()

const addLink = async () => {
  console.log(link.value)
  try {
    loading.value = true
    await useLink.createLink(link.value)
    showNotify('Adding link...', 'info')
    link.value = '' // Clear input after submission regardless
  } catch (error) {
    // console.error('Error adding link:', error)
    console.log(error.errors)
    error.errors?.forEach((err) => {
      showNotify(`Error: ${err.msg}`, 'negative')
    })

    showNotify(`Error adding link: ${error.message || error}`, 'negative')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model="link"
      label="Add Link"
      placeholder="https://example.com"
      type="url"
      outlined
      :rules="[
        (val) => !!val || 'Link is required',
        (val) => /^(https?:\/\/)/.test(val) || 'Link must start with http:// or https://',
      ]"
    ></q-input>
    <q-btn
      class="q-mt-sm full-width"
      label="Agregar Link"
      color="primary"
      type="submit"
      :loading="loading"
    ></q-btn>
  </q-form>
</template>

<style lang="scss" scoped></style>
