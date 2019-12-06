<template>
 <div class="container">
    <h1 class="my-4">Product-List</h1>
    <div class="row">
        <div v-for="(result,index) in productList" :key="index" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
                <img class="card-img-top" v-bind:src="result.path" alt="자동차 이미지">
                <div class="card-body">
                <h4 class="card-title">
                    <a href="#" v-on:click="sendEvent(result,index)">
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

    <!-- 페이징 처리(오류로 인해 잠시 보류) -->
<!--     
    <div class="justify-content-center" style="width: 100%;align-items: center;display: flex;">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" v-on:click="pagingClick(pageCount-1)" aria-label="Previous">
                    <span aria-hidden="true">&lt;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
                <li 
                    v-for="index in pageCnt"
                    v-if="firstPageSet<=index && index<=lastPageSet"
                    :key="index" 
                    class="page-item" 
                    :class="{'active' : pageActive(index)}"
                >
                    <a class="page-link" v-on:click="pagingClick(index)">{{index}}</a>
                </li>
            <li class="page-item">
                <a class="page-link" v-on:click="pagingClick(pageCount+1)" aria-label="Next">
                    <span aria-hidden="true">&gt;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>          
    </div>
    -->
 </div> 
 
</template>

<script>

import axios from 'axios';

export default {
    created(){
        let vm = this;
        axios.get('product.json')
        .then(function(response){
            vm.productList = response.data;
        })
        .catch(function(error){
            console.log(error);              
        })
    },
    data : function(){
        return {
            productList : []
        }
    },
    computed : {
   
    },
    methods:{
         sendEvent : function(item,index){  //상세보기로 이동.         
            let router = this.$router;
            router.push({
                name : "detail",
                params : {
                     index : index,
                     item : item
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