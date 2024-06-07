<template>
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="1"></li>
      <li data-target="#carouselExampleSlidesOnly" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100 custom-carousel-img" src="/src/assets/montre.png" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100 custom-carousel-img" src=".../800x400?auto=yes&bg=666&fg=444&text=Second slide" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100 custom-carousel-img" src=".../800x400?auto=yes&bg=555&fg=333&text=Third slide" alt="Third slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleSlidesOnly" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleSlidesOnly" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  <!-- New Section -->
  <div id="product-section" class="container mt-5">
    <div class="row">
      <div class="col-md-4 text-center">
        <div class="product-card">
          <div class="text-container">
            <h3 class="custom-title">T-Shirt Tunic Tops Blouse</h3>
            
            <a href="#" class="btn dark-gray-btn custom-link">Achetez maintenant &#8594;</a>
          </div>
          <img src="/src/assets/Trico.png" alt="T-Shirt Tunic Tops Blouse" class="img-fluid product-image">
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="product-card">
          <div class="text-container">
            <h3 class="custom-title">Satchel Tote Crossbody Bags</h3>
            <a href="#" class="btn dark-gray-btn custom-link">Achetez maintenant &#8594;</a>
          </div>
          <img src="/src/assets/SAC.png" alt="Satchel Tote Crossbody Bags" class="img-fluid product-image">
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="product-card">
          <div class="text-container">
            <h3 class="">Men's Tennis Walking Shoes</h3>
            <a href="#" class="btn dark-gray-btn custom-link">Achetez maintenant &#8594;</a>
          </div>
          <img src="/src/assets/spadrine.png" alt="Men's Tennis Walking Shoes" class="img-fluid product-image">
        </div>
      </div>
    </div>
  </div>

   <!-- New Product Category Section with Carousel -->
  <div id="product-category-section" class="container mt-5">
    <div id="productCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row justify-content-center">
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/CB.png" alt="Headphones" class="category-image">
                <h4>Headphones</h4>
                <p>5 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/MC.png" alt="With Bluetooth" class="category-image">
                <h4>With Bluetooth</h4>
                <p>7 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/pay.png" alt="Mobile Phone" class="category-image">
                <h4>Mobile Phone</h4>
                <p>5 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/T.png" alt="CPU Heat Pipes" class="category-image">
                <h4>CPU Heat Pipes</h4>
                <p>7 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/SAC.png" alt="Smart Watch" class="category-image">
                <h4>Smart Watch</h4>
                <p>6 products</p>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row justify-content-center">
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/CB.png" alt="Headphones" class="category-image">
                <h4>Headphones</h4>
                <p>5 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/MC.png" alt="With Bluetooth" class="category-image">
                <h4>With Bluetooth</h4>
                <p>7 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/pay.png" alt="Mobile Phone" class="category-image">
                <h4>Mobile Phone</h4>
                <p>5 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/T.png" alt="CPU Heat Pipes" class="category-image">
                <h4>CPU Heat Pipes</h4>
                <p>7 products</p>
              </div>
            </div>
            <div class="col-md-2">
              <div class="product-category-card">
                <img src="/src/assets/SAC.png" alt="Smart Watch" class="category-image">
                <h4>Smart Watch</h4>
                <p>6 products</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Add more carousel-item divs here if you have more items to show -->
      </div>
      <a class="carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#productCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
  <hr>


   <!--newwwwwwwwwwww-->
  <!-- New Arrivals Section -->
  <div id="new-arrivals-section" class="container mt-5">
    <h2 class="text-center">Nouvelles arrivées</h2>
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <img src="/src/assets/SAC.png" class="card-img-top" alt="Product 1">
          <div class="card-body">
            <h5 class="card-title">Sonos Beam Gen 2 Soundbar</h5>
            <p class="card-text">$930.00</p>
            <div class="card-reviews">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <p>(9 reviews)</p>
            </div>
            <a href="#" class="btn btn-primary">Add to Cart</a>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <img src="/src/assets/SAC.png" class="card-img-top" alt="Product 2">
          <div class="card-body">
            <h5 class="card-title">Bose Smart Soundbar 900</h5>
            <p class="card-text">$689.00</p>
            <div class="card-reviews">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <p>(9 reviews)</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <img src="/src/assets/SAC.png" class="card-img-top" alt="Product 3">
          <div class="card-body">
            <h5 class="card-title">Sennheiser Ambeo Soundbar</h5>
            <p class="card-text">$1,679.00</p>
            <div class="card-reviews">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <p>(10 reviews)</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <img src="/src/assets/SAC.png" class="card-img-top" alt="Product 4">
          <div class="card-body">
            <h5 class="card-title">Microsoft Surface Pro 8</h5>
            <p class="card-text">$606.00</p>
            <div class="card-reviews">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <p>(10 reviews)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <a href="#" class="btn btn-link">Voir plus</a>
    </div>
  </div>
