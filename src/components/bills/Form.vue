<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group mb-3">
      <label for="name">Name</label>

      <input
        type="text"
        id="name"
        ref="billName"
        class="form-control"
        aria-label="Name"
        v-model="newBill.name"
      />
    </div>

    <div class="form-group">
      <label for="amount">Amount</label>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>

        <input
          type="number"
          id="amount"
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
          v-model.number="newBill.amount"
        />

        <div class="input-group-append">
          <span class="input-group-text">.00</span>
        </div>
      </div>
    </div>

    <div class="text-right mb-3">
      <button type="submit" class="btn btn-outline-primary">Save</button>
    </div>
    
    <div class="text-right">
      <strong>Remaining: {{ remaining | currency }}</strong>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      newBill: {},
    }
  },
  
  computed: mapGetters(['remaining']),

  methods: {
    handleSubmit() {
      this.$store.dispatch('bills/add', this.newBill)
        .then(() => {
          this.newBill = {}
          this.$refs.billName.focus()
        })
    },
  },
}
</script>