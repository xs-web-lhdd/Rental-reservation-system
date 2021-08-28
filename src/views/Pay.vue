<template>
  <div class="wrapper">
    <!-- 后退按钮 -->
    <div @click="handleBack" class="iconfont back">&#xe600;</div>
    <List :message="message"/>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写性名' }]"
        />
        <van-field
          v-model="phone"
          type="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-cell class="title" title="选择入住时间段" :value="date" @click="show = true" />
        <!-- <van-cell title="选择预定的房间类型" @click="type = true" /> -->
        <van-field title="选择预定的房间类型" placeholder="请选择房间类型" @click="type = true" v-model="roomType" label="房间类型" />
        <van-field v-model="roomNum" type="digit" placeholder="请输入房间数量" label="房间数量" />
      </van-cell-group>
      <van-calendar v-model:show="show" type="multiple" @confirm="onConfirm" />
      <!-- 遮罩层 -->
      <div v-if="type" class="face"></div>
      <div v-if="type">
        <van-picker title="房间类型" :columns="columns" @confirm="onConfirmA" @cancel="onCancel"/>
      </div>
      <div style="margin: 16px;" class="submit" @click="handleSubmit">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import List from './../components/List.vue'
import { ref } from 'vue'
import { post } from '../util/request'
export default {
  name: 'Pay',
  components: { List },
  setup () {
    const message = '信息填写'
    // 日期选择
    const text = ref('')
    const show = ref(false)
    const day = ref([])
    // 定义日期数组
    const onConfirm = (dates) => {
      show.value = false
      text.value = dates.length
      day.value = dates
    }
    // 用户名和手机号
    const username = ref(null)
    const phone = ref(null)
    // 提交
    const handleSubmit = async () => {
      if (!text.value) {
        Toast('请选择入住时间段')
        return
      }
      if (!roomType.value) {
        Toast('请选择房间类型')
        return
      }
      if (!roomNum.value) {
        Toast('请输入房间数量')
        return
      }
      const res = await post('/bookroom', {
        roomName: roomType.value,
        username: username.value,
        phone: phone.value,
        roomNum: roomNum.value,
        bookData: day.value[0],
        endData: day.value[1]
      })
      console.log(res)
    }
    // 选择房间类型
    const type = ref(false) // 展示与否
    const roomType = ref(null)
    const columns = ['单间', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华']
    const onConfirmA = (value, index) => {
      roomType.value = value
      type.value = false
    }
    const onCancel = () => {
      type.value = false
    }
    // 房间数量
    const roomNum = ref(null)
    // 后退
    const router = useRouter()
    const handleBack = () => {
      router.back()
    }
    return { message, text, roomType, show, roomNum, onConfirm, username, phone, handleSubmit, columns, onCancel, onConfirmA, type, handleBack }
  }
}
</script>

<style lang="scss" scoped>
.back{
  position: absolute;
  top: .2rem;
  left: .2rem;
}
.userInfo {
  width: 100%;
  height: .4rem;
  background-color: #f1f1f1;
}
.submit {
  position: absolute;
  left: 0;
  right: 0;
  bottom: .3rem;
}
.face{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .3);
}
</style>
