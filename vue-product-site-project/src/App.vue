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
  },
  data : function(){
    return {
      data : 'aa'
    }
  },
  methods:{
    parentMethod : function(data){
      console.log(data);
    }
  },

}
</script>

<style>

</style>
