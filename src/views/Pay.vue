<template>
  <div class="wrapper">
    <!-- 后退按钮 -->
    <div @click="handleBack" class="iconfont back">&#xe600;</div>
    <List :message="message"/>
    <van-form @submit="onSubmit" ref="message">
      <van-cell-group inset>
        <van-field
          required
          v-model="username"
          type="text"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="phone"
          required
          type="tel"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
          ]"
        />
        <van-field required disabled title="选择预定的房间类型" placeholder="请选择房间类型" @click="type = true" v-model="roomType" label="房间类型" />
        <van-field required type="digit" label="房间数量" placeholder="请输入房间数量" v-model="roomNum"/>
        <van-field required disabled v-model="bookDate" placeholder="请选择入住时间" label="入住时间" @click="() => handleBookTime('start')"/>
        <van-field required disabled v-model="endDate" placeholder="请选择离店时间" label="离店时间" @click="() => handleBookTime('end')"/>
        <van-field title="备注" v-model="remarks" placeholder="请输入备注" label="备注"/>
        <van-datetime-picker
          class="select"
          v-if="show"
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="() => onCancel('time')"
          @confirm="handleSubmitTime"
        />
      </van-cell-group>
      <!-- 遮罩层 -->
      <div v-if="type || show" class="face"></div>
      <div v-if="type">
        <van-picker class="select" title="房间类型" :columns="columnsType" @confirm="confirmRoomId" @cancel="() => onCancel('roomId')"/>
      </div>
      <div style="margin: .16rem;" class="submit">
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
import List from '../components/List.vue'
import { ref, getCurrentInstance } from 'vue'
import { post, get } from '../util/request'
import utils from '../util/utils'

const message = '信息填写'
export default {
  name: 'Pay',
  components: { List },
  setup () {
    const { proxy } = getCurrentInstance()
    const username = ref('')
    const phone = ref('')
    const bookDate = ref('')
    const endDate = ref('')
    const remarks = ref('')
    // 选择房间类型：
    const roomId = ref(null)
    const type = ref(false) // 房间类型展示与否
    const columnsType = ['普通标准间', '舒适标准间', '豪华标准间', '豪华大床房', '豪华套房']
    // 确定房间类型：
    const roomType = ref('')
    const confirmRoomId = (value) => {
      roomType.value = value
      if (value === '普通标准间') {
        roomId.value = 1
      }
      if (value === '舒适标准间') {
        roomId.value = 2
      }
      if (value === '豪华标准间') {
        roomId.value = 3
      }
      if (value === '豪华大床房') {
        roomId.value = 4
      }
      if (value === '豪华套房') {
        roomId.value = 5
      }
      // 关闭选择框
      type.value = false
    }
    // 取消选择房间类型：
    const onCancel = (value) => {
      if (value === 'roomId') {
        type.value = false
      }
      if (value === 'time') {
        show.value = false
      }
    }
    // 房间数量
    const roomNum = ref(null)
    // 入住时间：
    const currentDate = ref(new Date())
    const minDate = new Date()
    const maxDate = new Date(2025, 10, 1)
    const show = ref(false) // 是否展示选择时间框
    const endOrstart = ref(0)
    const handleBookTime = (flag) => {
      if (flag === 'start') {
        show.value = true
        endOrstart.value = 0
      }
      if (flag === 'end') {
        show.value = true
        endOrstart.value = 1
      }
    }
    // 确定时间
    const handleSubmitTime = (value) => {
      if (endOrstart.value === 0) {
        if (!roomType.value) {
          Toast('请先选择房间类型')
          return
        }
        bookDate.value = utils.formateDate(new Date(value))
        show.value = false
      }
      if (endOrstart.value === 1) {
        if (!bookDate.value) {
          Toast('请先选择开始时间')
          return
        }
        endDate.value = utils.formateDate(new Date(value))
        show.value = false
        getRoomList()
      }
    }
    // 获取可用房间列表：
    const canBookRoomList = ref([])
    const getRoomList = async () => {
      const res = await get(`dqbook/use?dqRoomId=${roomId.value}&bookDate=${bookDate.value}&endDate=${endDate.value}`)
      canBookRoomList.value = res.data
    }
    // 提交：
    onsubmit = () => {
      proxy.$refs.message.validate().then(async () => {
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
        if (!roomNum.value) {
          Toast('请输入房间数量')
          return
        }
        if (!endDate.value || !bookDate.value) {
          Toast('请选择时间段')
          return
        }
        if (canBookRoomList.value.length === 0) {
          Toast('抱歉，暂时没有房间可以预定')
          return
        }
        if (roomNum.value > canBookRoomList.value.length) {
          Toast(`抱歉，最多只能预定${canBookRoomList.value.length}个房间`)
          return
        }
        let OK = true // 默认成功
        let list = ''
        for (let item = 0; item < roomNum.value; item++) {
          const res = await bookRoom(canBookRoomList.value[item])
          if (res.code !== 200) { OK = false } // 只要一个预定失败，那就预定失败
          list += ` ${canBookRoomList.value[item]}`
        }
        if (OK) {
          Toast(`预定成功，房间号为：${list}`)
          setTimeout(() => {
            router.push('/')
          }, 2000)
        } else {
          Toast('预定失败，请重试！')
        }
      }).catch(() => {
        Toast('请输入正确信息格式！')
      })
    }
    // 预定房间---循环实现
    const bookRoom = async (roomId) => {
      const res = await post('dqbook/book', {
        roomId: roomId,
        username: username.value,
        phone: phone.value,
        remarks: remarks.value,
        bookDate: bookDate.value,
        endDate: endDate.value
      })
      // console.log(res)
      return res
    }
    // 返回
    const router = useRouter()
    const handleBack = () => {
      router.back()
    }
    return { handleBack, message, username, phone, bookDate, endDate, remarks, columnsType, type, confirmRoomId, onCancel, handleBookTime, show, currentDate, minDate, maxDate, roomType, handleSubmitTime, roomNum }
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
