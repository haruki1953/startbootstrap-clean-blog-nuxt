<script setup lang="ts">
import { NuxtLink } from '#components'

// import { vMainNavScroll } from '~/directives'
// 使用vue指令来模仿原js完成
// 控制滚动后导航栏的样式
const {
  arrivedState,
  // y,
  directions
} = useWindowScroll()
const isWindowTopArrived = computed(() => arrivedState.top)
// const isWindowTopArrived = computed(() => y.value < 80)
// 最后一次滚动是向上
const isLastDirectionsTop = ref(false)
watch(
  () => directions.top,
  () => {
    if (directions.top === true) {
      isLastDirectionsTop.value = true
    }
  }
)
watch(
  () => directions.bottom,
  () => {
    if (directions.bottom === true) {
      isLastDirectionsTop.value = false
    }
  }
)

// 控制导航栏展开
const isCollapseShow = ref(false)
const toggleCollapseShow = async () => {
  isCollapseShow.value = !isCollapseShow.value
}

// 路由切换时导航栏收起
const route = useRoute()
watch(
  () => route.path,
  () => {
    isCollapseShow.value = false
  }
)
</script>

<template>
  <!-- Navigation-->
  <nav
    id="mainNav"
    class="navbar navbar-expand-lg navbar-light"
    :class="{
      'is-fixed': !isWindowTopArrived,
      'is-visible': !isWindowTopArrived && isLastDirectionsTop
    }"
  >
    <!-- <nav
    id="mainNav"
    v-main-nav-scroll
    class="navbar navbar-expand-lg navbar-light"
  > -->
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand" href="/">Start Bootstrap</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        :aria-expanded="isCollapseShow"
        aria-label="Toggle navigation"
        :class="{
          collapsed: !isCollapseShow
        }"
        @click="toggleCollapseShow"
      >
        <!-- Menu
        <i class="fas fa-bars"></i> -->
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        id="navbarResponsive"
        class="collapse navbar-collapse"
        :class="{
          show: isCollapseShow
        }"
      >
        <ul class="navbar-nav ms-auto py-4 py-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link px-lg-3 py-3 py-lg-4" to="/">
              Home
            </NuxtLink>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link px-lg-3 py-3 py-lg-4" href="/"> About </a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
