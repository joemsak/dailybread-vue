<template>
  <button
    ref="removeBtn"
    class="btn btn-sm btn-outline-danger"
    data-toggle="tooltip"
    data-placement="top"
    :title="tooltip"
  >
    &times;
  </button>
</template>

<script>
export default {
  props: ['tooltip'],

  mounted () {
    $(this.$refs.removeBtn).tooltip()
  },

  beforeDestroy () {
    $(this.$refs.removeBtn).tooltip('dispose')
  },
}
</script>