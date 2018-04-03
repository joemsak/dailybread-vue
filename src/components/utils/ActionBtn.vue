<template>
  <img
    ref="actionBtn"
    :class="['btn', 'btn-sm', this.modifierClass]"
    data-toggle="tooltip"
    data-placement="top"
    :title="tooltip"
    :src="`https://icongr.am/${icon}.svg?size=${size}&color=${color}`"
    @mouseover="hovering = true"
    @mouseout="hovering = false"
  />
</template>

<script>
export default {
  data () {
    return {
      hovering: false,
    }
  },

  props: ['tooltip', 'modifierClass', 'icon', 'size'],

  computed: {
    color () {
      if (this.hovering)
        return 'ffffff'

      if (this.modifierClass === 'btn-outline-danger')
        return 'ff0000'
      
      return ''
    },
  },

  mounted () {
    $(this.$refs.actionBtn).tooltip()
  },

  beforeDestroy () {
    $(this.$refs.actionBtn).tooltip('dispose')
  },
}
</script>