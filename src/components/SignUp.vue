<template>
  <div class="row justify-content-md-center">
    <div v-if="attemptingSignIn" class="alert alert-primary mt-3" role="alert">
      Signing you in...
    </div>

    <form
      v-if="!currentUser && !attemptingSignIn"
      @submit.prevent="handleSubmit"
    >
      <div class="form-group">
        <label for="email">Email</label>
        <input
          name="email"
          class="form-control"
          v-model="newUser.email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          name="password"
          type="password" 
          class="form-control"
          v-model="newUser.password"
        />
      </div>

      <button type="submit" class="btn btn-outline-primary">Sign in</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  
  data () {
    return {
      attemptingSignIn: false,
      
      newUser: {
        email: window.localStorage.getItem('db-currentUser-email'),
        password: '',
      },
    }
  },

  watch: {
    newUser: {
      handler() {
        window.localStorage.setItem('db-currentUser-email', this.newUser.email)
      },
      deep: true,
    },
  },

  methods: {
    handleSubmit () {
      this.attemptingSignIn = true
      
      firebase.auth().signInWithEmailAndPassword(
        this.newUser.email,
        this.newUser.password
      ).then(() => {
        this.attemptingSignIn = false
        this.$router.push(this.$route.query.from || '/')
      })
    },
  },
}
</script>