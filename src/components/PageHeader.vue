<script setup lang="ts">
withDefaults(
  defineProps<{
    image: string
    type?: 'site-heading' | 'post-heading'
  }>(),
  {
    type: 'site-heading'
  }
)
</script>

<template>
  <!-- Page Header-->
  <header
    class="masthead"
    :style="{
      'background-image': `url('${image}')`
    }"
  >
    <div class="container position-relative px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-9 col-xl-8">
          <div :class="type">
            <!-- <h1>Clean Blog</h1>
            <span class="subheading">A Blog Theme by Start Bootstrap</span> -->
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
