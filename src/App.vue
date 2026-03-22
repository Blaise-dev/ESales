<script setup>
import { RouterView } from 'vue-router'

import Base from '@/components/Base.vue'
</script>

<template>
  <div id="app" class="app-shell d-flex flex-column min-vh-100">
    <v-app class="flex-grow-1 app-shell-content">
      <Base>
        <v-main>
          <RouterView v-slot="{ Component }">
            <component :is="Component" />
          </RouterView>
        </v-main>
      </Base>
      <div class="floating-signature">
        <a href="https://github.com/Blaise-dev" target="_blank" rel="noreferrer">Blaise.dev</a>
        <span>·</span>
        <a href="https://github.com/Blaise-dev/ESales" target="_blank" rel="noreferrer">Repo</a>
      </div>
    </v-app>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  overflow: hidden;
}

.app-shell::before,
.app-shell::after {
  content: '';
  position: fixed;
  width: 360px;
  height: 360px;
  border-radius: 999px;
  pointer-events: none;
  z-index: 0;
}

.app-shell::before {
  top: -120px;
  left: -120px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.2), transparent 70%);
}

.app-shell::after {
  right: -120px;
  bottom: -160px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.16), transparent 70%);
}

.app-shell-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.floating-signature {
  position: fixed;
  right: 14px;
  bottom: 14px;
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  box-shadow: var(--shadow-sm);
  z-index: 1200;
  backdrop-filter: blur(8px);
}

.floating-signature a {
  text-decoration: none;
  font-weight: 700;
}

.floating-signature a:first-of-type {
  color: var(--primary);
}

.floating-signature a:last-of-type {
  color: var(--text);
}

.floating-signature span {
  color: var(--text-soft);
}

@media (max-width: 991.98px) {
  .floating-signature {
    display: none;
  }
}
</style>
