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
        :value="bill.name"
        @input="modifyBill"
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
          ref="billAmount"
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
          :value="bill.amount"
          @input="modifyBill"
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
      <strong>Remaining: {{ remaining(mgmtPayPeriod) | currency }}</strong>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: ['mgmtPayPeriod'],

  computed: {
    ...mapGetters(['remaining']),
    ...mapState('bills', ['editing', 'bill']),

    actionName () {
      return this.editing ? 'bills/update' : 'bills/add'
    },
  },

  methods: {
    modifyBill (evt) {
      let payload = {}
      payload[evt.target.id] = evt.target.value
      this.$store.dispatch("bills/modifyBill", payload)
    },

    handleSubmit() {
      this.$store.dispatch(this.actionName)
        .then(() => {
          this.$refs.billName.focus()
        })
    },
  },
}
</script>