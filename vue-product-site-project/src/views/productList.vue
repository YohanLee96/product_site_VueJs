<template>
 <div class="container">
    <h1 class="my-4">신차 리스트</h1>
    <div class="row">
        <div v-for="(result,index) in productList" :key="index" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
                <img class="card-img-top" v-bind:src="result.path" alt="자동차 이미지">
                <div class="card-body">
                <h4 class="card-title">
                    <a href="#" v-on:click="sendEvent(index)">
                        {{result.name}}
                    </a>
                </h4>
                <hr width="100%">
                <p class="card-text">{{result.info}}</p>
                <p class="card-text" v-if="result.saleYn =='N'">
                    <small class="text-muted">{{result.price}}원</small>
                </p>
                <p class="card-text" v-else>
                    <s><small class="text-muted">{{result.price}}원</small></s> &nbsp;
                    <small class="text-muted">{{result.price - result.disCountPrice}}원</small>
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
            productList : this.getJson()
        }
    },
    methods:{
         getJson : function(){  //json 데이터 가져옴.
             let vm = this;
             axios.get('product.json')
                .then(function(response){
                    vm.productList = response.data;
                })
                .catch(function(error){
                    console.log(error);              
                })
             
         },
         sendEvent : function(index){  
            let vm = this;           
            let router = this.$router;
            router.push({
                name : "detail",
                params : {
                    "index" : index,
                    "name" : vm.productList[index].name,
                    "price" : vm.productList[index].price,
                    "info" : vm.productList[index].info,
                    "saleYn" : vm.productList[index].saleYn,      
                    "disCountPrice" : vm.productList[index].disCountPrice,                                        
                    "path" : vm.productList[index].path

                }

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