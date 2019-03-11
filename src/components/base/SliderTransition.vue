<!-- 过渡动画组件 -->
<template>
  <transition :name="name" :mode="mode">
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    name: {
      require: false,
      type: String,
      default: 'fade'
    },
    mode: {
      require: false,
      type: String,
      default: 'out-in'
    }
  }
}
</script>
