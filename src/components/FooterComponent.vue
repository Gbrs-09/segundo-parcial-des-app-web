<!-- src/components/FooterComponent.vue -->
<template>
  <footer class="bg-black border-top border-secondary py-3 px-4 d-flex justify-content-between align-items-center">
    <span class="fw-bold" style="letter-spacing:4px; font-size:14px;">BLACKSTORE</span>
    <span class="text-secondary" style="font-size:10px; letter-spacing:2px;">
      © 2024 BLACKSTORE — Todos los derechos reservados
    </span>
    <div class="d-flex gap-3">
      <a href="#" class="text-secondary text-decoration-none" style="font-size:10px; letter-spacing:1px;">Privacidad</a>
      <a href="#" class="text-secondary text-decoration-none" style="font-size:10px; letter-spacing:1px;">Términos</a>
    </div>
  </footer>
</template>

<script>
export default { name: 'FooterComponent' }
</script>