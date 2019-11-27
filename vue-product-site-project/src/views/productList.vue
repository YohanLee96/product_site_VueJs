<template>
 <div class="container">
    <h1 class="my-4">제품 리스트</h1>
    <div class="row">
        <div v-for="(result,index) in paginatedData" :key="index" class="col-lg-3 col-md-4 col-sm-6 mb-4">
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

    <!-- 페이징 처리 -->
    <div class="justify-content-center" style="width: 100%;align-items: center;display: flex;">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&lt;</span>
                    <span class="sr-only">Previous</span>
                    </a>
            </li>
            <li v-for="index in pageCnt" :key="index" class="page-item">
                <a class="page-link" href="#">{{index}}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&gt;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>          
    </div>
 </div>
 
</template>

<script>

import axios from 'axios';

export default {
    data : function(){
        return {
            productList : this.getJson(),
            //페이징 객체
            pageSize : 4,              //한페이지 표출할 게시물 수.
            pagingBarCnt : 10,               // 푸터에 페이징 바는 몇까지 표출할지.
            PageNum : 1

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
         sendEvent : function(index){  //상세보기로 이동.
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
    },
    computed : {
       dataCnt : function() {   //총 게시물 수.
           return this.productList.length;
       },
       pageCount : function() {   //페이징바 총 카온트
            let listLeng = this.productList.length;
            let listSize = this.pageSize;
            let page = Math.floor(listLeng / listSize);
            if (listLeng % listSize > 0) page += 1;
            return page;
       },
       paginatedData : function() {
            let start = this.pageNum * this.pageSize;
            let end = start + this.pageSize;
            return this.productList.slice(start, end);
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