<!-- src/components/ProductCardComponent.vue -->
<template>
  <div class="card bg-dark text-white border-secondary h-100">
    <img :src="product.image" :alt="product.name" class="card-img-top"
         style="height:220px; object-fit:cover; object-position:top;" />
    <div class="card-body d-flex flex-column">
      <span v-if="product.tag" class="badge bg-secondary mb-2" style="font-size:9px; letter-spacing:2px;">
        {{ product.tag }}
      </span>
      <h6 class="card-title fw-bold mb-1" style="letter-spacing:1px;">{{ product.name }}</h6>
      <p class="text-secondary mb-1" style="font-size:10px; letter-spacing:2px;">{{ product.category }}</p>
      <p class="text-secondary mb-3" style="font-size:12px;">{{ product.description }}</p>
      <div class="mt-auto d-flex justify-content-between align-items-center">
        <span class="fw-bold">{{ formatPrice(product.price) }}</span>
        <button @click="$emit('details', product)" class="btn btn-outline-light btn-sm">
          <i class="bi bi-eye"></i> Detalles
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: { product: { type: Object, required: true } },
  emits: ['details'],
  methods: {
    formatPrice(v) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v)
    }
  }
}
</script>