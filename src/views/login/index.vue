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
      <el-form label-position="right" label-width="100px" :model="formData" style="max-width: 460px">
        <el-form-item label="用户名">
          <el-input v-model="formData.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.passWord" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="formData.authCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useStore from '@/store'
import useCurrentInstance from '@/utils/getCurrentInstance'
const { $http } = useCurrentInstance()
const { user } = useStore()
const { userName, passWord } = storeToRefs(user)

const formData = reactive({
  userName: '', // 用户名
  passWord: '', // 密码
  authCode: '' // 验证码
})

// 登录
const onSubmit = () => {
  $http
    .login({
      phone: '15639480130',
      password: 'xh143353'
    })
    .then((res: any) => {
      console.log(res)
    })
  user.$patch({
    userName: formData.userName,
    passWord: formData.passWord,
    userInfor: res.data
  })
  console.log(formData, userName, passWord)
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
