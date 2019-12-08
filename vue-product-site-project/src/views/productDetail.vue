<template>
   <div class="container">
        <br />
        <div class="card border-0">
            <div class="row">
                <aside class="col-sm-2">
                    <article class="card-body m-0 pt-13 pl-1">
                        <div class="jumbotron jumbotron-fluid">
                            <div class="container">
                                <h1 class="display-4">{{item.name}}</h1>					                       
                                    <div  v-if="item.saleYn =='Y'">
                                        <s>{{item.price}}원</s>&nbsp;
                                        <span class="font-weight-bold">{{item.price-item.disCountPrice}}원</span>
                                    </div>
                                    <div v-else>
                                          <span class="font-weight-bold">{{item.price}}원</span>
                                    </div>
                                <p class="lead">{{item.info}}</p>
                            </div>
                        </div>
                    </article>
                </aside>
                <aside class="col-sm-3">
                    <article class="gallery-wrap"> 
                        <div class="img-big-wrap">
                            <img class="productImg" v-bind:src="item.path">
                        </div>                      
                    </article>
                </aside>
                <aside class="col-sm-5" style="margin-left : 3%">
                    <div class="row">                              
                        <label class="my-1 mr-2" for="color/model">색상/모델</label>
                        <select class="custom-select my-1 mr-sm-2"  v-model="selected" @change="add(selected)">
                            <option value="블랙-1.6Gdi">블랙-1.6Gdi</option>
                            <option value="블랙-2.0Gdi">블랙-2.0Gdi</option>
                            <option value="레드-1.6Gdi">레드-1.6Gdi</option>
                            <option value="레드-2.0Gdi">레드-2.0Gdi</option>
                        </select>
                       <div style="width:100%; height:200px; overflow:auto">
                        <table class="table table-striped" style="overflow-y:auto; ">
                                <tbody>
                                    <tr v-for="(result,index) in buyList" :key="index">
                                        <th scope="row">
                                            <p class="font-weight-bolder">{{item.name}}</p>    
                                            <small style="color:gray">-{{result.name}}</small>
                                        </th>
                                        <td>
                                            <button type="button" v-on:click="minus(result)" class="btn btn-light">-</button>
                                            <input type="text" 
                                                   v-bind:value="result.num"
                                                   style="width:30%"
                                                   id=index/>
                                            <button type="button" v-on:click="plus(result)" class="btn btn-light">+</button> 
                                        </td>
                                        <td>
                                            <p style="white-space: nowrap;">{{item.price-item.disCountPrice}}원</p> 
                                        </td>
                                        <td>
                                            <button type="button" v-on:click="del(index)" class="btn btn-light">X</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>  
                       </div>                                       
                    </div>
                    <div class="row">
                             <h3 class="font-weight-bold">
                                 {{totalProductPrice}}원
                            </h3>
                            <small style="color:blue">({{totalProductNum}}개)</small>   
                    </div>
                    <div class="row">
                        <button type="button" class="btn btn-primary btn-lg btn-block" >장바구니</button>
                        <button type="button" v-on:click="sendEvent(item)" class="btn btn-secondary btn-lg btn-block">바로 구매하기</button>
                    </div>
            
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
import common from '../lib/common.js';

export default {
    async created(){
        let vm = this;
        if(vm.item ==undefined){
           vm.item = await common.jsonSearchFineOne('product.json',vm.index);
        }
    },
    data : function() {
        return {
            //상품 기본정보
            index : this.$route.params.index,   
            item : this.$route.params.item, //상품 주문정보를 담은 객체
            buyList : []    //상품 주문정보를 위한 배열
            
        }
    },
    computed : {
         totalProductNum : function(){
            let totalNum =0;
            for(let i=0;i<this.buyList.length;i++){
                totalNum += this.buyList[i].num;                 
            } 
            
            return totalNum;
        },
        totalProductPrice : function(){       
            return  (this.item.price-this.item.disCountPrice) * this.totalProductNum;
        }
    },
    methods : {
         add : function(item){   
            let obj = this.buyList.find( a=> a.name == item);
            if(obj != undefined){
                alert('해당 제품은 이미 추가한 제품입니다.');
                return false;
            }
            this.buyList.push({name:item,num:1})
         },
         plus : function(item){
             item.num = item.num +1;
         },
         minus : function(item){
             item.num = item.num -1;
         },
         del : function(index){
             //요소 완전삭제를 위해 splice함수 사용.
             this.buyList.splice(index,1);
         },
         sendEvent : function(item){        
            let router = this.$router; 
            router.push({
                name : "confirm",
                params : {
                    index : this.index,
                    buyList  : this.buyList,
                    totalProductPrice : this.totalProductPrice,
                    item : item
                }
            })
         }
    }
}
</script>

<style>
 div.container{
     max-width: none;
 }
 img.productImg{
    position: absolute; top:0; left: 0;
    width: 100%;
    height: 100%;
 }
 select.form-control form-control-sm{
     width:60%;margin-left:5px;
 }
 button.btn.btn-primary{
     width:80%
 }
 button.btn.btn-secondary{
     width:80%
 }

 
    
</style>