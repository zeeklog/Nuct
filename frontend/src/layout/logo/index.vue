<template>
  <div class="logo" :class="{ collapsed }">
    <img src="~@/assets/images/logo.png" alt="logo" />
  </div>
</template>

<script setup>
  defineProps({
    collapsed: {
      type: Boolean,
    },
  });
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 200px;
    padding: 12px;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.3s;

    &.collapsed {
      padding: 12px 0;
    }

    img {
      height: 100px;
      width: 200px;
      transition: all 0.3s;
    }

    .title {
      margin-left: 12px;
      margin-bottom: 0;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #8b5cf6;
      background: linear-gradient(to right, #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
