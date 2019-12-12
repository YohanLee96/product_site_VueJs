<template>
 <div class="container">
    <h1 class="my-4">Product-List</h1>
    <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4"
            v-for="result in resultList" 
            :key="result" 
           >
            <div class="card h-100">
                <img class="card-img-top" v-bind:src="result.path" alt="자동차 이미지">
                <div class="card-body">
                <h4 class="card-title">
                    <a href="#" v-on:click="sendEvent(result)">
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
                <a class="page-link"  v-on:click="nowPageIndex = nowPageIndex-1">
                    <span aria-hidden="true">&lt;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li
            v-for="pageIndex in pageSetCnt"
                    :key="pageIndex"
                    v-if="firstPageSet<=pageIndex && pageIndex<=lastPageSet"
                    class="page-item" 
                    :class="{'active' : pageActive(pageIndex)}">
                <a class="page-link" v-on:click="pagingClick(pageIndex)">{{pageIndex}}</a>
            </li>
            <li class="page-item">
                <a class="page-link" aria-label="Next" v-on:click="pageNo = pageNo+1">
                    <span aria-hidden="true">&gt;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>          
    </div>
 </div> 
 
</template>

<script>

import common from '../lib/common.js';


export default {
    async created(){
       this.productList = await common.jsonSearchList('product.json');       
    },
    data : function(){
        return {
            productList : [],
            pageSize  : 4,    //한페이지 당 표출할 아이템
            pageNo : 1,    //현재 몇페이지인지..
            pageSet : 10    //페이지셋 기준
            
            
        }
    },
    computed : {
        dataCnt : function(){   //데이터 총 개수
            return this.productList.length;
        },
        pageSetCnt : function(){   //페이지아이템 개수
            return Math.ceil(this.dataCnt/this.pageSize);
        },
        pageSetNo : function(){ //현재 페이지셋
            return Math.ceil(this.pageNo/this.pageSet);  
        },
        lastPageSet : function() { //마지막페이지셋
            return this.pageSetNo * this.pageSet;
        },
        firstPageSet : function() { //첫페이지셋
            return this.lastPageSet - (this.pageSet-1);
        },
        lastItemIndex : function(){  //LIMIT
            return this.pageNo * this.pageSize;    //현재 페이지 인덱스 *  한페이지당 표출할 데이터 개수
        },
        firstItemIndex : function(){     //OFFSET    
            return this.lastItemIndex -this.pageSize;    //마지막 페이지 인덱스 -한페이지당 표출할 데이터 개수
        },
        resultList : function(){    //페이징계산을 거친 리스트
            return this.productList.slice(this.firstItemIndex,this.lastItemIndex);
        }
        
        
    },
    methods:{
         sendEvent : function(item){  //상세보기로 이동.         
            let router = this.$router;
            router.push({
                name : "detail",
                params : {
                     name : item.name,
                     item : item
                }

            })
         },
         pageActive : function(pageIndex){  //현재 보고있는 페이징넘버에 활성화 
             if(this.pageNo == pageIndex){ return true;}
             else false;
         },
         pagingClick : function(pageIndex){ //페이징네비게이션 이벤트
             this.pageNo = pageIndex;
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