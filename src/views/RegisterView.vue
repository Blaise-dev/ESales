<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="login">
    <div>
      <h1>Mot de passe oublié ?</h1>

      <form id="connexionForm">
        <input type="email" name="email" />
        <br />
        <button id="btnEnvoyer">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
