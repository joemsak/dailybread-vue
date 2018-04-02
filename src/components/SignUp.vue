<template>
  <div class="row justify-content-md-center">
    <div v-if="attemptingSignUp" class="alert alert-primary" role="alert">
      Signing you up...
    </div>

    <form
      v-if="currentUser.guest && !attemptingSignUp"
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

      <button type="submit" class="btn btn-outline-primary">Sign up</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  
  data () {
    return {
      attemptingSignUp: false,
      
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
      this.attemptingSignUp = true
      
      firebase.auth().createUserWithEmailAndPassword(
        this.newUser.email,
        this.newUser.password
      ).then(() => {
        this.attemptingSignUp = false
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          firebase.auth().signInWithEmailAndPassword(
            this.newUser.email,
            this.newUser.password
          ).then(() => {
            this.attemptingSignUp = false
          })
        } else {
          console.error(error.code)
        }
      })
    },
  },
}
</script>