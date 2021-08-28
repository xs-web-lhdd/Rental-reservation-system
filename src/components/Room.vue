<template>
  <van-row justify="start">
    <van-col span="10" class="item" v-for="item in List" :key="item.roomId">
      <router-link
        :to="`/about/${item.roomId}`"
      >
        <img class="item__img" src="../assets/images/1.jpg" alt="">
        <div class="item__title">{{item.roomName}}</div>
        <div class="item__price">￥{{item.roomPrices}}</div>
        <div class="item__num">余量 {{item.totalNum}}</div>
      </router-link>
    </van-col>
  </van-row>
</template>

<script>
import { ref, onMounted } from 'vue'
import { get } from '../util/request'
const List = ref([])
export default {
  name: 'Room',
  setup () {
    onMounted(() => {
      getAllList()
    })
    const getAllList = async () => {
      const res = await get('list')
      List.value = res.data.list
    }
    return { getAllList, List }
  }
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
