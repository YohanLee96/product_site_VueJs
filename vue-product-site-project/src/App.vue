<template>
  <div id="app">
    <app-header></app-header>
    <app-content></app-content>
  </div>
</template>
<script>
import AppHeader from './components/header';
import ProductList from './components/productList';


export default {
  components  : {
      'app-header' : AppHeader,
      'app-content' : ProductList
  }
}
</script>

<style>
  
</style>