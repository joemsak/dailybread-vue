<template>
  <div class="table-responsive" v-if="expenses.length">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Name</th>
          <th scope="col" class="text-right">Amount</th>
          <th scope="col" class="text-right">Action</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="expense in expenses.slice().reverse()"
          :key="expense['.key']"
        >
          <td class="text-uppercase text-muted font-weight-bold">
            {{ expense.category }}
          </td>
          <td>{{ expense.name }}</td>
          <td class="text-right">{{ expense.amount | currency }}</td>
          <td class="text-right">
            <action-btn
              modifierClass="btn-outline-dark"
              tooltip="Edit this expense"
              icon="feather/edit"
              size="16"
              @click.native.prevent="editExpense(expense)"
            />

            <action-btn
              modifierClass="btn-outline-danger"
              tooltip="Remove this expense"
              icon="fontawesome/close"
              size="16"
              @click.native.prevent="removeExpense(expense)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="alert alert-primary" role="alert">
    No expenses to show yet...
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ActionBtn from '@/components/utils/ActionBtn'

export default {
  computed: mapState('expenses', ['expenses']),

  methods: {
    editExpense(expense) {
      this.$store.dispatch('expenses/edit', expense)
    },

    removeExpense(expense) {
      this.$store.dispatch('expenses/remove', expense)
    },
  },

  components: {
    ActionBtn,
  },
}
</script>