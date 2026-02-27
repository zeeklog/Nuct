<template>
  <div class="logo">
    <img src="~@/assets/images/logo-small.png" alt="" />
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
    @apply flex overflow-hidden whitespace-nowrap items-center;

    width: 100%;
    height: 64px;
    padding-left: 24px;
    line-height: 64px;
    text-align: center;

    img {
      height: 32px;
      margin-right: 8px;
    }

    .title {
      @apply mb-0 text-xl;

      color: var(--app-primary-color);
    }
  }
</style>
