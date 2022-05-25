<script lang="tsx">
import { defineComponent, ref } from "vue";


export default defineComponent({
  setup(props, { slots }) {
    const count = ref(1)
    setInterval(() => {
      count.value++

    }, 1000)
    const handleClick = () => {
      console.log(12)
    }
    return { count, handleClick }
  },
});
</script>

<template>
  <div class="test-container" @click="handleClick">{{ count }}
    <header><slot name="header"></slot></header>
    <div class="main">

      <slot name="main"></slot>
    </div>
  </div>
</template>


<style lang="less">
.test-container {
  width: 100%;
  height: 100%;
  background-color: aqua;
  header {
    height: 45px;
    background-color: pink;
  }
  .main {
    height: 700px;
    width: 100%;
    background-color: palegoldenrod;
  }
}
</style>