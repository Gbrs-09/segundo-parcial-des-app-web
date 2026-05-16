<!-- src/views/ProductView.vue -->
<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
      <h4 class="mb-0 fw-bold" style="letter-spacing:3px;">CATÁLOGO</h4>
      <button @click="openCreate" class="btn btn-light btn-sm fw-bold">
        <i class="bi bi-plus-lg"></i> NUEVO PRODUCTO
      </button>
    </div>

    <!-- Tabla -->
    <div class="table-responsive">
      <table class="table table-dark table-hover border-secondary align-middle">
        <thead>
          <tr class="text-secondary" style="font-size:10px; letter-spacing:2px;">
            <th>IMAGEN</th><th>NOMBRE</th><th>CATEGORÍA</th>
            <th>PRECIO</th><th>STOCK</th><th>TAG</th><th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredProducts" :key="p.id">
            <td>
              <img :src="p.image" :alt="p.name"
                   style="width:48px; height:60px; object-fit:cover; object-position:top;" />
            </td>
            <td class="fw-bold" style="letter-spacing:1px;">{{ p.name }}</td>
            <td class="text-secondary" style="font-size:11px; letter-spacing:1px;">{{ p.category }}</td>
            <td class="fw-bold">{{ formatPrice(p.price) }}</td>
            <td>{{ p.stock }}</td>
            <td>
              <span v-if="p.tag" class="badge bg-secondary" style="font-size:9px;">{{ p.tag }}</span>
              <span v-else class="text-secondary">—</span>
            </td>
            <td>
              <div class="d-flex gap-1">
                <button @click="openDetail(p)" class="btn btn-outline-light btn-sm">
                  <i class="bi bi-eye"></i>
                </button>
                <button @click="openEdit(p)" class="btn btn-outline-secondary btn-sm">
                  <i class="bi bi-pencil"></i>
                </button>
                <button @click="confirmDelete(p)" class="btn btn-outline-danger btn-sm">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tarjetas -->
    <div class="row g-3 mt-2">
      <div v-for="p in filteredProducts" :key="'card-'+p.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <ProductCardComponent :product="p" @details="openDetail" />
      </div>
    </div>

    <!-- Modal Crear/Editar -->
    <div v-if="showForm" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="bg-dark border border-secondary p-4 rounded" style="width:480px; max-height:90vh; overflow-y:auto;">
        <h5 class="fw-bold mb-4" style="letter-spacing:2px;">
          {{ isEditing ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO' }}
        </h5>
        <div class="mb-3">
          <label class="form-label text-secondary" style="font-size:11px;">NOMBRE</label>
          <input v-model="form.name" class="form-control bg-black text-white border-secondary" />
        </div>
        <div class="row mb-3">
          <div class="col">
            <label class="form-label text-secondary" style="font-size:11px;">CATEGORÍA</label>
            <select v-model="form.category" class="form-select bg-black text-white border-secondary">
              <option>Hoodies</option><option>Camisetas</option>
              <option>Pantalones</option><option>Chaquetas</option>
            </select>
          </div>
          <div class="col">
            <label class="form-label text-secondary" style="font-size:11px;">PRECIO (COP)</label>
            <input v-model.number="form.price" type="number" class="form-control bg-black text-white border-secondary" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <label class="form-label text-secondary" style="font-size:11px;">STOCK</label>
            <input v-model.number="form.stock" type="number" class="form-control bg-black text-white border-secondary" />
          </div>
          <div class="col">
            <label class="form-label text-secondary" style="font-size:11px;">TAG</label>
            <select v-model="form.tag" class="form-select bg-black text-white border-secondary">
              <option value="">Sin tag</option>
              <option>NUEVO</option><option>TOP</option><option>AGOTÁNDOSE</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label text-secondary" style="font-size:11px;">DESCRIPCIÓN</label>
          <textarea v-model="form.description" rows="2" class="form-control bg-black text-white border-secondary"></textarea>
        </div>
        <div class="mb-4">
          <label class="form-label text-secondary" style="font-size:11px;">URL IMAGEN</label>
          <input v-model="form.image" class="form-control bg-black text-white border-secondary" />
        </div>
        <div class="d-flex gap-2 justify-content-end">
          <button @click="showForm=false" class="btn btn-outline-secondary">Cancelar</button>
          <button @click="saveProduct" class="btn btn-light fw-bold">
            {{ isEditing ? 'GUARDAR CAMBIOS' : 'CREAR PRODUCTO' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Detalle -->
    <div v-if="showDetail" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="bg-dark border border-secondary rounded overflow-hidden" style="width:380px;">
        <img :src="selected.image" :alt="selected.name"
             style="width:100%; height:240px; object-fit:cover; object-position:top;" />
        <div class="p-4">
          <span v-if="selected.tag" class="badge bg-secondary mb-2" style="font-size:9px; letter-spacing:2px;">
            {{ selected.tag }}
          </span>
          <h5 class="fw-bold" style="letter-spacing:2px;">{{ selected.name }}</h5>
          <p class="text-secondary mb-1" style="font-size:11px; letter-spacing:2px;">{{ selected.category }}</p>
          <p class="text-secondary mb-3" style="font-size:13px;">{{ selected.description }}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-5">{{ formatPrice(selected.price) }}</span>
            <span class="text-secondary" style="font-size:12px;">Stock: {{ selected.stock }}</span>
          </div>
          <button @click="showDetail=false" class="btn btn-outline-light w-100 mt-3">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Modal Eliminar -->
    <div v-if="showDelete" class="modal-overlay d-flex align-items-center justify-content-center">
      <div class="bg-dark border border-danger p-4 rounded text-center" style="width:360px;">
        <i class="bi bi-exclamation-triangle text-danger fs-1 mb-3 d-block"></i>
        <h6 class="fw-bold mb-2">¿Eliminar "{{ selected.name }}"?</h6>
        <p class="text-secondary mb-4" style="font-size:13px;">Esta acción no se puede deshacer.</p>
        <div class="d-flex gap-2 justify-content-center">
          <button @click="showDelete=false" class="btn btn-outline-secondary">Cancelar</button>
          <button @click="deleteProduct" class="btn btn-danger fw-bold">ELIMINAR</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { productService } from '../services/productService.js'
import ProductCardComponent from '../components/ProductCardComponent.vue'

export default {
  name: 'ProductView',
  components: { ProductCardComponent },
  props: { filter: { type: String, default: 'Todos' } },
  data() {
    return {
      products: [],
      showForm: false, showDetail: false, showDelete: false,
      isEditing: false, selected: null,
      form: { name: '', category: 'Hoodies', price: 0, stock: 0, tag: '', description: '', image: '' }
    }
  },
  computed: {
    filteredProducts() {
      if (this.filter === 'Todos') return this.products
      return this.products.filter(p => p.category === this.filter)
    }
  },
  mounted() {
    productService.init()
    this.products = productService.getAll()
  },
  methods: {
    formatPrice(v) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v)
    },
    openCreate() {
      this.form = { name: '', category: 'Hoodies', price: 0, stock: 0, tag: '', description: '', image: '' }
      this.isEditing = false
      this.showForm = true
    },
    openEdit(p) {
      this.form = { ...p }
      this.isEditing = true
      this.showForm = true
    },
    openDetail(p) { this.selected = p; this.showDetail = true },
    confirmDelete(p) { this.selected = p; this.showDelete = true },
    saveProduct() {
      if (this.isEditing) {
        productService.update(this.form)
      } else {
        productService.create(this.form)
      }
      this.products = productService.getAll()
      this.showForm = false
    },
    deleteProduct() {
      productService.delete(this.selected.id)
      this.products = productService.getAll()
      this.showDelete = false
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 1000;
  backdrop-filter: blur(4px);
}
</style>