</template>

<style scoped>
#hero-section {
  background-color: #00334e;
  color: white;
  padding: 50px 0;
}

.carousel-indicators li {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #666;
}

.carousel-indicators .active {
  background-color: #333;
}

.custom-carousel-img {
  height: 300px; /* Adjust the height as needed */
  width: 100%;
  object-fit: cover; /* Ensures the image fills the container without distortion */
}

#product-section {
  padding: 30px 0;
}

.product-card {
  border: 4px solid #ddd;
  padding: 30px;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.product-card .text-container {
  text-align: left;
  margin-right: 800px; /* Adjust to fit the image */
}

.product-card img.product-image {
  position: absolute;
  top: 5px;
  right: 20px;
  max-height: 120px; /* Adjust to make the image smaller */
  width: auto;
}

.product-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.product-card .btn {
  background-color: #4a4a4a;
  border-color: #4a4a4a;
  color: #fff;
  text-transform: uppercase;
}
.custom-link {
    white-space: nowrap; /* Empêche le texte de se retourner à la ligne */
    max-width: 300px; /* Ajustez la largeur maximale selon vos besoins */
    overflow: hidden; /* Cache tout contenu dépassant de la largeur maximale */
    text-overflow: ellipsis; /* Ajoute des points de suspension à la fin du texte dépassant */
  }
  
  .custom-title {
    font-size: 24px; /* Ajustez la taille de la police selon vos besoins */
    line-height: 1.5; /* Ajustez la hauteur de ligne selon vos besoins */
  }
 /* New Product Category Section Styles */

/* New Product Category Section Styles */
#product-category-section {
  padding: 30px 0;
}

.product-category-card {
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.product-category-card img.category-image {
  height: 100px; /* Adjust to fit the circle size */
  width: 100px; /* Adjust to fit the circle size */
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-category-card h4 {
  font-size: 18px;
  margin-bottom: 5px;
}

.product-category-card p {
  font-size: 14px;
  color: #666;
}

/* Custom styles for carousel controls */
.carousel-control-prev,
.carousel-control-next {
  width: 5%; /* Adjust the width of the controls */
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #333; /* Change color as needed */
  border-radius: 50%;
}
/* New Product Category Section Styles */
#product-category-section {
  padding: 30px 0;
}

.product-category-card {
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.product-category-card img.category-image {
  height: 100px; /* Adjust to fit the circle size */
  width: 100px; /* Adjust to fit the circle size */
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-category-card h4 {
  font-size: 18px;
  margin-bottom: 5px;
}

.product-category-card p {
  font-size: 14px;
  color: #666;
}

/* Custom styles for carousel controls */
.carousel-control-prev,
.carousel-control-next {
  width: 5%; /* Adjust the width of the controls */
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #333; /* Change color as needed */
  border-radius: 50%;
}

/* New Arrivals Section Styles */
#new-arrivals-section {
  padding: 30px 0;
}

#new-arrivals-section .card {
  margin-bottom: 20px;
}

#new-arrivals-section .card-title {
  font-size: 16px;
  margin-bottom: 5px;
}

#new-arrivals-section .card-text {
  font-size: 14px;
  color: #333;
}

#new-arrivals-section .card-reviews {
  font-size: 12px;
  color: #666;
}

#new-arrivals-section .btn-link {
  font-size: 16px;
  color: #007bff;
}

#new-arrivals-section .btn-link:hover {
  text-decoration: underline;
}

#product-category-section {
  padding: 30px 0;
}

.product-category-card {
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.product-category-card img.category-image {
  height: 100px; /* Adjust to fit the circle size */
  width: 100px; /* Adjust to fit the circle size */
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-category-card h4 {
  font-size: 18px;
  margin-bottom: 5px;
}

.product-category-card p {
  font-size: 14px;
  color: #666;
}

/* Custom styles for carousel controls */
.carousel-control-prev,
.carousel-control-next {
  width: 5%; /* Adjust the width of the controls */
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #333; /* Change color as needed */
  border-radius: 50%;
}

/* New Arrivals Section Styles */
#new-arrivals-section {
  padding: 30px 0;
}

#new-arrivals-section .card {
  margin-bottom: 20px;
}

#new-arrivals-section .card-title {
  font-size: 16px;
  margin-bottom: 5px;
}

#new-arrivals-section .card-text {
  font-size: 14px;
  color: #333;
}

#new-arrivals-section .card-reviews {
  font-size: 12px;
  color: #666;
}

#new-arrivals-section .checked {
  color: orange;
}

#new-arrivals-section .btn-link {
  font-size: 16px;
  color: #007bff;
}

#new-arrivals-section .btn-link:hover {
  text-decoration: underline;
}

</style>
