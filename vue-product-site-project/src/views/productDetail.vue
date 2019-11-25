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
                            <div>
                                <a href="#">
                                    <img v-bind:src="path">
                                </a>
                            </div>
                        </div>
                        <div class="img-small-wrap">
                        <!-- <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div>
                        <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div>
                        <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div>
                        <div class="item-gallery"> <img src="https://via.placeholder.com/100x100"> </div> -->
                        </div>
                    </article>
                </aside>
                <aside class="col-sm-3">
                    <div class="row mt-5">                
                        <span>색상/사이즈</span> &nbsp;
                        <select class="form-control form-control-sm" style="width:50px;">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                        </select>
                    </div>
                    <div class="row">
                        <button class="btn btn-lg color-box-waanbii" type="button"> <i class="fa fa-shopping-cart"></i> Ajouter au panier </button>
                    </div>
                    <div class="row mb-4 mt-4">
                        <button class="btn btn-lg color-box-waanbii" type="button"> <i class="fa fa-credit-card"></i> Passer la commande </button>
                    </div>
                    <div class="row mb-4 mt-4">
                        <button class="btn btn-lg btn-success" type="button"><i class="fa fa-heart fa-beat"></i></button>
                    </div>
                    <hr class="m-0 p-0">
                    <div class="row mb-4 mt-4">
                        Il reste 3 exemplaires du produits.
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
             axios.get('product.json')
                .then(function(response){
                    vm.productInfo = response.data[vm.index];
                })
                .catch(function(error){
                    console.log(error);              
                })
             
         },
    }
}
</script>

<style>
 div.container{
     max-width: none;
 }
</style>