<script setup>
import PageCard from "../components/PageCard.vue";
</script>

<template>
  <PageCard title="Contact" subtitle="Send me a message">
    <div class="text-center mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" placeholder="Email" />
    </div>
    <div class="text-center mb-3">
      <label for="message" class="form-label">Message</label>
      <textarea
        class="form-control"
        id="message"
        rows="3"
        placeholder="Your Message"
      ></textarea>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-primary d-block w-100">Send</button>
    </div>
  </PageCard>
</template>

<style scoped></style>
