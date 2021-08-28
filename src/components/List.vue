<template>
  <div class="wrapper">
    <img class="img1" src="../assets/images/float.png">
    <span class="desc">{{message}}</span>
    <img class="img2" src="../assets/images/float.png">
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['message']
}
</script>

<style lang="scss" scoped>
.wrapper{
  height: .6rem;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img1{
  width: .4rem;
  height: .32rem;
  margin-right: .1rem;
}
.desc{
  font-size: .17rem;
  font-weight: 600;
  letter-spacing: .05rem;
}
.img2{
  width: .4rem;
  height: .32rem;
  margin-left: .1rem;
}
</style>
