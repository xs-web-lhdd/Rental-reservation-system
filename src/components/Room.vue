<template>
    <van-row justify="start">
      <van-col span="10" class="item">
        <img class="item__img" src="../assets/images/1.jpg" alt="">
        <div class="item__title">单间</div>
        <div class="item__price">￥ 100</div>
        <div class="item__num">余量 100</div>
      </van-col>
      <van-col span="10" class="item">
        <img class="item__img" src="../assets/images/1.jpg" alt="">
        <div class="item__title">单间</div>
        <div class="item__price">￥ 100</div>
        <div class="item__num">余量 100</div>
      </van-col>
      <van-col span="10" class="item">
        <img class="item__img" src="../assets/images/1.jpg" alt="">
        <div class="item__title">单间</div>
        <div class="item__price">￥ 100</div>
        <div class="item__num">余量 100</div>
      </van-col>
    </van-row>
</template>

<script>
export default {
  name: 'Room'
}
</script>

<style lang="scss" scoped>
.item{
  background-color: #fff;
  padding: .05rem;
  margin: 0 .156rem;
  margin-bottom: .1rem;
  &__img{
    width: 100%;
  }
  &__title{
    color: #000000;
    font-weight: bold;
    margin: .05rem 0 .05rem .1rem;
    font-size: 0.14rem;
  }
  &__price{
    color: #ff731e;
    font-weight: bold;
    margin: .05rem 0 .05rem .1rem;
    font-size: 0.14rem;
  }
  &__num{
    color: #888;
    margin-left: 0.1rem;
    margin: .05rem 0 .05rem .1rem;
    font-size: 0.12rem;
  }
}
</style>
