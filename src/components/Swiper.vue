<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in ImageList" :key="item">
        <img :src="item" class="img"/>
      </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
  name: 'Swiper',
  props: ['ImageList']
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: .2rem;
  // line-height: 1.5rem;
  text-align: center;
  // background-color: #39a9ed;
}
.img{
  width: 100%;
  height: 2rem;
}
</style>
