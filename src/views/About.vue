<template>
  <div class="wrapper">
    <div @click="handleBack" class="iconfont back">&#xe600;</div>
    <List :message="message"/>
    <Swiper />
    <div class="detail">
      <div class="item">
        <div class="item__title">{{messageList[0]?.roomName}}</div>
        <div class="item__price">￥{{messageList[0]?.roomPrices}}</div>
        <div class="item__num">
          <span class="item__num__left">余量{{messageList[0]?.totalNum}}</span>
          <span class="item__num__right">类型：理工大服务中心房间</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content__title">简介</div>
      <hr class="content__line"/>
      <div class="content__desc">{{messageList[0]?.introduce}}</div>
    </div>
    <!-- 房间号码选择 -->
    <div class="roomNum">
      <div class="roomNum__title">房间号码</div>
      <div class="roomNum__content">
        <div v-for="item in roomNumList" :key="item" class="roomNum__tag" @click="handleOrder">{{item}}</div>
      </div>
    </div>
    <div class="bottom">
      <img src="../assets/images/logo.png" class="bottom__img">
      <p class="bottom__desc">
        明德任责<br/>好学力行
      </p>
      <div class="bottom__order" @click="handleOrder">立即预约</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import List from './../components/List.vue'
import Swiper from './../components/Swiper.vue'
import { get } from '../util/request'

const message = '房间详情'
export default {
  name: 'About',
  components: { List, Swiper },
  props: ['item'],
  setup () {
    onMounted(() => {
      getAllList()
    })
    // 跳转支付和返回
    const router = useRouter()
    const handleOrder = () => {
      router.push('/pay')
    }
    const handleBack = () => {
      router.back()
    }
    const messageList = ref([])
    // 获取路由id
    const route = useRoute()
    const getAllList = async () => {
      const res = await get('dqroom/list')
      messageList.value = res.data.filter(item => item.roomId.toString() === route.params.id)
      // 根据id获取房间号码
      const result = await get(`dqroom/roomnumber?roomId=${route.params.id}`)
      roomNumList.value = result.data
    }
    // 获取
    const roomNumList = ref([])
    return { message, messageList, handleOrder, handleBack, roomNumList }
  }
}
</script>

<style lang="scss" scoped>
.back{
  position: absolute;
  top: .2rem;
  left: .2rem;
}
.wrapper{
  background-color: #f1f1f1;
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.item{
  background-color: #fff;
  width: 100%;
  padding: .05rem;
  margin-bottom: .1rem;
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
    &__right{
      float: right;
      margin-right: .2rem;
    }
  }
}
.content{
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  margin-top: .2rem;
  padding: .15rem;
  box-sizing: border-box;
  height: 2rem;
  &__title{
    font-size: 0.16rem;
    letter-spacing: .02rem;
    padding: .03rem;
    box-sizing: border-box;
    border-bottom: 0.5px solid #8888;
    padding-bottom: .08rem;
  }
  &__line{
    margin: 0;
  }
  &__desc{
    margin-top: .1rem;
    color: #8888;
    font-size: 0.15rem;
    line-height: .2rem;
    letter-spacing: 1.1px;
  }
}
.bottom{
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 999;
  bottom: 0;
  &__img{
    margin: 0 .2rem;
    width: .5rem;
  }
  &__desc{
    font-size: .16rem;
    color: #ff4400;
    letter-spacing: .05rem;
    font-weight: bold;
    margin: .05rem .4rem 0 0rem;
  }
  &__order{
    flex: 1;
    width: 40%;
    background: #ff4400;
    color: white;
    font-size: .18rem;
    text-align: center;
    letter-spacing: .05rem;
    line-height: .5rem;
    font-weight: bold;
  }
}
.roomNum{
  width: 100%;
  background: white;
  // display: flex;
  flex-direction: column;
  margin-top: .2rem;
  padding: .15rem;
  box-sizing: border-box;
  height: 3rem;
  &__title{
    font-size: 0.16rem;
    letter-spacing: .02rem;
    padding: .03rem;
    box-sizing: border-box;
    border-bottom: 0.5px solid #8888;
    padding-bottom: .08rem;
    margin-bottom: .1rem;
  }
  &__content{
    display: flex;
    flex-wrap: wrap;
  }
  &__tag{
    width: .6rem;
    font-size: .15rem;
    border: 1px solid #1989fa;
    text-align: center;
    border-radius: .1rem;
    margin: .05rem .1rem;
  }
}
</style>
