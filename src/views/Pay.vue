<template>
  <div class="wrapper">
    <!-- 后退按钮 -->
    <div @click="handleBack" class="iconfont back">&#xe600;</div>
    <List :message="message"/>
    <van-form @submit="onSubmit" ref="hello">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="phone"
          type="phone"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
          ]"
        />
        <van-field title="选择预定的房间类型" placeholder="请选择房间类型" @click="type = true" v-model="roomType" label="房间类型" />
        <van-field title="请选择房间号码" placeholder="请选择房间号码" @click="handleChoiceNum" v-model="roomNumChoice" label="房间号码" />
        <van-field type="data" v-model="bookData" placeholder="请选择开始预约时间" label="开始时间" @click="() => handleTime(0)"/>
        <van-field type="data" v-model="endData" placeholder="请选择结束预约时间" label="结束时间" @click="() => handleTime(1)"/>
        <van-datetime-picker
          class="select"
          v-if="show"
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="onCancel"
          @confirm="handleSubmitTime"
        />
      </van-cell-group>
      <!-- 遮罩层 -->
      <div v-if="type || numChoice || show" class="face"></div>
      <div v-if="type">
        <van-picker class="select" title="房间类型" :columns="columnsType" @confirm="onConfirmA" @cancel="onCancel"/>
      </div>
      <div v-if="numChoice">
        <van-picker class="select" title="房间号" :columns="columnsNumber" @confirm="onConfirmB" @cancel="onCancel"/>
      </div>
      <div style="margin: .16rem;" class="submit">
      <!-- <div style="margin: .16rem;" class="submit" @click="handleSubmit"> -->
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
import { ref, getCurrentInstance } from 'vue'
import { post, get } from '../util/request'
import utils from '../util/utils'

export default {
  name: 'Pay',
  components: { List },
  setup () {
    const { proxy } = getCurrentInstance()
    const canOrder = ref(1)
    const message = '信息填写'
    // 用户名和手机号
    const username = ref(null)
    const phone = ref(null)
    // 提交
    onsubmit = async () => {
      proxy.$refs.hello.validate().then(async () => {
        if (!username.value) {
          Toast('姓名不能为空')
          return
        }
        if (!phone.value) {
          Toast('手机号不能为空')
          return
        }
        if (!roomType.value) {
          Toast('请选择房间类型')
          return
        }
        if (!roomNumChoice.value) {
          Toast('请选择房间号码')
          return
        }
        if (!endData.value || !bookData.value) {
          Toast('请选择时间段')
          return
        }
        if (canOrder.value === 1) {
          Toast('暂不能预约，请更换预约时间或者房间号')
          return
        }
        const res = await post('dqbook/book', {
          roomId: roomId.value,
          username: username.value,
          phone: phone.value,
          bookDate: bookData.value,
          endDate: endData.value
        })
        if (res.data === 1) {
          Toast('预定成功')
          roomId.value = ''
          username.value = ''
          phone.value = ''
          bookData.value = ''
          endData.value = ''
          // 房间类型恢复为空
          roomType.value = ''
          // 号码为空
          roomNumChoice.value = ''
        } else {
          Toast('预定失败')
        }
      }).catch(() => {
        Toast('请输入正确信息格式！')
      })
    }
    // 选择房间类型
    const id = ref(null)
    const type = ref(false) // 展示与否
    const roomType = ref(null)
    const roomId = ref(null)
    const columnsType = ['普通标准间', '舒适标准间', '豪华标准间', '豪华大床房', '豪华套房']
    const onConfirmA = async (value, index) => {
      roomType.value = value
      type.value = false
      if (value === '普通标准间') {
        id.value = 1
        const result = await get(`dqroom/roomnumber?roomId=${id.value}`)
        columnsNumber.value = result.data
      }
      if (value === '舒适标准间') {
        id.value = 2
        const result = await get(`dqroom/roomnumber?roomId=${id.value}`)
        columnsNumber.value = result.data
      }
      if (value === '豪华标准间') {
        id.value = 3
        const result = await get(`dqroom/roomnumber?roomId=${id.value}`)
        columnsNumber.value = result.data
      }
      if (value === '豪华大床房') {
        id.value = 4
        const result = await get(`dqroom/roomnumber?roomId=${id.value}`)
        columnsNumber.value = result.data
      }
      if (value === '豪华套房') {
        id.value = 5
        const result = await get(`dqroom/roomnumber?roomId=${id.value}`)
        columnsNumber.value = result.data
      }
    }
    // 房间号码
    const handleChoiceNum = (index) => {
      if (!roomType.value) {
        Toast('请先选择房间类型')
        return
      }
      numChoice.value = true
    }
    const onCancel = () => {
      type.value = false
      numChoice.value = false
      show.value = false
    }
    // 后退
    const router = useRouter()
    const handleBack = () => {
      router.back()
    }
    // 房间号码
    const numChoice = ref(false)
    const roomNumChoice = ref(null)
    const columnsNumber = ref([])
    const onConfirmB = (value, index) => {
      roomId.value = value
      roomNumChoice.value = value
      numChoice.value = false
    }
    // 选择时间
    const currentDate = ref(new Date())
    const minDate = new Date()
    const maxDate = new Date(2025, 10, 1)
    // 展示与否时间选择器
    const show = ref(false)
    const startOrEnd = ref(0) // 默认是结束
    const handleTime = (value) => {
      show.value = true
      startOrEnd.value = value
    }
    // 开始时间和结束时间
    const bookData = ref('')
    const endData = ref('')
    const handleSubmitTime = async (index) => {
      if (startOrEnd.value === 0) {
        if (!roomNumChoice.value) {
          Toast('请先选择房间号码')
          return
        }
        bookData.value = utils.formateDate(new Date(index))
        show.value = false
      }
      if (startOrEnd.value === 1) {
        if (!roomNumChoice.value) {
          Toast('请先选择房间号码')
          return
        }
        if (!bookData.value) {
          Toast('请选择预定开始时间')
          return
        }
        endData.value = utils.formateDate(new Date(index))
        show.value = false
        const res = await get(`/dqbook/check?roonNumber=${roomNumChoice.value}&bookDate=${bookData.value}&endDate=${endData.value}`)
        console.log(res)
        canOrder.value = res.data
        if (res.data !== 0) {
          Toast('暂不能预约，请更换预约时间或者房间号')
        }
      }
    }

    return { bookData, endData, handleChoiceNum, currentDate, minDate, handleSubmitTime, maxDate, show, handleTime, message, roomType, numChoice, roomNumChoice, username, phone, columnsType, columnsNumber, onCancel, onConfirmA, onConfirmB, type, handleBack }
  }
}
</script>

<style lang="scss" scoped>
.select{
  z-index: 9;
}
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
