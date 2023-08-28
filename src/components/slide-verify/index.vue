<template>
  <div class="modalModal" v-if="isok">
    <div class="verification-box-big">
      <div class="verification-box">
        <div class="title-box">
          <span class="text"> 安全验证 </span><el-icon><CircleClose /></el-icon>
        </div>
        <div style="width: 380px">
          <section class="slider-section">
            <div class="img-box">
              <div class="prompting" v-show="data.success">
                <span>验证成功！您共花了{{ data.alltime }}s，这速度真是简直了</span>
              </div>
              <div class="prompting" v-show="data.lose">
                <span>验证失败！请重新验证！</span>
              </div>
              <a-spin :spinning="spinning">
                <div class="img-contanier">
                  <img src="@/assets/update.png" class="updateimg" @click="updateimg" />
                  <img
                    :src="'data:image/png;base64,' + data.sliderData.bigImg"
                    class="bg-img"
                    ref="bgImg"
                    v-if="data.sliderData.bigImg"
                  />
                  <img src="@/assets/defaut.jpg" class="bg-img" v-else />
                  <img
                    :src="'data:image/png;base64 ,' + data.sliderData.smallImg"
                    class="slider-img"
                    ref="sliderImg"
                    v-if="data.sliderData.bigImg"
                  />
                </div>
              </a-spin>
            </div>
            <div class="slider-box">
              <span class="slider-text">向右滑动滑块填充拼图</span>
              <div class="slider-icon" @mousedown="rangeMove"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImg } from '@/api/login'

const emits = defineEmits(['onmousemove'])

interface SliderType {
  smallImg: string
  bigImg: string
  locationY: number
}

interface DataType {
  disX: number
  inittime: number
  deadtime: number
  alltime: number
  lose: boolean
  success: boolean
  event?: HTMLElement
  imgToken?: string
  sliderData: SliderType
}

const props = defineProps({
  spinning: {
    type: Boolean,
    default: false
  }
})

const sliderImg = ref()
const bgImg = ref()
let isok = ref<boolean>(false)

const data = reactive<DataType>({
  disX: 0, // 滑块距离背景图左侧的位置
  inittime: 0, //滑块移动开始时间
  deadtime: 0, //滑块结束移动时间
  alltime: 0, //滑动的总时间
  lose: false, //滑动验证失败
  success: false, //滑动验证成功
  event: undefined, //滑块事件对象
  imgToken: '',
  sliderData: {
    smallImg: '',
    bigImg: '',
    locationY: 0
  }
})

watch(
  () => data.sliderData,
  newVale => {
    if (newVale) {
      if (data.lose) {
        setTimeout(() => {
          init()
        }, 1500)
      } else {
        init()
      }
    }
  },
  { deep: true }
)

onMounted(() => {
  getNewImg()
})

// 获取滑块图片
const getNewImg = () => {
  // 获取滑块图片
  getImg().then((res: any) => {
    data.sliderData.smallImg = res.markImg
    data.sliderData.locationY = res.locationY
    data.imgToken = res.imgToken
    data.sliderData.bigImg = res.srcImg
    isok = true
    init()
  })
}

