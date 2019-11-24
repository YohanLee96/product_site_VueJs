<template>
 <div class="container">
    <h1 class="my-4">신차 리스트</h1>
    <div class="row">
        <div v-list
        v-for="(result,index) in productList"
        :key="index" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
                <img class="card-img-top" v-bind:src="result.path" alt="자동차 이미지">
                <div class="card-body">
                <h4 class="card-title">
                    <a href="#">{{result.name}}</a>
                </h4>
                <hr width="100%">
                <p class="card-text">{{result.info}}</p>
                <p class="card-text" v-if="result.saleYn =='N'">
                    <small class="text-muted">{{result.price}}만원</small>
                </p>
                <p class="card-text" v-else>
                    <s><small class="text-muted">{{result.price}}만원</small></s> &nbsp;
                    <small class="text-muted">{{result.price - result.disCountPrice}}만원</small>
                </p>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>

<script>

import axios from 'axios';
export default {
    data : function(){
        return {
            productList : this.getJson()  //json으로 받아온 제품리스트 받아올 객체
        }
    },
    methods:{
         getJson : function(){
             let vm = this;
             axios.get('product.json')
                .then(function(response){
                    console.log(response.data);
                    vm.productList = response.data;
                })
                .catch(function(error){
                    console.log(error);
                    
                })
             
         }

     }
}
</script>

<style>
    div.card{
            border: none;
        }
        div.sub-title{
            margin : 40px 0px 40px 0px;
        }
        img.card-img-top{
            width:200px;
            display: block; 
            margin: 0px auto
        }
        img.heart{
            width:25px; 
            margin-left: 10px;
        }
        h4.card-title{
            text-align: center;
            color: black;
        }
        p.card-text{
            text-align: center;
            color:gray;
        }
        small.text-muted{
            font-weight: bold;
        }
</style>