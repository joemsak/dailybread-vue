<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-md-8 order-md-first order-last">
        <bills-list :mgmt-pay-period="mgmtPayPeriod"></bills-list>
      </div>

      <div class="col-md-4 order-md-last order-first">
        <div class="sticky-top">
          <div class="col btn-group btn-group-toggle mb-3">
            <label
              :class="['btn', 'btn-outline-secondary', mgmtPayPeriod === 1 ? 'active' : '']"
              for="payPeriod1"
            >
              <input
                class="form-check-input"
                type="radio"
                name="mgmtPayPeriod"
                id="payPeriod1"
                value="1"
                @click="updateMgmtPayPeriod(1)"
              />
              1<sup>st</sup> pay period
            </label>

            <label
              :class="['btn', 'btn-outline-secondary', mgmtPayPeriod === 2 ? 'active' : '']"
              for="payPeriod2"
            >
              <input
                class="form-check-input"
                type="radio"
                name="mgmtPayPeriod"
                id="payPeriod2"
                value="2"
                @click="updateMgmtPayPeriod(2)"
              />
                2<sup>nd</sup> pay period
            </label>
          </div>

          <div class="card">
            <div class="card-body">
              <h3>Enter a new bill</h3>
              <bills-form :mgmt-pay-period="mgmtPayPeriod"></bills-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BillsForm from './Form'
import BillsList from './List'

export default {
  computed: mapState(['currentPayPeriod', 'mgmtPayPeriod']),

  components: {
    BillsList,
    BillsForm,
  },

  methods: {
    updateMgmtPayPeriod (value) {
      this.$store.dispatch('updateMgmtPayPeriod', value)
      window.location.hash = `period-${value}`
    },
  },

  mounted () {
    let hash = window.location.hash

    if (!!hash.length) {
      this.$store.dispatch('updateMgmtPayPeriod', parseInt(hash.split('-')[1]))
    } else if (!this.mgmtPayPeriod) {
      this.$store.dispatch('updateMgmtPayPeriod', this.currentPayPeriod)
    }
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