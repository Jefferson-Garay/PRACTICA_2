<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">

      <!-- Buscar -->
      <q-input
        v-model="search"
        label="Buscar usuarios"
        outlined
        dense
        debounce="300"
        class="q-mb-md"
      />

      <!-- Cargar usuarios -->
      <q-btn label="Cargar Usuarios" color="primary" @click="fetchUsers" />

      <!-- Cargando -->
      <q-spinner v-if="loading" color="primary" size="lg" />

      <!-- Error -->
      <q-banner v-if="error" class="bg-red-2 text-red-9">
        Error al cargar los datos: {{ error }}
      </q-banner>

      <!-- Tabla -->
      <q-table
        v-if="!loading && !error && paginatedUsers.length"
        :rows="paginatedUsers"
        :columns="columns"
        row-key="id"
        flat
        bordered
      />

      <!-- Mensaje si no hay resultados -->
      <div v-if="!loading && !error && paginatedUsers.length === 0">
        No se encontraron usuarios que coincidan con "{{ search }}"
      </div>

      <!-- Paginación -->
      <q-pagination
        v-if="!loading && !error && totalPages > 1"
        v-model="page"
        :max="totalPages"
        color="primary"
        boundary-numbers
        class="q-mt-md"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from 'boot/axios'

// Estados
const users = ref([])
const loading = ref(false)
const error = ref(null)
const search = ref('')
const page = ref(1)
const rowsPerPage = 5 // 👈 Cambia esto para mostrar más o menos por página

// Columnas
const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'phone', label: 'Teléfono', field: 'phone', align: 'left' },
]

// Filtro por búsqueda
const filteredUsers = computed(() => {
  if (!search.value) return users.value

  const term = search.value.toLowerCase()
  return users.value.filter(user =>
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  )
})

// Total de páginas (basado en usuarios filtrados)
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / rowsPerPage)
})

// Cálculo de usuarios paginados
const paginatedUsers = computed(() => {
  const start = (page.value - 1) * rowsPerPage
  const end = start + rowsPerPage
  return filteredUsers.value.slice(start, end)
})

// Cargar usuarios
const fetchUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await api.get('/users')
    users.value = response.data
    page.value = 1 // Reiniciar página al cargar
  } catch (err) {
    error.value = err.message || 'Error desconocido'
  } finally {
    loading.value = false
  }
}

// Al montar, carga
onMounted(fetchUsers)
</script>
