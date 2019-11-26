<template>
   <div class="container">
        <br />
        <div class="card border-0">
            <div class="row">
                <aside class="col-sm-3">
                    <article class="card-body m-0 pt-13 pl-1">
                        <h3 class="title text">{{name}}</h3>					
                        <div class="mb-3 mt-3"> 
                            <span class="price-title">
                                <s v-if="saleYn =='Y'">{{price}}</s>&nbsp;
                                <span v-else>{{price}}</span>
                                <b  v-if="saleYn =='Y'">{{disCountPrice}}</b>
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
                <aside class="col-sm-4">
                    <article class="gallery-wrap"> 
                        <div class="img-big-wrap">
                            <img class="productImg" v-bind:src="path">
                        </div>
                        <div class="img-small-wrap">
                        <!-- <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div>
                        <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div>
                        <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div>
                        <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div> -->
                        </div>
                    </article>
                </aside>
                <aside class="infoClass">
                    <div class="row">                
                        <span>색상/모델 : </span>
                        <select class="form-control">
                            <option value="블랙-1.6Gdi">블랙-1.6Gdi</option>
                            <option value="블랙-2.0Gdi">블랙-2.0Gdi</option>
                            <option value="레드-1.6Gdi">레드-1.6Gdi</option>
                            <option value="레드-2.0Gdi">레드-2.0Gdi</option>
                        </select>
                    </div>
                    <div class="row">
                        <table class="table" style="border:">
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        블랙-1.6Gdi
                                    </th>
                                    <td>
                                        <button type="button" class="btn btn-light">-</button>
                                        <input type="text" value="1"/>
                                        <button type="button" class="btn btn-light">+</button>
                                    </td>
                                    <td>
                                        20,000원
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-light">X</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        블랙-2.0Gdi
                                    </th>
                                    <td>
                                        <button type="button" class="btn btn-light">-</button>
                                        <input type="text" value="1"/>
                                        <button type="button" class="btn btn-light">+</button>
                                    </td>
                                    <td>
                                        20,000원
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-light">X</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        레드-1.6Gdi
                                    </th>
                                    <td>
                                        <button type="button" class="btn btn-light">-</button>
                                        <input type="text" value="1"/>
                                        <button type="button" class="btn btn-light">+</button>
                                    </td>
                                    <td>
                                        20,000원
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-light">X</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <h3 style="text-align:right">60,000원(3개)</h3>
                    </div>
                    <div class="row">
                       <button type="button" class="btn btn-primary btn-lg btn-block">장바구니</button>
                       <button type="button" class="btn btn-secondary btn-lg btn-block">바로 구매하기</button>
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
            index : this.$route.params.index,
            name : this.$route.params.name,
            info : this.$route.params.info,
            price : this.$route.params.price,
            saleYn : this.$route.params.saleYn,
            disCountPrice : this.$route.params.disCountPrice,
            path : this.$route.params.path,
            productInfo : this.getJson()
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
 aside.infoClass{
     padding-left: 5%;
 }
 select.form-control form-control-sm{
     width:200px;margin-left:5px;
 }
    
</style>