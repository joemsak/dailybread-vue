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
            <action-btn
              modifierClass="btn-outline-secondary"
              tooltip="Edit this bill"
              icon="feather/edit"
              size="16"
              @click.native.prevent="editBill(bill)"
            />

            <action-btn
              modifierClass="btn-outline-danger"
              tooltip="Remove this bill"
              icon="fontawesome/close"
              size="16"
              @click.native.prevent="removeBill(bill)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="alert alert-primary" role="alert">
    No bills to show yet ...
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import ActionBtn from '@/components/utils/ActionBtn'

export default {
  computed: {
    ...mapGetters('bills', ['payPeriod1', 'payPeriod2']),

    bills () {
      return this[`payPeriod${this.mgmtPayPeriod}`] || []
    },
  },

  props: ['mgmtPayPeriod'],

  methods: {
    editBill(bill) {
      this.$emit('editBill', bill)
    },

    removeBill(bill) {
      this.$store.dispatch('bills/remove', bill)
    },
  },

  components: {
    ActionBtn,
  },
}
</script>