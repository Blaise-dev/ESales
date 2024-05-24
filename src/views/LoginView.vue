<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="login">
    <div>
      <h1>Se connecter</h1>

      <form id="connexionForm">
        <input type="email" name="email" />
        <br />
        <br />
        <input type="password" name="password" />
        <br /><br />
        <button id="btnEnvoyer">Envoyer</button>
        <br />
        <p>Ou</p>
        <button id="btnEnvoyer">Créer un compte</button>
        <RouterLink to="/restaurePassword">mot de passe oublié ?</RouterLink>
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
