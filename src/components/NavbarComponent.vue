<!-- src/components/NavbarComponent.vue -->
<template>
  <nav class="navbar navbar-dark bg-black border-bottom border-secondary px-4">
    <span class="navbar-brand fw-bold fs-4" style="letter-spacing:5px;">BLACKSTORE</span>
    <div class="d-flex align-items-center gap-3">
      <span class="text-secondary" style="font-size:12px;">{{ userName }}</span>
      <button @click="logout" class="btn btn-outline-light btn-sm">
        <i class="bi bi-box-arrow-right"></i> Salir
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  computed: {
    userName() {
      const s = sessionStorage.getItem('bs_session')
      return s ? JSON.parse(s).nombre : ''
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('bs_session')
      this.$router.push('/login')
    }
  }
}
</script>