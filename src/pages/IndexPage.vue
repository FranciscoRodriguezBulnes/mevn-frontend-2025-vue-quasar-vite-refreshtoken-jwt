<template>
  <q-page padding>
    <add-link class="q-mb-xl" />
    <!-- <pre>{{ JSON.stringify(useLink.links, null, 2) }}</pre> -->
    <template v-for="link in useLink.links" :key="link._id">
      <link-card :link="link"/>
    </template>
  </q-page>
</template>

<script setup>
import { useLinkStore } from 'src/stores/link-store'

// components
import AddLink from 'src/components/AddLink.vue'
import LinkCard from 'src/components/LinkCard.vue'

const useLink = useLinkStore()
</script>
