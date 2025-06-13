<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg shadow-2" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Iniciar sesión</div>
      </q-card-section>

      <q-form @submit.prevent="submitForm" ref="formRef">
        <q-card-section class="q-gutter-md">

          <q-input
            v-model="email"
            label="Correo electrónico"
            type="email"
            outlined
            :rules="[
              val => !!val || 'El correo es obligatorio',
              val => /.+@.+\..+/.test(val) || 'Correo inválido'
            ]"
          />

          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            outlined
            :rules="[
              val => !!val || 'La contraseña es obligatoria',
              val => val.length >= 6 || 'Mínimo 6 caracteres'
            ]"
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Entrar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const formRef = ref(null)
const router = useRouter()

const submitForm = () => {
  formRef.value.validate().then((valid) => {
    if (valid) {
      // Simular login exitoso
      console.log('Login exitoso:', email.value)
      router.push('/usuarios') // Redirige al listado
    } else {
      console.log('Errores de validación')
    }
  })
}
</script>
