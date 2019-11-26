<template>
   <div class="container">
        <br />
        <div class="card border-0">
            <div class="row">
                <aside class="col-sm-2">
                    <article class="card-body m-0 pt-13 pl-1">
                        <h3 class="title text">{{name}}</h3>					
                        <div class="mb-3 mt-3"> 
                            <span class="price-title">
                                <s v-if="saleYn =='Y'">{{price}}</s>&nbsp;
                                <span v-else>{{price}}</span>
                                <b  v-if="saleYn =='Y'">&nbsp; {{price-disCountPrice}}</b>
                            </span>
                        </div>
                        <dl class="item-property">
                        <dd>
                            <p>{{info}}</p>
                        </dd>
                        </dl>
                        <!-- 
                        <dl class="param param-feature">
                            <dt>Poids</dt>
                            <dd>200g</dd>
                        </dl> -->
                    </article>
                </aside>
                <aside class="col-sm-3">
                    <article class="gallery-wrap"> 
                        <div class="img-big-wrap">
                            <img class="productImg" v-bind:src="path">
                        </div>                      
                    </article>
                </aside>
                <aside class="col-sm-5" style="margin-left : 3%">
                    <div class="row">                              
                        <label class="my-1 mr-2" for="color/model">색상/모델</label>
                        <select class="custom-select my-1 mr-sm-2"  v-model="selected" @change="add">
                            <option value="블랙-1.6Gdi">블랙-1.6Gdi</option>
                            <option value="블랙-2.0Gdi">블랙-2.0Gdi</option>
                            <option value="레드-1.6Gdi">레드-1.6Gdi</option>
                            <option value="레드-2.0Gdi">레드-2.0Gdi</option>
                        </select>
                       <div style="width:100%; height:200px; overflow:auto">
                        <table class="table table-striped" style="overflow-y:auto; ">
                                <tbody  v-if="buyList.length">
                                    <tr v-list
                                        v-for="(result,index) in buyList"
                                        :key="index">
                                        <th scope="row">
                                            <p class="font-weight-bolder">{{name}}</p>    
                                            <small style="color:gray">-{{result.name}}</small>
                                        </th>
                                        <td>
                                            <button type="button" v-on:click="minus(index)" class="btn btn-light">-</button>
                                            <input type="text" 
                                                   v-bind:value="result.num"
                                                   v-bind:id="index"
                                                   v-bind:name="prtPrice"  
                                                   style="width:30%"/>
                                            <button type="button" v-on:click="plus(index)" class="btn btn-light">+</button> 
                                        </td>
                                        <td>
                                            <p style="white-space: nowrap;">{{price}}원</p> 
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
                                 {{totalPrice}}원
                            </h3>
                            <small style="color:blue">({{totalProductNum}}개)</small>   
                    </div>
                    <div class="row">
                        <button type="button" class="btn btn-primary btn-lg btn-block" >장바구니</button>
                        <button type="button" v-on:click="sendEvent()" class="btn btn-secondary btn-lg btn-block">바로 구매하기</button>
                    </div>
            
                </aside>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data : function() {
        return {
            //상품 기본정보
            index : this.$route.params.index,
            name : this.$route.params.name,
            info : this.$route.params.info,
            price : this.$route.params.price,
            saleYn : this.$route.params.saleYn,
            disCountPrice : this.$route.params.disCountPrice,
            path : this.$route.params.path,
            productInfo : this.getJson(),
            //상품 주문정보
            buyList : []
            
        }
    },
    computed : {
        totalPrice : function(){
            let totalNum = 0;
            for(let i=0;i<this.buyList.length;i++){
                totalNum += this.buyList[i].num;                 
            }  
          
            return  this.price * totalNum;
        },
        totalProductNum : function(){
            let totalNum =0;
            for(let i=0;i<this.buyList.length;i++){
                totalNum += this.buyList[i].num;                 
            } 
            
            return totalNum
        }
    },
    methods : {
         getJson : function(){  //json 데이터 가져옴.
             let vm = this;
             if(vm.$route.params.name == undefined){    //Routing이 아닌 새로고침 또는 URL로 직접쳐서들어올 경우, json 조회
             axios.get('product.json')
                .then(function(response){                
                        vm.name = response.data[vm.index].name; 
                        vm.info = response.data[vm.index].info; 
                        vm.price = response.data[vm.index].price; 
                        vm.saleYn = response.data[vm.index].saleYn; 
                        vm.disCountPrice = response.data[vm.index].disCountPrice; 
                        vm.path = response.data[vm.index].path; 
                })
                .catch(function(error){
                    console.log(error);              
                })
             }           
         },
         add : function(){   
            // for(let i=0;i<this.buyList.length;i++){
            //     if(this.buyList[i].name == this.selected){
            //         alert('이미 제품이 추가되있습니다.');
            //         return false;
            //     }
            // }
            let obj = this.buyList.find( a=> a.name === this.selected);
            if(obj != undefined){
                alert('해당 제품은 이미 추가한 제품입니다.');
                return false;
            }
            this.buyList.push({name:this.selected,num:1})
         },
         plus : function(index){
             this.buyList[index].num = this.buyList[index].num +1;
         },
         minus : function(index){
             this.buyList[index].num = this.buyList[index].num -1;
         },
         del : function(index){
             this.buyList.splice(index,1);
         },
         sendEvent : function(){
            //let vm = this;           
            let router = this.$router; 
            router.push({
                name : "confirm",
                params : {
                   resultList :  this.buyList,
                   totalPrice : this.totalPrice,
                   totalNum : this.totalProductNum

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