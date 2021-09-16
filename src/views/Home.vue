<template>
  <div class="wrapper">
    <div class="header">
      <img src="../assets/images/logo.png" class="header__img">
      <span class="header__desc">服务中心预约系统</span>
    </div>
    <!-- 轮播图 -->
    <Swiper :ImageList="ImageList"/>
    <!-- 疫情信息介绍 -->
    <Info/>
    <!-- 房间介绍 -->
    <List message="卧室列表"/>
    <Room :roomList="roomList" />
    <!-- 关于 -->
    <About/>
    <!-- 我的图标 -->
    <div class="iconfont mine" @click="handleMe">&#xe609;</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swiper from '../components/Swiper.vue'
import List from '../components/List.vue'
import Room from '../components/Room.vue'
import About from '../components/About.vue'
import { get } from '../util/request'
import Info from '../components/Info.vue'

const roomList = ref([])
const ImageList = ref([])
export default {
  name: 'Home',
  components: { Swiper, List, Room, About, Info },
  setup () {
    const getAllList = async () => {
      const res = await get('/dqroom/list')
      roomList.value = res.data
      ImageList.value = res.data.map(item => item.roomImage)
    }
    if (roomList.value.length === 0) {
      // eslint-disable-next-line no-use-before-define
      getAllList()
    }
    // 跳转到我的页面
    const router = useRouter()
    const handleMe = () => {
      router.push('/mydetail')
    }
    return { roomList, ImageList, handleMe }
  }
}
</script>

<style lang="scss" scoped>
.mine{
  position: absolute;
  top: .1rem;
  right: .1rem;
  font-size: .2rem;
  color: #04be02;
}
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
