<template>
  <div name="verify" :class="isShowCanvas ? 'showCanvas' : ''" class="enter-x" id="verify">
    <slide-verify
      v-if="reload"
      ref="verify"
      :l="42"
      :r="10"
      :w="verifyWidth"
      :h="267"
      :slider-text="sliderText"
      :accuracy="accuracy"
      :imgs="verifyImgs"
      @success="verifySuccess"
      @fail="verifyFail"
      @refresh="verifyRefresh"
    ></slide-verify>
    <div :class="isVerifySuccess ? 'text-green-400' : 'text-red-400'">{{ verifyMsg }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import SlideVerify, { SlideVerifyInstance } from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'
import { getImg } from '@/api/login'
import img from '@/assets/img.png'

const verifyMsg = ref('')
const sliderText = ref('向右滑动->') //滑块文字
const accuracy = ref(1) //精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
const verify = ref<SlideVerifyInstance>()
const verifyImgs = ref([img, img, img])
const verifyWidth = ref()
const reload = ref(false) //用于v-if让组件SlideVerify刷新，如果不刷新，页面宽度改变的情况下，组件SlideVerify中canvas绘制的图片宽度不会改变
const isShowCanvas = ref(false)
const isVerifySuccess = ref(false)
const verifyEl = ref<HTMLElement>()

onMounted(() => {
  setWerifyWidth()
  window.onresize = () => {
    reload.value = false
    setWerifyWidth()
  }
})
const setWerifyWidth = async () => {
  let timer = setTimeout(function () {
    clearTimeout(timer)
    verifyWidth.value = verifyEl.value
    reload.value = true
  }, 1)
}

const verifySuccess = (times: number) => {
  isVerifySuccess.value = true
  verifyMsg.value = `验证成功, 耗时${(times / 1000).toFixed(1)}s`
}

const verifyFail = () => {
  verifyMsg.value = '验证不通过'
}

const verifyRefresh = () => {
  //点击刷新小图标
  isVerifySuccess.value = false
  // verifyMsg.value = "点击刷新";
}

const handleClick = () => {
  // 刷新
  isVerifySuccess.value = false
  verify.value?.refresh()
  verifyMsg.value = ''
}

const getImgFun = () => {
  // 获取图片
  getImg().then(res => {
    console.log(res)
  })
}
getImgFun()
</script>