const init = () => {
  data.disX = 0 // 初始化滑块位置
  const NewBigImg = new Image() // 创建背景图片
  NewBigImg.src = 'data:image/png;base64,' + data.sliderData.bigImg
  NewBigImg.onload = () => {
    const originWidth = NewBigImg.width // 获取原始背景图片的宽度
    const widthRate = bgImg.value!.width / originWidth // 背景图片渲染后的实际宽度/原始图片宽度
    const smallImg = new Image() // 创建滑块图片
    smallImg.src = 'data:image/png;base64,' + data.sliderData.smallImg
    sliderImg.value!.src = 'data:image/png;base64,' + data.sliderData.smallImg // 设置滑块图片地址
    sliderImg.value!.style.width = smallImg.width * widthRate + 'px' // 设置滑块图片宽度
    sliderImg.value!.style.top = data.sliderData.locationY + 'px' // 设置滑块距离背景图顶部的距离
    sliderImg.value!.style.left = '0' // 设置滑块距离背景图左侧的距离
  }
}
// 移动事件触发
const rangeMove = (e: any) => {
  data.inittime = new Date().getTime()
  const ele = e.target
  data.event = ele
  const startX = e.clientX
  const eleWidth = ele.offsetWidth
  const parentWidth = ele.parentElement.offsetWidth
  const MaxX = parentWidth - eleWidth
  document.onmousemove = e => {
    const endX = e.clientX
    data.disX = endX - startX
    sliderImg.value!.style.left = data.disX + 'px'
    if (data.disX <= 0) {
      data.disX = 0
      sliderImg.value!.style.left = '0'
    }
    if (data.disX >= MaxX - eleWidth) {
      //减去滑块的宽度,体验效果更好
      data.disX = MaxX
      sliderImg.value.style.left = parentWidth - sliderImg.value!.width + 'px'
    }
    ele.style.transition = '.1s all'
    ele.style.transform = 'translateX(' + data.disX + 'px)'
    e.preventDefault()
  }
  document.onmouseup = () => {
    data.deadtime = new Date().getTime()
    const time = (data.deadtime - data.inittime) / 1000
    data.alltime = Number(time.toFixed(2))
    emits('onmousemove', { locationX: data.disX, imgToken: data.imgToken }) // 向父组件传递横坐标
    document.onmousemove = null
    document.onmouseup = null
  }
}

//刷新滑块图片
const updateimg = () => {
  getNewImg()
}

//失败更新验证
const loseUpdate = (value: any) => {
  console.log('######', value)
  if (value) {
    data.success = true
    return
  }
  const lose = setTimeout(() => {
    backLocal()
    init()
    data.lose = false
    clearTimeout(lose)
  }, 1500)
  data.lose = true
}
//初始化滑块位置
const backLocal = () => {
  data.event!.style.transition = '.5s all' // 初始化滑块位置
  data.event!.style.transform = 'translateX(0)'
}

defineExpose({
  loseUpdate
})
</script>
<style scoped lang="less">
.slider-section {
  // width: 369px;
  .img-box {
    // width: 369px;
    position: relative;
    .bg-img {
      // width: 369px;
    }
    .prompting {
      position: absolute;
      top: 160px;
      font-size: 12px;
      text-align: center;
      width: 100%;
      // width: 369px;
      line-height: 32px;
      background: #8eed56;
      z-index: 100;
    }
    .slider-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 50px !important;
    }
    .img-contanier {
      position: relative;
      // width: 369px;
      height: 180px;
      .updateimg {
        width: 32px;
        position: absolute;
        top: 16px;
        right: 16px;
      }
    }
  }

  .slider-box {
    background: #f7f9fa;
    color: #666;
    border: 1px solid #e4e7eb;
    position: relative;
    // height: 42px;
    // width: 369px;
    margin-top: 16px;
    margin-bottom: 31px;
    &:hover {
      box-shadow: 0 0 3px #ccc;
    }
    .slider-text {
      font-size: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .slider-icon {
      width: 35px;
      height: 35px;
      // width: 42px;
      // height: 42px;
      background: #ffffff url('../../assets/arrow.png') no-repeat center;
      text-align: center;
      line-height: 42px;
      font-size: 20px;
      color: black;
      box-shadow: 0 0 6px #ccc;
    }
  }
}
.example {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
.user-layout-login {
  label {
    font-size: 14px;
  }
  .gutter-row {
    img {
      width: 100%;
      height: 40px;
    }
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 44px;
    width: 100%;
    background-color: #1890ff;
  }

  .user-login-other {
    text-align: left;
    // margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
.ant-modal-header {
  border-bottom: none !important;
  .ant-modal-title {
    color: #1890ff;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
  }
}
</style>

<style>
.ant-input-affix-wrapper .ant-input {
  min-height: 100%;
  background-color: #ffffff;
  outline: none;
}
.modalVer {
  .ant-modal-body {
    padding: 0 24px 1px 24px;
  }
}
.verification-box-big {
  display: flex;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  .verification-box {
    width: 412px;
    height: 275px;
    background: white;
    margin: auto;
    border-radius: 4px;
    padding: 0 16px;
    box-sizing: border-box;
    .title-box {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        color: #1890ff;
      }
    }
  }
}
</style>
