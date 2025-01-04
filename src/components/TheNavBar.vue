<script setup>
import { useDarkTheme, useCoreTheme } from "@/core/theme";

const darkTheme = useDarkTheme();
const coreTheme = useCoreTheme();
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="navbar-brand">
        <RouterLink :to="{ name: 'home' }">LOGO</RouterLink>
      </div>
      <button
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#main-navbar-collapse`"
        :aria-controls="`main-navbar-collapse`"
        aria-expanded="true"
        :aria-label="`Toggle main navigation`"
        class="navbar-toggler"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <fieldset class="input-group my-1 my-lg-0 me-lg-3" role="Search">
        <input
          type="search"
          name="search"
          placeholder="Search"
          aria-label="Search"
          class="form-control z-0"
        />
        <button
          @click="search(query)"
          class="btn"
          :class="$route.name === 'search' ? 'btn-primary' : 'btn-secondary'"
          aria-label="Search"
        >
          <i class="fas fa-search" aria-hidden="true" />
          <span class="visually-hidden">Execute search</span>
        </button>
      </fieldset>
      <div
        class="navbar-collapse collapse mt-3 mt-lg-0"
        :id="`main-navbar-collapse`"
      >
        <ul
          class="nav nav-pills flex-md-nowrap justify-content-center mb-1 mb-md-0"
        >
          <li
            v-for="{ name, $icon } in $navRoutes"
            :key="name"
            class="nav-item"
          >
            <RouterLink
              :to="{ name }"
              class="nav-link d-inline-flex align-items-center position-relative text-capitalize"
            >
              <i :class="$icon" class="me-1" aria-hidden="true" /> {{ name }}
            </RouterLink>
          </li>
          <li class="nav-item ms-3">
            <div
              class="btn-group"
              role="group"
              aria-label="Theme Settings Group"
            >
              <a
                @click="darkTheme.toggle()"
                v-tooltip="darkTheme.current.title"
                href="#"
                class="btn btn-secondary"
              >
                <i :class="darkTheme.current.icon" />
              </a>
              <a
                @click="coreTheme.toggle()"
                v-tooltip="coreTheme.current.title"
                href="#"
                class="btn btn-secondary"
              >
                <i :class="coreTheme.current.icon" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
