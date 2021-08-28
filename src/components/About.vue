<template>
  <div class="about">
    <div class="about__title">关于我们</div>
    <div class="about__address">地址：河南理工大学活动中心二楼</div>
    <div class="about__phone">电话：17723992029</div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="scss" scoped>
.about{
  background-color: #fff;
  color: #8888;
  margin-top: .2rem;
  &__title{
    padding: .1rem 0 0 .1rem;
    font-size: .12rem;
  }
  &__address{
    padding: 0.03rem 0 0 .1rem;
  }
  &__phone{
    padding: 0.05rem 0 .1rem .1rem;
  }
}
</style>
