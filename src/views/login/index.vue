<!--
 * @功能: 登录页面
 * @作者: 谢豪
 * @时间: 2023/08/04 14:45:25
 -->
<template>
  <div class="login-bg">
    <!--登录表单-->
    <div class="login-box p-10">
      <div class="login-tit text-black text-2xl text-center mb-10">用户登录</div>
      <el-form label-position="right" :model="form" style="max-width: 400px" ref="loginForm" :rules="rules">
        <el-form-item prop="loginId">
          <el-input v-model="form.loginId" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item class="float-right">
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <slide-verify ref="slideRef" @onmousemove="mousemove" v-if="isShow" />
  </div>
</template>

<script setup lang="ts">
import { getSign } from '@/utils/encrypt'
import slideVerify from '@/components/slide-verify/index.vue'
import { login } from '@/api/login'

// 获取dom
const slideRef = ref()
// 验证码弹窗
let isShow = ref<boolean>(false)
// 表单数据
const form = reactive({
  loginId: '',
  password: ''
})
// 获取表单
const loginForm = ref<HTMLFormElement>()
// 表单校验规则
const rules = reactive({
  loginId: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录
const onSubmit = () => {
  loginForm.value?.validate((valid: boolean) => {
    if (valid) {
      isShow.value = true
    }
  })
}

// 滑块验证结果
const mousemove = ({ locationX, imgToken }: { locationX: string; imgToken: string }) => {
  // 失败-调用验证组件重新获取图片
  const data = {
    loginId: form.loginId,
    password: getSign(form.password),
    imgToken,
    locationX
  }
  login(data)
    .then((res: any) => {
      console.log('res', res)
      slideRef.value.loseUpdate(true)
    })
    .catch(() => {
      slideRef.value.loseUpdate(false)
    })
}
</script>

<style scoped lang="less">
.login-bg {
  width: 100%;
  height: 100%;
}
.login-box {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--el-box-shadow-dark);
  border-radius: 6px;
}
</style>
