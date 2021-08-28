<template>
  <div class="wrapper">
    <div class="header">
      <img src="../assets/images/logo.png" class="header__img">
      <span class="header__desc">服务中心预约系统</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
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
