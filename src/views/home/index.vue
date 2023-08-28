<!--
 * @功能:首页
 * @作者: 谢豪
 * @时间: 2023/08/25 15:17:46
 -->
<template>
  <div>
    <!--顶部状态栏-->
    <div class="header"></div>
    <div class="content flex">
      <Menu />
      <router-view class="flex-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/views/home/component/menu'
</script>
