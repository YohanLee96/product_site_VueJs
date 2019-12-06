<template>
  <div id="app">
    <div class="shadow-none p-3  bg-light rounded">
      <h1 class="my-4">주문</h1>
    </div>
    <div class="shadow-none p-3 bg-light rounded">
      <p class="text-muted" style="text-align:right">01 장바구니>02 주문서 작성> 주문완료</p>
    </div>
    <div class="shadow-none p-3  bg-light rounded">
      <p class="font-weight-bold">국내 배송상품 주문내역</p>
    </div>
    <table class="table table-hover">
      <thead>
        <tr class="table-active">
          <th scope="col">이미지</th>
          <th scope="col">상품정보</th>
          <th scope="col">판매가</th>
          <th scope="col">수량</th>
          <th scope="col">적립금</th>
          <th scope="col">배송구분</th>
          <th scope="col">배송비</th>
          <th scope="col">합계</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result,index) in buyList" v-bind:key="index">
          <th scope="row">
            <img style=" width:60px;height:60px;" v-bind:src="item.path" alt="제품 사진">
          </th>
          <td>
            <p class="font-weight-bold">{{item.name}}</p>
            <span class="badge badge-pill badge-dark">{{result.name}}</span>
          </td>
          <td>
            <p class="font-weight-bold">{{item.price}}원</p>
          </td>
          <td>
             <p class="font-weight-bold">{{result.num}}</p>
          </td>
          <td>-</td>
          <td>기본배송</td>
          <td>
            <p class="font-weight-bold" v-if="totalProductPrice<50000">
              {{deliveryPrice}}원
            </p>
            <p class="font-weight-bold" v-else>
              [무료]
            </p>
          </td>
          <td>
            <p class="font-weight-bold">{{item.price * result.num}}원</p>
          </td>
        </tr>
        <tr>
          <td>[기본배송]</td>
          <td colspan="7" style="text-align:right;">            
             <div>
                <small style="display: inline-block;">
                  <b>상품구매금액 {{totalProductPrice}}</b> + 배송비 {{deliveryPrice}}<div v-if="deliveryPrice==0">(무료)</div>=합계 : 
                </small>
                <h3>{{totalPrice}}원</h3> 
             </div> 
          </td>
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  created(){
    if(this.$route.params.buyList==undefined){
      alert('구매할 정보를 다시 입력해주세요!!');
      history.back(-1);
    }
  },
  data : function(){
    return {
      index : this.$route.params.index,   
      buyList : this.$route.params.buyList, //주문정보
      totalProductPrice : this.$route.params.totalProductPrice, //총 주문가격
      item : this.$route.params.item  //상품정보

    }
  },
  computed : {
    deliveryPrice : function(){ //배송비유무.

        let price = 0;

        if(50000<this.totalProductPrice){
          return price;
        }else{
          return price=2500;
        }
    },
     totalPrice : function(){ //배송비포함 총 가격.
      return  this.totalProductPrice + this.deliveryPrice;
    }
    

  }


}
</script>

<style>

</style>