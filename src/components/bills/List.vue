<template>
  <div class="table-responsive" v-if="bills.length">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" class="text-right">Amount</th>
          <th scope="col" class="text-right">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="bill in bills"
          :key="bill['.key']"
        >
          <td>{{ bill.name }}</td>
          <td class="text-right">{{ bill.amount | currency }}</td>
          <td class="text-right">
            <remove-btn
              tooltip="Remove this bill"
              @click.native.prevent="removeBill(bill)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="alert alert-notice" role="alert">
    No bills to show yet ...
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import RemoveBtn from '@/components/RemoveBtn'

export default {
  computed: {
    ...mapGetters('bills', ['payPeriod1', 'payPeriod2']),

    bills () {
      return this[`payPeriod${this.mgmtPayPeriod}`]
    },
  },

  props: ['mgmtPayPeriod'],

  methods: {
    removeBill(bill) {
      this.$store.dispatch('bills/remove', bill)
    },
  },

  components: {
    RemoveBtn,
  },
}
</script>