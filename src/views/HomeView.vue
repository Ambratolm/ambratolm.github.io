<script setup>
import DataWorkCard from "@/components/DataWorkCard.vue";
import { useWorksStore } from "@/modules/stores";

const worksStore = useWorksStore();
const randomWork = worksStore.randomItem();
</script>

<template>
  <section class="row g-3">
    <div class="col-md-3">
      <article class="card">
        <div
          class="card-header d-flex no-wrap justify-content-between align-items-center"
        >
          <h6 class="card-title m-0">
            <i class="fas fa-address-card" /> Random Work
          </h6>
        </div>
        <div class="card-body">
          <DataWorkCard :work="randomWork" />
        </div>
      </article>
    </div>
    <div class="col">
      <article class="card">
        <div
          class="card-header d-flex no-wrap justify-content-between align-items-center"
        >
          <h6 class="card-title m-0">
            <i class="fas fa-landmark" /> Lorem ipsum
          </h6>
        </div>
        <div class="card-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam culpa
          dolorem officia repudiandae veniam mollitia recusandae. Laboriosam in
          magnam praesentium facilis? Porro accusamus sit ducimus nemo minima,
          ratione alias neque.
        </div>
      </article>
    </div>
  </section>
</template>
