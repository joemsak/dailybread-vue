<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Dailybread</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li
          :class="['nav-item', $route.name === 'Expenses' ? 'active': '']"
        >
          <router-link :to="{ name: 'Expenses' }" class="nav-link">
            Expenses
          </router-link>
        </li>

        <li
          :class="['nav-item', $route.name === 'Bills' ? 'active': '']"
        >
          <router-link :to="{ name: 'Bills' }" class="nav-link">
            Manage Bills
          </router-link>
        </li>

        <li
          :class="['nav-item', $route.name === 'UserProfile' ? 'active': '']"
        >
          <router-link :to="{ name: 'UserProfile' }" class="nav-link">
            My Profile
          </router-link>
        </li>
      </ul>

      <span class="navbar-text">
        Welcome, {{ currentUser.displayName }}
        <template v-if="!currentUser.guest">
          |
          <a
            href="#"
            @click.prevent="logOut"
          >
            logout
          </a>
        </template>
      </span>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    logOut () {
      firebase.auth().signOut()
      this.$router.push('/signin')
    },
  },
}
</script>