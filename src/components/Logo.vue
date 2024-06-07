<template>
  <span class="d-flex">
    <img src="@/assets/logo.png" :class="class" :style="style" />
  </span>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    class: {
      type: String,
      default: ''
    },
    style: {
      type: String,
      default: ''
    }
  }
}
</script>
