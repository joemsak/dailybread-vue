<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-md-8 order-md-first order-last">
        <expenses-list></expenses-list>
      </div>

      <div class="col-md-4 order-md-last order-first">
        <div class="sticky-top">
          <div class="card">
            <div class="card-body">
              <h3>Enter a new expense</h3>
              <expense-form></expense-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseForm from '@/components/expenses/form'
import ExpensesList from '@/components/expenses/list'

export default {
  components: {
    ExpenseForm,
    ExpensesList,
  },
};
</script>