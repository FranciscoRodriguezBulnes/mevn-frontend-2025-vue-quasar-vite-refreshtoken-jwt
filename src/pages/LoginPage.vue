<script setup>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/user-store'
import { ref } from 'vue'
const $q = useQuasar()

const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  // console.log(email.value)
  // console.log(password.value)
  try {
    console.log('pasó las validaciones')
    await userStore.access(email.value, password.value)
    router.push('/')
    email.value = ''
    password.value = ''
  } catch (error) {
    console.log('error desde el servidor', error)
    alertDialogBackend(error.errors[0].msg)
  }
}

const alertDialogBackend = (message = 'Error en el servidor') => {
  $q.dialog({
    title: 'Alerta',
    message,
  })
}
</script>

<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Login </h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          label="Introduce el email"
          type="text"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Escribe un formato correcto',
          ]"
        >
        </q-input>
        <q-input
          v-model="password"
          label="Introduce la contraseña"
          type="password"
          :rules="[(val) => (val && val.length > 5) || 'Contraseña mínima de 6 caracteres']"
        >
        </q-input>
        <div>
          <q-btn label="Login" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
