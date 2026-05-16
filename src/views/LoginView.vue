<!-- src/views/LoginView.vue -->
<template>
  <div class="login-wrapper d-flex align-items-center justify-content-center vh-100 bg-black">
    <div class="card bg-dark text-white border-secondary p-4" style="width: 400px;">
      <h2 class="text-center fw-bold mb-1 display-6">BLACKSTORE</h2>
      <p class="text-center text-secondary mb-4" style="font-size:11px; letter-spacing:3px;">MODA OSCURA · ESTILO ÚNICO</p>

      <div v-if="error" class="alert alert-danger py-2 text-center" role="alert">
        {{ error }}
      </div>

      <div class="mb-3">
        <label class="form-label text-secondary" style="font-size:11px; letter-spacing:2px;">USUARIO</label>
        <input v-model="email" type="email" class="form-control bg-black text-white border-secondary"
               placeholder="admin@blackstore.com" />
      </div>

      <div class="mb-4">
        <label class="form-label text-secondary" style="font-size:11px; letter-spacing:2px;">CONTRASEÑA</label>
        <input v-model="password" type="password" class="form-control bg-black text-white border-secondary"
               placeholder="••••••••" @keyup.enter="handleLogin" />
      </div>

      <button @click="handleLogin" class="btn btn-light w-100 fw-bold" :disabled="loading">
        {{ loading ? 'VERIFICANDO...' : 'INGRESAR' }}
      </button>

      <p class="text-center text-secondary mt-3" style="font-size:10px;">
        ⚠ Solo con fines educativos — Ver README
      </p>
    </div>
  </div>
</template>

<script>
import usuarios from '../data/usuarios.json'

export default {
  name: 'LoginView',
  data() {
    return { email: '', password: '', error: '', loading: false }
  },
  methods: {
    handleLogin() {
      this.error = ''
      if (!this.email || !this.password) {
        this.error = 'Por favor completa todos los campos.'
        return
      }
      this.loading = true
      setTimeout(() => {
        const user = usuarios.find(
          u => u.email === this.email && u.password === this.password
        )
        if (user) {
          sessionStorage.setItem('bs_session', JSON.stringify(user))
          this.$router.push('/dashboard/productos')
        } else {
          this.error = 'Credenciales incorrectas. Intenta de nuevo.'
          this.password = ''
        }
        this.loading = false
      }, 800)
    }
  }
}
</script>