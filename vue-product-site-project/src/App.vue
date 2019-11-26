<template>
  <div id="app">
   <header-view></header-view>
  <router-view/>
  </div>
</template>

<script>
import headerView from './views/header.vue';

export default {
  components :{
    'header-view' : headerView
  }
}
</script>

<style>

</style>
