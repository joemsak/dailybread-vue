<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group mb-3">
      <label for="name">Name</label>

      <input
        type="text"
        id="name"
        ref="expenseName"
        class="form-control"
        aria-label="Name"
        :value="expense.name"
        @input="modifyExpense"
      />
    </div>

    <div class="form-group mb-3">
      <label for="category">Category</label>

      <input
        type="text"
        id="category"
        class="form-control"
        aria-label="Category"
        :value="expense.category"
        @input="modifyExpense"
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
          :value="expense.amount"
          @input="modifyExpense"
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
      <strong>Remaining: {{ remaining() | currency }}</strong>
    </div>
  </form>
</template>

<script>
import moment from 'moment'

import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters(['remaining']),

    ...mapState('expenses', ['editing', 'expense']),

    actionName () {
      return this.editing ? 'expenses/update' : 'expenses/add'
    },
  },

  methods: {
    modifyExpense (evt) {
      let payload = {}
      payload[evt.target.id] = evt.target.value
      this.$store.dispatch("expenses/modifyExpense", payload)
    },

    handleSubmit() {
      this.$store.dispatch(this.actionName)
        .then(() => this.$refs.expenseName.focus())
    },
  },
}
</script>