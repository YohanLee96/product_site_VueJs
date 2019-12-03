<template>
 <div class="container">
    <h1 class="my-4">Product-List</h1>
    <div class="row">
        <div v-for="(result,index) in pageList" :key="index" class="col-lg-3 col-md-4 col-sm-6 mb-4">
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
            productList : [],
            pageSize : 4,              // 한페이지 표출할 게시물 수
            firstIndex : 0,            // 첫번째 게시물 Index
            lastIndex : 4,             // 마지막 게시물 Index 
            pageCount : 1,             // 현재 몇페이지인지.. 
            pageSet : 10,       // 페이지 셋 기준
        }
    },
    computed : {
       dataCnt : function() {   //총 게시물 수.
           return this.productList.length;
       },
       pageCnt : function(){    //페이지셋 갯수
           return Math.ceil(this.dataCnt/this.pageSize);
       },
       pageList : function(){   //데이터 slice
            return this.productList.slice(this.firstIndex,this.lastIndex);
       },
       firstPageSet : function(){
           return Math.floor(this.pageCount/this.pageSet) * this.pageSet;
       },
       lastPageSet : function(){
           return this.firstPageSet + this.pageSet;
       }

       
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
         },
         pagingClick : function(index){ //페이징 계산 함수.
             if(index <= 0 || this.pageCnt<index){    //index가 0이하거나, 최대페이지셋 개수를 초과할 경우, 아무 작업안함.
                return false;
             }else{ //페이징 계산.
                this.pageCount = index;
                this.firstIndex = (index-1) * this.pageSize;
                this.lastIndex = this.firstIndex + this.pageSize;


             }
         },
         pageActive : function(index){  //현재 페이지 클래스 active 시켜주는 함수
             if(index==this.pageCount){ return true;}
             else return false;
             
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