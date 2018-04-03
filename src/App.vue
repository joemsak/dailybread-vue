<template>
  <div class="container-fluid">
    <db-nav></db-nav>

    <router-view></router-view>
  </div>
</template>

<script>
import DbNav from '@/layout/Nav'

export default {
  components: {
    DbNav,
  },
}
</script>

<style>
label {
  display:block;
  cursor: pointer;
}
</style>