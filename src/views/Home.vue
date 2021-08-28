<template>
  <div class="wrapper">
    <div class="header">
      <img src="../assets/images/logo.png" class="header__img">
      <span class="header__desc">服务中心预约系统</span>
    </div>
    <!-- 轮播图 -->
    <Swiper/>
    <!-- 房间介绍 -->
    <List message="卧室列表"/>
    <Room/>
    <!-- 会议室介绍 -->
    <List message="会议室列表"/>
    <Room/>
    <!-- 关于 -->
    <About/>
  </div>
</template>

<script>
import Swiper from '../components/Swiper.vue'
import List from '../components/List.vue'
import Room from '../components/Room.vue'
import About from '../components/About.vue'
export default {
  name: 'Home',
  components: { Swiper, List, Room, About }
}
</script>

<style lang="scss" scoped>
.wrapper{
  background-color: #f1f1f1;
}
.header{
  height: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &__img{
    width: .32rem;
    height: .32rem;
    margin-right: .05rem;
  }
  &__desc{
    font-size: .2rem;
  }
}
</style>
