<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="login" class="container-fluid vh-100">
    <div class="row">
      <div class="bg-image">kjezhfjkezhkjfezhjkfe</div>
      <div class="col-5">
        <h1>Se connecter</h1>

        <div class="col-md-6 d-flex">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email <span class="text-danger">*</span></label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="example@gmail.com"
              />
              <small id="emailHelp" class="form-text text-muted"
                >Votre email reste confidentielle.</small
              >
            </div>
            <div class="d-flex justify-content-end">
              <RouterLink to="/restaurePassword">Mot de passe oublié ?</RouterLink>
            </div>
            <br />
            <div class="form-group">
              <label for="exampleInputPassword1"
                >Mot de passe <span class="text-danger">*</span></label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="*******************"
              />
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Souviens-toi de moi ?</label>
            </div>
            <br />
            <div class="col-9 mx-auto">
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-box-arrow-in-right"></i> Se connecter
              </button>
              <br />
              <br />
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-person-fill"></i> Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Section: Design Block -->
  <section class="background-radial-gradient overflow-hidden">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
            The best offer <br />
            <span style="color: hsl(218, 81%, 75%)">for your business</span>
          </h1>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, expedita iusto
            veniam atque, magni tempora mollitia dolorum consequatur nulla, neque debitis eos
            reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5">
              <form>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1" class="form-control" />
                      <label class="form-label" for="form3Example1">First name</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example2" class="form-control" />
                      <label class="form-label" for="form3Example2">Last name</label>
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" />
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <!-- Password input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example33"
                    checked
                  />
                  <label class="form-check-label" for="form2Example33">
                    Subscribe to our newsletter
                  </label>
                </div>

                <!-- Submit button -->
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  class="btn btn-primary btn-block mb-4"
                >
                  Sign up
                </button>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>or sign up with:</p>
                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-link btn-floating mx-1"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-link btn-floating mx-1"
                  >
                    <i class="fab fa-google"></i>
                  </button>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-link btn-floating mx-1"
                  >
                    <i class="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-link btn-floating mx-1"
                  >
                    <i class="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Section: Design Block -->
</template>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .bg-image {
    background-image: url('https://as2.ftcdn.net/v2/jpg/02/86/05/43/1000_F_286054327_3WkcLfTcDA8hQp0ph9ThNf7x3MSxwv0q.jpg'); /* Assurez-vous que le chemin de l'image est correct */
    background-size: cover; /* Couvrir tout le bloc */
    background-position: center; /* Centrer l'image */
    height: 999px; /* Vous pouvez ajuster la hauteur selon vos besoins */
    display: flex;
    align-items: center; /* Centrer verticalement le contenu */
    justify-content: center; /* Centrer horizontalement le contenu */
  }

  .background-radial-gradient {
    background-color: hsl(218, 41%, 15%);
    background-image: radial-gradient(
        650px circle at 0% 0%,
        hsl(218, 41%, 35%) 15%,
        hsl(218, 41%, 30%) 35%,
        hsl(218, 41%, 20%) 75%,
        hsl(218, 41%, 19%) 80%,
        transparent 100%
      ),
      radial-gradient(
        1250px circle at 100% 100%,
        hsl(218, 41%, 45%) 15%,
        hsl(218, 41%, 30%) 35%,
        hsl(218, 41%, 20%) 75%,
        hsl(218, 41%, 19%) 80%,
        transparent 100%
      );
  }

  #radius-shape-1 {
    height: 220px;
    width: 220px;
    top: -60px;
    left: -130px;
    background: radial-gradient(#44006b, #ad1fff);
    overflow: hidden;
  }

  #radius-shape-2 {
    border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
    bottom: -60px;
    right: -110px;
    width: 300px;
    height: 300px;
    background: radial-gradient(#44006b, #ad1fff);
    overflow: hidden;
  }

  .bg-glass {
    background-color: hsla(0, 0%, 100%, 0.9) !important;
    backdrop-filter: saturate(200%) blur(25px);
  }
}
</style>
