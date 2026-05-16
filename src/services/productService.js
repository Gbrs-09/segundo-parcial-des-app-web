// src/services/productService.js
import productosJSON from '../data/products.json'

const KEY = 'blackstore_products'

export const productService = {
  // Inicializar LocalStorage con el JSON si está vacío
  init() {
    if (!localStorage.getItem(KEY)) {
      localStorage.setItem(KEY, JSON.stringify(productosJSON))
    }
  },

  getAll() {
    return JSON.parse(localStorage.getItem(KEY)) || []
  },

  getById(id) {
    return this.getAll().find(p => p.id === id)
  },

  create(product) {
    const all = this.getAll()
    product.id = Date.now()
    all.push(product)
    localStorage.setItem(KEY, JSON.stringify(all))
  },

  update(updated) {
    const all = this.getAll().map(p => p.id === updated.id ? updated : p)
    localStorage.setItem(KEY, JSON.stringify(all))
  },

  delete(id) {
    const all = this.getAll().filter(p => p.id !== id)
    localStorage.setItem(KEY, JSON.stringify(all))
  }
}