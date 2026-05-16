<!-- src/components/SidebarComponent.vue -->
<template>
  <aside class="sidebar bg-black border-end border-secondary d-flex flex-column py-4">
    <div class="px-3 mb-4">
      <p class="text-secondary mb-2" style="font-size:9px; letter-spacing:3px;">NAVEGACIÓN</p>
      <router-link to="/dashboard/productos"
        class="sidebar-link d-flex align-items-center gap-2 py-2 px-2 rounded text-decoration-none"
        active-class="active-link">
        <i class="bi bi-grid-fill"></i> Productos
      </router-link>
    </div>

    <div class="px-3">
      <p class="text-secondary mb-2" style="font-size:9px; letter-spacing:3px;">CATEGORÍAS</p>
      <button v-for="cat in categories" :key="cat"
        @click="$emit('filter', cat)"
        class="sidebar-link btn btn-link text-decoration-none d-flex align-items-center gap-2 py-1 px-2 w-100 text-start">
        <i class="bi bi-circle-fill" style="font-size:6px;"></i> {{ cat }}
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
  emits: ['filter'],
  data() {
    return {
      categories: ['Todos', 'Hoodies', 'Camisetas', 'Pantalones', 'Chaquetas']
    }
  }
}
</script>

<style scoped>
.sidebar { width: 220px; min-height: calc(100vh - 56px); }
.sidebar-link { color: #666; font-size: 13px; transition: all 0.2s; }
.sidebar-link:hover, .active-link { color: #fff !important; background: rgba(255,255,255,0.06); }
</style>