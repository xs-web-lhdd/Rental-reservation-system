<template>
  <div class="wrapper">
    <div class="header">
      <span class="header__desc">预约信息查询</span>
    </div>
    <div class="search">
      <input v-model="input" type="text" placeholder="请输入你的姓名" class="search__input">
      <div class="search__btn" @click="handleSearch">查询</div>
    </div>
    <div class="outcome">
      <div class="outcome__title">查询结果</div>
      <div class="outcome__item" v-for="item in resultList" :key="item.roomId">
        <div class="top">
          <div class="iconfont outcome__item__icon">&#xe65a;</div>
          <div class="outcome__item__type"><strong>{{formatRoomType(item.bookId)}}</strong></div>
          <div class="outcome__item__userName">{{item.username}}</div>
        </div>
        <div class="middle">
          <div class="outcome__item__phone">{{item.phone}}</div>
          <div class="outcome__item__pay">{{item.roomId}}</div>
        </div>
        <div class="bottom">
          <div class="outcome__item__bookDate">{{item.bookDate}}</div>
          <div class="outcome__item__endDate">{{item.endDate}}</div>
        </div>
      </div>
    </div>
    <div class="null" v-if="resultList.length === 0">
      <div class="iconfont null__content">&#xe607;</div>
      <div class="null__desc">空空如也</div>
    </div>
  </div>
  <div @click="handleBack" class="iconfont back">&#xe600;</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { get } from '../util/request'
import { Toast } from 'vant'

const resultList = ref([])
export default {
  name: 'MyDetail',
  setup () {
    // 回退
    const router = useRouter()
    const handleBack = () => {
      router.back()
    }
    // 查询姓名
    const input = ref('')
    const handleSearch = async () => {
      if (!input.value) {
        Toast('查询姓名不能为空')
        return
      }
      const res = await get(`/dqbook/find?username=${input.value}`)
      if (res.code === 404) {
        Toast('未查询到相关预定信息')
        resultList.value = []
      }
      if (res.code === 200) {
        Toast('查询成功')
        resultList.value = res.data
        console.log(res.data)
        input.value = ''
      }
    }
    // 格式化房间类型
    const formatRoomType = (roomId) => {
      if (roomId === 1) return '普通标准间'
      if (roomId === 2) return '舒适标准间'
      if (roomId === 3) return '豪华标准间'
      if (roomId === 4) return '豪华大床房'
      if (roomId === 5) return '豪华套房'
    }
    return { handleBack, input, handleSearch, resultList, formatRoomType }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
}
.header{
  height: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  &__desc{
    font-size: .2rem;
  }
}
.search{
  margin-top: .3rem;
  display: flex;
  &__input{
    margin-left: .3rem;
    padding: 0 .1rem;
    width: 2.3rem;
    height: .3rem;
    font-size: .14rem;
    border-radius: .2rem;
    outline: none;
    border: none;
  }
  &__btn{
    width: .48rem;
    font-size: .14rem;
    color: #04be02;
    background-color: #fff;
    border: .01rem solid #04be02;
    line-height: .28rem;
    text-align: center;
    border-radius: .04rem;
  }
}
.outcome{
  margin-top: .3rem;
  width: 100vw;
  height: 6rem;
  // background-color: #fff;
  &__title{
    font-size: .15rem;
    padding: 0 0 .1rem .1rem;
  }
  &__item{
    margin: 0 auto;
    width: 3.5rem;
    height: 1rem;
    background-color: #fff;
    border-radius: .1rem;
    .top{
      padding-top: .1rem;
      display: flex;
      line-height: .4rem;
    }
    &__icon{
      color: #04be02;
      font-size: .2rem;
      margin-left: .1rem;
      margin-right: .15rem;
    }
    &__type{
      font-size: .16rem;
      width: 2.4rem;
    }
    &__userName{
      font-size: .14rem;
    }
    .middle{
      display: flex;
    }
    &__phone{
      margin-left: .4rem;
      width: 2.4rem;
      color: #777;
      font-size: .14rem;
    }
    .bottom{
      display: flex;
      padding-top: .1rem;
    }
    &__bookDate, &__endDate{
      font-size: .12rem;
      flex: 1;
      text-align: center;
    }
  }
}
.null{
  position: absolute;
  width: 100vw;
  height: 50vh;
  top: 1.5rem;
  // background-color: #fff;
  &__content{
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 1rem;
    transform: translate(-50%, -50%);
  }
  &__desc{
    position: absolute;
    top: 2.8rem;
    width: 100%;
    text-align: center;
    font-size: .16rem;
  }
}
.back{
  position: absolute;
  top: .11rem;
  left: .1rem;
}
</style>
