<script setup></script>

<template>
  <section class="row gx-3">
    <div class="col-3">
      <article class="card">
        <header class="card-header">Profiles</header>
        <p class="card-body text-start">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id modi
          nemo, laborum quaerat voluptate rem reiciendis consequatur corrupti.
          Quos rerum ipsum dolorem unde deserunt molestias, repellendus facere
          earum dolore debitis?
        </p>
      </article>
    </div>
    <div class="col">
      <article class="card">
        <header class="card-header">Works</header>
        <p class="card-body text-start">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
          inventore, nam praesentium quae sit doloremque nihil corrupti debitis
          odio reiciendis minus vitae cum omnis porro, hic in natus similique
          eligendi.
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.grid-home {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 16px;
}
@media (max-width: 1000px) {
  .grid-home {
    grid-template-columns: 1fr;
  }
}
</style>
