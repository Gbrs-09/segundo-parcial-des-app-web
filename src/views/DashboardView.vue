<!-- src/views/DashboardView.vue -->
<template>
  <div class="d-flex flex-column vh-100 bg-black text-white">
    <NavbarComponent />
    <div class="d-flex flex-grow-1 overflow-hidden">
      <SidebarComponent @filter="handleFilter" />
      <main class="flex-grow-1 overflow-auto p-4">
        <router-view :filter="activeFilter" />
      </main>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  name: 'DashboardView',
  components: { NavbarComponent, SidebarComponent, FooterComponent },
  data() { return { activeFilter: 'Todos' } },
  methods: { handleFilter(cat) { this.activeFilter = cat } }
}
</script>