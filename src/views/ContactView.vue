<script setup></script>

<template>
  <section class="row g-3">
    <div class="col-md-3">
      <article class="card">
        <img v-img-src-alt :src="undefined" alt="" class="card-img" />
        <div class="card-body">
          <article>
            <h5 class="card-title">Ambratolm</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button type="button" class="btn btn-secondary d-block w-100">
              <i class="fas fa-envelope" /> Send Message
            </button>
          </article>
        </div>
      </article>
    </div>
    <div class="col">
      <article class="card mb-3">
        <div class="card-body">Main Profiles here...</div>
      </article>

      <article class="card">
        <div
          class="card-header d-flex no-wrap justify-content-between align-items-center"
        >
          <h6 class="card-title m-0">
            <i class="fas fa-address-book" /> Profiles
          </h6>
          <input
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            class="form-control w-50"
          />
        </div>
        <div class="card-body">Profiles here...</div>
      </article>
    </div>
  </section>
</template>

<style scoped></style>
