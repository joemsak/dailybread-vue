<template>
  <div class="row justify-content-md-center">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label
          v-if="!currentUser.displayName.length"
          for="displayName"
        >
          Set your display name
        </label>

        <label
          v-else
          for="displayName"
        >
          Change your display name
        </label>

        <input
          id="displayName"
          type="text"
          class="form-control"
          v-model="newDisplayName"
        />
      </div>

      <div class="form-group">
        <strong>Email:</strong> {{ this.currentUser.email }}

        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="Change your email"
          v-model="newEmail"
        />
      </div>

      <div class="form-group">
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Change your password"
          v-model="newPassword"
        />
      </div>

      <button type="submit" class="btn btn-outline-primary">Save</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UserProfile',

  data () {
    return {
      newDisplayName: '',
      newEmail: '',
      newPassword: '',
    }
  },

  methods: {
    handleSubmit () {
      this.$store.dispatch('user/updateCurrentUser', {
        displayName: this.newDisplayName,
        email: this.newEmail,
        password: this.newPassword
      }).then(() => this.reset())
    },

    reset () {
      this.newDisplayName = ''
      this.newEmail = ''
      this.newPassword = ''
    }
  },
}
</script>