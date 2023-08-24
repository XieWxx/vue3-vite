<!--
 * @功能: 登录页面
 * @作者: 谢豪
 * @时间: 2023/08/04 14:45:25
 -->
<template>
  <div class="login-bg">
    <!--左侧Logo-->
    <div class="logo"></div>
    <!--登录表单-->
    <div class="login-box">
      <div class="login-tit">用户登录</div>
      <el-form label-position="right" label-width="100px" style="max-width: 460px">
        <el-form-item label="用户名">
          <el-input />
        </el-form-item>
        <el-form-item label="密码">
          <el-input />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <slide-verify />
  </div>
</template>

<script setup lang="ts">
import { getImg } from '@/api/login'
import { ref } from 'vue'
import slideVerify from '@/components/slide-verify/index.vue'

// 获取dom
const slideRef = ref<any>('')
// 提示
let tipsMsg = ref<string>('')
//
let isSuccess = ref<boolean>(false)
// 验证码弹窗
let isShow = ref<boolean>(false)

// 登录
const onSubmit = () => {
  isShow.value = true
  getImg().then(res => {
    console.log('@@@@@@', res)
  })
}
</script>

<style scoped>
.login-bg {
  width: 100%;
  height: 100%;
}
.login-box {
  height: 300px;
  width: 500px;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: #fff;
  box-shadow: var(--el-box-shadow-dark);
  .login-tit {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    line-height: 60px;
  }
}
</style>
