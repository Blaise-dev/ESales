<template>
  <section class="restore-page">
    <div class="restore-card surface-card">
      <h1>Mot de passe oublié ?</h1>
      <p>Entrez votre email, nous vous enverrons un lien de réinitialisation.</p>

      <form class="restore-form" @submit.prevent>
        <input type="email" name="email" class="form-control" placeholder="example@gmail.com" required />
        <button id="btnEnvoyer" class="btn btn-modern" type="submit">Envoyer</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.restore-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.restore-card {
  width: min(560px, 100%);
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.restore-card h1 {
  margin: 0 0 .5rem;
  font-size: clamp(1.25rem, 2.2vw, 1.8rem);
  color: var(--text);
}

.restore-card p {
  margin: 0 0 1rem;
  color: var(--text-soft);
}

.restore-form {
  display: grid;
  gap: .75rem;
}

#btnEnvoyer {
  width: 100%;
}

@media (max-width: 575.98px) {
  .restore-page {
    min-height: auto;
    padding: .75rem;
  }

  .restore-card {
    padding: 1rem;
  }
}
</style>
