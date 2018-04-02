<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-md-8 order-md-first order-last">
        <bills-list></bills-list>
      </div>

      <div class="col-md-4 order-md-last order-first">
        <div class="sticky-top">
          <div class="col btn-group btn-group-toggle mb-3">
            <label
              :class="['btn', 'btn-outline-secondary', payPeriod === 1 ? 'active' : '']"
              for="payPeriod1"
            >
              <input
                class="form-check-input"
                type="radio"
                name="payPeriod"
                id="payPeriod1"
                value="1"
                v-model.number="payPeriod"
              />
              1<sup>st</sup> pay period
            </label>

            <label
              :class="['btn', 'btn-outline-secondary', payPeriod === 2 ? 'active' : '']"
              for="payPeriod2"
            >
              <input
                class="form-check-input"
                type="radio"
                name="payPeriod"
                id="payPeriod2"
                value="2"
                v-model.number="payPeriod"
              />
                2<sup>nd</sup> pay period
            </label>
          </div>

          <div class="card">
            <div class="card-body">
              <h3>Enter a new bill</h3>
              <bills-form></bills-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BillsForm from '@/components/bills/form'
import BillsList from '@/components/bills/list'

export default {
  data () {
    return {
      payPeriod: 1,
    }
  },

  components: {
    BillsList,
    BillsForm,
  },

  watch: {
    payPeriod () {
      this.$store.dispatch('updatePayPeriod', this.payPeriod)
      window.location.hash = `period-${this.payPeriod}`
    },
  },

  mounted () {
    let hash = window.location.hash
    if (hash) this.payPeriod = parseInt(hash.split('-')[1])
  },
};
</script>

<style scoped>
.grid-col-header {
  font-weight: bold;
}

.grid-cell--align-right {
  text-align: right;
}
</style>