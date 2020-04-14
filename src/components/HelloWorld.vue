<template>
  <div class="hello">
    <div>{{ msg }}</div>
    <div class="sdsd">测试字体</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .sdsd{
    font-size: 0.18rem;
    width: 1.8rem;
  }
</style>
