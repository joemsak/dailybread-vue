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
          name="displayName"
          type="text"
          class="form-control"
          v-model="newDisplayName"
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
    }
  },

  methods: {
    handleSubmit () {
      this.$store.dispatch('updateCurrentUser', {
        displayName: this.newDisplayName,
      }).then(() => { this.newDisplayName = '' })
    },
  },
}
</script>